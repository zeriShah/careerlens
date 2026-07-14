import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../config/db';
import { sendOtpEmail } from '../utils/mailer';
import { AuthenticatedRequest } from '../middleware/auth';
import { CustomError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'careerlens_secure_super_jwt_secret_token_1298471';
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const error: CustomError = new Error('Email address is already in use');
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    // Generate a 6-digit random code for initial signup verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to the newly created user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: otp,
        otpExpiresAt: expires
      }
    });

    // Send the OTP verification email
    await sendOtpEmail(user.email, otp, user.fullName);

    res.status(201).json({
      success: true,
      require2FA: true,
      message: 'Account registered. Please check your email for the verification code.',
      data: {
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error: CustomError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }

    // Check if user has password (or registered via Google)
    if (!user.password) {
      const error: CustomError = new Error('This account was created via Google. Please sign in with Google.');
      error.statusCode = 401;
      return next(error);
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error: CustomError = new Error('Invalid email or password');
      error.statusCode = 401;
      return next(error);
    }

    // Check if user is verified
    if (!user.isVerified) {
      // If not verified, they must verify via OTP (which is required once after signup)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpCode: otp,
          otpExpiresAt: expires
        }
      });

      await sendOtpEmail(user.email, otp, user.fullName);

      return res.status(200).json({
        success: true,
        require2FA: true,
        message: 'Your account is not verified. A verification code has been sent to your email address.',
        data: {
          email: user.email
        }
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      require2FA: false,
      message: 'Logged in successfully',
      data: {
        token, // fallback for localStorage
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {},
  });
};

export const me = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    const error: CustomError = new Error('Not authenticated');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: 'Current user retrieved successfully',
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const googleClient = new OAuth2Client('575940157323-6hr5888bp90r0majv9tejfmslusdt0fc.apps.googleusercontent.com');

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { credential } = req.body;

  if (!credential) {
    const error: CustomError = new Error('Google credential token is required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: '575940157323-6hr5888bp90r0majv9tejfmslusdt0fc.apps.googleusercontent.com',
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      const error: CustomError = new Error('Invalid Google token payload');
      error.statusCode = 400;
      return next(error);
    }

    const { email, name } = payload;
    const fullName = name || 'Google User';

    // Find or create user in database
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          fullName,
          email,
          password: null, // Password is optional in database schema
          isVerified: true, // Google login accounts are verified
        },
      });
    } else if (!user.isVerified) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Signed in via Google successfully',
      data: {
        token, // fallback for localStorage
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err: any) {
    console.error('Google OAuth token verification failed:', err);
    const error: CustomError = new Error('Google authentication verification failed');
    error.statusCode = 400;
    return next(error);
  }
};

export const verify2FA = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otpCode } = req.body;

  if (!email || !otpCode) {
    const error: CustomError = new Error('Email and verification code are required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    if (!user.otpCode || user.otpCode !== otpCode) {
      const error: CustomError = new Error('Invalid verification code');
      error.statusCode = 400;
      return next(error);
    }

    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
      const error: CustomError = new Error('Verification code has expired. Please log in again.');
      error.statusCode = 400;
      return next(error);
    }

    // OTP is valid! Clear OTP codes in database and mark user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: null,
        otpExpiresAt: null,
        isVerified: true,
      }
    });

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      data: {
        token, // fallback for localStorage
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    const error: CustomError = new Error('Not authenticated');
    error.statusCode = 401;
    return next(error);
  }

  const { fullName, email, currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      const error: CustomError = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    const dataToUpdate: any = {};
    if (fullName) dataToUpdate.fullName = fullName;
    if (email && email !== user.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        const error: CustomError = new Error('Email is already in use by another account');
        error.statusCode = 400;
        return next(error);
      }
      dataToUpdate.email = email;
    }

    if (newPassword) {
      if (!currentPassword || !user.password) {
        const error: CustomError = new Error('Current password is required to change password');
        error.statusCode = 400;
        return next(error);
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        const error: CustomError = new Error('Incorrect current password');
        error.statusCode = 400;
        return next(error);
      }
      dataToUpdate.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser.id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

