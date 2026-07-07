import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import { FormField } from '../components/ui/FormField';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { login, googleLogin, verify2FA } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [apiError, setApiError] = useState<string | null>(null);
  
  // 2FA state variables
  const [require2FA, setRequire2FA] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpSubmitting, setOtpSubmitting] = useState<boolean>(false);

  // Auto-verify if email and otp are present in the URL query string (Magic Link feature)
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const otpParam = searchParams.get('otp');
    const otpSentParam = searchParams.get('otpSent');

    if (emailParam) {
      if (otpParam) {
        setRequire2FA(true);
        setLoginEmail(emailParam);
        setOtpCode(otpParam);
        
        const autoVerify = async () => {
          setOtpSubmitting(true);
          setApiError(null);
          try {
            await verify2FA(emailParam, otpParam);
            navigate('/dashboard');
          } catch (err: any) {
            setApiError(err.message || 'Auto-verification link failed or expired.');
          } finally {
            setOtpSubmitting(false);
          }
        };
        autoVerify();
      } else if (otpSentParam === 'true') {
        setRequire2FA(true);
        setLoginEmail(emailParam);
      }
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setApiError(null);
      const res = await login(data.email, data.password);
      if (res.require2FA && res.email) {
        setRequire2FA(true);
        setLoginEmail(res.email);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setApiError(err.message || 'Invalid email or password');
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setApiError('Please enter a valid 6-digit verification code.');
      return;
    }

    setOtpSubmitting(true);
    setApiError(null);
    try {
      await verify2FA(loginEmail, otpCode);
      navigate('/dashboard');
    } catch (err: any) {
      setApiError(err.message || 'Verification failed. Incorrect or expired code.');
    } finally {
      setOtpSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title={require2FA ? "Enter Verification Code" : "Welcome Back"}
        description={
          require2FA 
            ? `We have sent a 6-digit secure OTP code to ${loginEmail}.`
            : "Sign in to continue to CareerLens."
        }
      >
        {require2FA ? (
          /* OTP verification form */
          <form onSubmit={handleVerifyOTP} className="space-y-4" noValidate>
            {apiError && (
              <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs font-semibold text-danger text-left animate-fadeIn">
                {apiError}
              </div>
            )}

            <FormField label="6-Digit Verification Code" error={otpCode.length > 0 && otpCode.length !== 6 ? 'Code must be 6 digits' : ''}>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                disabled={otpSubmitting}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-center tracking-[12px] font-extrabold text-lg text-slate-800 focus:outline-none focus:border-blue-500 transition-all bg-white"
              />
            </FormField>

            <Button type="submit" variant="primary" isLoading={otpSubmitting}>
              Verify & Sign In
            </Button>

            <button
              type="button"
              onClick={() => {
                setRequire2FA(false);
                setOtpCode('');
                setApiError(null);
              }}
              className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700 py-1 transition-colors"
            >
              Back to Login
            </button>
          </form>
        ) : (
          /* Email / password traditional form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {apiError && (
              <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs font-semibold text-danger text-left animate-fadeIn">
                {apiError}
              </div>
            )}

            {/* Email field */}
            <FormField label="Email Address" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="you@example.com"
                error={!!errors.email}
                disabled={isSubmitting}
                autoComplete="email"
                {...register('email')}
              />
            </FormField>

            {/* Password field */}
            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                placeholder="••••••••"
                error={!!errors.password}
                disabled={isSubmitting}
                autoComplete="current-password"
                {...register('password')}
              />
            </FormField>

            {/* Checkbox and Forgot Password link */}
            <div className="flex items-center justify-between text-xs font-semibold text-text-secondary select-none">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary/20 focus:ring-offset-0"
                />
                <span>Remember Me</span>
              </label>
              <a href="#forgot" className="text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Sign In
            </Button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <span className="absolute w-full border-t border-border" />
              <span className="relative bg-white px-3 text-[10px] font-bold tracking-wider uppercase text-text-secondary/50">
                OR
              </span>
            </div>

            {/* Google Button */}
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    try {
                      setApiError(null);
                      await googleLogin(credentialResponse.credential);
                      navigate('/dashboard');
                    } catch (err: any) {
                      setApiError(err.message || 'Google Sign In failed');
                    }
                  }
                }}
                onError={() => {
                  setApiError('Google Sign In failed. Please try again.');
                }}
                theme="outline"
                size="large"
                shape="rectangular"
                width="320"
                text="continue_with"
              />
            </div>

            {/* Footer Text */}
            <div className="text-xs text-text-secondary mt-6 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
