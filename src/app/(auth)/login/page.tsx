'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import StaticAuth from '@/components/common/Navbar/staticAuth';

import { loginSchema, LoginSchemaType } from '@/lib/schemas/auth.schema';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const router = useRouter();

  async function handleUserLogin(values: LoginSchemaType) {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success('Login Successfully');
      router.push('/');
    } else {
      toast.error(response?.error ?? 'Invalid credentials');
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
        <div className="hidden lg:block">
          <StaticAuth />
        </div>

        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(handleUserLogin)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="Enter Your Email"
                    className="bg-white border-gray-300 rounded-xl h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link
                      href="/forget-password"
                      className="text-sm text-primary hover:underline font-medium">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Enter Your Password"
                    className="bg-white border-gray-300 rounded-xl h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              className="w-full h-11 mt-2"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
