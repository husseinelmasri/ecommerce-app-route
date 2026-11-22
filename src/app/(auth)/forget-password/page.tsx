'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from '@/actions/auth.actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Key, Lock, CheckCircle2 } from 'lucide-react';
import ResetPassword from '@/components/forget-password/reset-password/ResetPassword';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty('*Please enter your password')
      .min(8, '*Password must be at least 8 characters')
      .regex(/[A-Z]/, '*Must contain one uppercase letter')
      .regex(/[a-z]/, '*Must contain one lowercase letter')
      .regex(/[#?!@$%^&*-]/, '*Must contain one special character')
      .regex(/[0-9]/, '*Must contain one number'),
    rePassword: z.string().nonempty('*Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: '*Passwords do not match',
    path: ['rePassword'],
  });

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setIsLoading(true);
    const res = await forgotPassword({ email });
    if (res.statusMsg === 'success') {
      toast.success('Reset code sent to your email');
      setStep(2);
    } else {
      toast.error(res.message || 'Failed to send code');
    }
    setIsLoading(false);
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (!code) return toast.error('Please enter the code');
    setIsLoading(true);
    const res = await verifyResetCode({ resetCode: code });
    if (res.status === 'Success') {
      toast.success('Code verified successfully');
      setStep(3);
    } else {
      toast.error(res.message || 'Invalid code');
    }
    setIsLoading(false);
  }

  async function onResetPassword(data: ResetFormValues) {
    setIsLoading(true);
    const res = await resetPassword({ email, newPassword: data.newPassword });
    if (res.token) {
      toast.success('Password reset successfully');
      setStep(4);
    } else {
      toast.error(res.message || 'Failed to reset password');
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50/30">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <ResetPassword />
        </div>

        <div className="w-full">
          {step === 4 ? (
            <div className="bg-white rounded-[16px] shadow-xl p-8 text-center border">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="size-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Password Reset!
              </h2>
              <p className="text-gray-600 font-medium mb-8">
                Your password has been successfully reset.
              </p>
              <Link
                href="/login"
                className="inline-block w-full bg-primary text-white py-3 px-4 rounded-[12px] hover:bg-primary/90 transition-all font-semibold">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] shadow-xl p-8 border">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-primary">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {step === 1
                    ? 'Forgot Password?'
                    : step === 2
                      ? 'Check Your Email'
                      : 'Create New Password'}
                </h1>
                <p className="text-gray-500 text-sm px-4">
                  {step === 1
                    ? "No worries, we'll send you a reset code"
                    : step === 2
                      ? `Enter the 6-digit code sent to ${email}`
                      : 'Your new password must be different from previous passwords'}
                </p>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Mail className="size-4" />
                </div>
                <div
                  className={`w-12 h-0.5 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Key className="size-4" />
                </div>
                <div
                  className={`w-12 h-0.5 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Lock className="size-4" />
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={handleSendEmail} className="space-y-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="mt-1 h-11 bg-gray-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 font-semibold flex justify-center items-center gap-2 mt-4">
                    {isLoading && <Loader2 className="animate-spin size-5" />}{' '}
                    Send Reset Code
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <Label>Reset Code</Label>
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter the 6-digit code"
                      className="mt-1 h-11 text-center tracking-widest text-lg bg-gray-50"
                      maxLength={6}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 font-semibold flex justify-center items-center gap-2 mt-4">
                    {isLoading && <Loader2 className="animate-spin size-5" />}{' '}
                    Verify Code
                  </button>
                </form>
              )}

              {step === 3 && (
                <form
                  onSubmit={handleSubmit(onResetPassword)}
                  className="space-y-4">
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      {...register('newPassword')}
                      placeholder="Enter new password"
                      className="mt-1 h-11 bg-gray-50"
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      {...register('rePassword')}
                      placeholder="Confirm new password"
                      className="mt-1 h-11 bg-gray-50"
                    />
                    {errors.rePassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.rePassword.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 font-semibold flex justify-center items-center gap-2 mt-4">
                    {isLoading && <Loader2 className="animate-spin size-5" />}{' '}
                    Reset Password
                  </button>
                </form>
              )}

              {step !== 3 && (
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-gray-600 font-medium">
                    Remember your password?{' '}
                    <Link
                      className="text-primary hover:underline font-semibold"
                      href="/login">
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
