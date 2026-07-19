import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// Initialize Resend if API key is provided
const resendClient = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Determine "From" address
const FROM_EMAIL = RESEND_API_KEY 
  ? (process.env.FROM_EMAIL || 'onboarding@resend.dev') 
  : (SMTP_USER ? `"Profiling Security" <${SMTP_USER}>` : '"Profiling Security" <security@profiling.dev>');

export const sendOtpEmail = async (email: string, otp: string, name: string): Promise<void> => {
  const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?email=${encodeURIComponent(email)}&otp=${otp}`;
  const subject = `Your Profiling Login Verification Code - ${otp}`;
  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #1e3a8a; margin-top: 0;">Confirm Your Identity</h2>
      <p style="color: #475569; font-size: 14px;">Hello ${name},</p>
      <p style="color: #475569; font-size: 14px;">We received a request to access your Profiling account. Please use the following 2-Factor Authentication code to complete your login:</p>
      
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #1DB954;">${otp}</span>
      </div>

      <p style="color: #475569; font-size: 14px; text-align: center;">Or click the link below to verify and sign in automatically:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${loginUrl}" style="background-color: #1DB954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block;">Verify and Sign In</a>
      </div>

      <p style="color: #64748b; font-size: 11px; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
        This verification code is only valid for 10 minutes. If you did not make this request, please ignore this email.
      </p>
    </div>
  `;

  // 1. TRY RESEND FIRST
  if (resendClient) {
    try {
      const response = await resendClient.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject,
        html: htmlBody,
      });

      if (response.error) {
        console.error(`Resend API validation error for ${email}:`, response.error);
        // Do not return, let it fall through to Nodemailer/Console
      } else {
        console.log(`[Resend OTP Email sent successfully to ${email} (ID: ${response.data?.id})]`);
        return;
      }
    } catch (error) {
      console.error(`Error executing Resend SDK for ${email}:`, error);
    }
  }

  // 2. FALLBACK TO NODEMAILER SMTP
  if (SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject,
        html: htmlBody,
      });
      console.log(`[Nodemailer SMTP OTP Email sent successfully to ${email}]`);
      return;
    } catch (error) {
      console.error(`Error sending SMTP OTP Email to ${email}:`, error);
    }
  }

  // 3. FALLBACK TO CONSOLE
  console.log('\n\x1b[33m%s\x1b[0m', '********************************************************************************');
  console.log('\x1b[36m%s\x1b[0m', `  [2FA EMAIL SIMULATOR] `);
  console.log(`  To: ${name} <${email}>`);
  console.log(`  Verification OTP Code: ${otp}`);
  console.log(`  Direct Magic Link: ${loginUrl}`);
  console.log('\x1b[33m%s\x1b[0m', '********************************************************************************\n');
};

export const sendResetEmail = async (email: string, otp: string, name: string): Promise<void> => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?resetEmail=${encodeURIComponent(email)}&resetOtp=${otp}`;
  const subject = `Your Profiling Password Reset Code - ${otp}`;
  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #1e3a8a; margin-top: 0;">Reset Your Password</h2>
      <p style="color: #475569; font-size: 14px;">Hello ${name},</p>
      <p style="color: #475569; font-size: 14px;">We received a request to reset the password for your Profiling account. Please use the following code to complete the process:</p>
      
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #1DB954;">${otp}</span>
      </div>

      <p style="color: #475569; font-size: 14px; text-align: center;">Or click the link below to reset your password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" style="background-color: #1DB954; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block;">Reset Password</a>
      </div>

      <p style="color: #64748b; font-size: 11px; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
        This code is only valid for 10 minutes. If you did not request a password reset, please ignore this email.
      </p>
    </div>
  `;

  // 1. TRY RESEND FIRST
  if (resendClient) {
    try {
      const response = await resendClient.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject,
        html: htmlBody,
      });

      if (response.error) {
        console.error(`Resend API validation error for ${email}:`, response.error);
        // Do not return, let it fall through to Nodemailer/Console
      } else {
        console.log(`[Resend Password Reset Email sent successfully to ${email} (ID: ${response.data?.id})]`);
        return;
      }
    } catch (error) {
      console.error(`Error executing Resend SDK for ${email}:`, error);
    }
  }

  // 2. FALLBACK TO NODEMAILER SMTP
  if (SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject,
        html: htmlBody,
      });
      console.log(`[Nodemailer SMTP Password Reset Email sent successfully to ${email}]`);
      return;
    } catch (error) {
      console.error(`Error sending SMTP Password Reset Email to ${email}:`, error);
    }
  }

  // 3. FALLBACK TO CONSOLE
  console.log('\n\x1b[33m%s\x1b[0m', '********************************************************************************');
  console.log('\x1b[36m%s\x1b[0m', `  [PASSWORD RESET EMAIL SIMULATOR] `);
  console.log(`  To: ${name} <${email}>`);
  console.log(`  Reset OTP Code: ${otp}`);
  console.log(`  Direct Reset Link: ${resetUrl}`);
  console.log('\x1b[33m%s\x1b[0m', '********************************************************************************\n');
};
