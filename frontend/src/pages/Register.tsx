import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import { FormField } from '../components/ui/FormField';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

const registerFormSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(3, 'Full name must be at least 3 characters long'),
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms to continue',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function Register() {
  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setApiError(null);
      const res = await registerUser(data.fullName, data.email, data.password, data.confirmPassword);
      if (res && res.require2FA && res.email) {
        navigate(`/login?email=${encodeURIComponent(res.email)}&otpSent=true`);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setApiError(err.message || 'Failed to create account.');
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create Your Account"
        description="Start building your career with AI."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {apiError && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs font-semibold text-danger text-left animate-fadeIn">
              {apiError}
            </div>
          )}

          {/* Form Fields in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name field */}
            <FormField label="Full Name" error={errors.fullName?.message}>
              <Input
                type="text"
                placeholder="Alex Carter"
                error={!!errors.fullName}
                disabled={isSubmitting}
                autoComplete="name"
                {...register('fullName')}
              />
            </FormField>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Password field */}
            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                placeholder="••••••••"
                error={!!errors.password}
                disabled={isSubmitting}
                value={passwordValue}
                showStrength
                autoComplete="new-password"
                {...register('password')}
              />
            </FormField>

            {/* Confirm Password field */}
            <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
              <PasswordInput
                placeholder="••••••••"
                error={!!errors.confirmPassword}
                disabled={isSubmitting}
                autoComplete="new-password"
                {...register('confirmPassword')}
              />
            </FormField>
          </div>

          {/* Agree to terms */}
          <FormField label="" error={errors.agreeToTerms?.message}>
            <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-text-secondary select-none">
              <input
                type="checkbox"
                className={cn(
                  "rounded border-border text-primary focus:ring-primary/20 focus:ring-offset-0 mt-0.5",
                  errors.agreeToTerms && "border-danger"
                )}
                {...register('agreeToTerms')}
              />
              <span className="text-left leading-normal">
                I agree to the{' '}
                <a href="#terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </FormField>

          {/* Submit Button */}
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Create Account
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
                    setApiError(err.message || 'Google Sign Up failed');
                  }
                }
              }}
              onError={() => {
                setApiError('Google Sign Up failed. Please try again.');
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
