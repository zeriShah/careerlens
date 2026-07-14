import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const sendOtpEmail = async (email: string, otp: string, name: string): Promise<void> => {
  const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5174'}/login?email=${encodeURIComponent(email)}&otp=${otp}`;

  // Fallback to console logs if SMTP credentials are not configured (free testing out of the box)
  if (!SMTP_USER || !SMTP_PASS) {
    console.log('\n\x1b[33m%s\x1b[0m', '********************************************************************************');
    console.log('\x1b[36m%s\x1b[0m', `  [2FA EMAIL SIMULATOR] `);
    console.log(`  To: ${name} <${email}>`);
    console.log(`  Verification OTP Code: ${otp}`);
    console.log(`  Direct Magic Link: ${loginUrl}`);
    console.log('\x1b[33m%s\x1b[0m', '********************************************************************************\n');
    return;
  }

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

    const mailOptions = {
      from: `"Profiling Security" <${SMTP_USER}>`,
      to: email,
      subject: `Your Profiling Login Verification Code - ${otp}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-xl: 12px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">Confirm Your Identity</h2>
          <p style="color: #475569; font-size: 14px;">Hello ${name},</p>
          <p style="color: #475569; font-size: 14px;">We received a request to access your Profiling account. Please use the following 2-Factor Authentication code to complete your login:</p>
          
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #2563eb;">${otp}</span>
          </div>

          <p style="color: #475569; font-size: 14px; text-align: center;">Or click the link below to verify and sign in automatically:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block;">Verify and Sign In</a>
          </div>

          <p style="color: #64748b; font-size: 11px; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            This verification code is only valid for 10 minutes. If you did not make this request, please ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[2FA OTP Email sent successfully to ${email}]`);
  } catch (error) {
    console.error(`Error sending 2FA OTP Email to ${email}:`, error);
    // fallback log in case transporter fails
    console.log('\n\x1b[31m%s\x1b[0m', '--- nodemailer error fallback log ---');
    console.log(`OTP Code for ${email} is: ${otp}`);
    console.log('-------------------------------------\n');
  }
};
