'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerSchema, RegisterSchemaType } from '@/lib/schemas/auth.schema';
import { SignupUser } from '@/services/auth.services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import RegisterSidebar from '@/components/auth/registersidebar';

export default function Register() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      terms: false,
    },
  });

  const passwordValue = useWatch({
    name: 'password',
    control,
    defaultValue: '',
  });

  async function handleUserRegister(values: RegisterSchemaType) {
    try {
      const response = await SignupUser(values);
      if (response.message === 'success') {
        toast.success('Account Created Successfully');
        router.push('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getPasswordStrength(password: string = '') {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 1:
      case 2:
        return { label: 'Weak', width: '20%', color: 'bg-red-500' };
      case 3:
      case 4:
        return { label: 'Fair', width: '50%', color: 'bg-orange-500' };
      case 5:
        return { label: 'Good', width: '75%', color: 'bg-blue-500' };
      case 6:
        return { label: 'Strong', width: '100%', color: 'bg-green-500' };
      default:
        return { label: 'Weak', width: '0%', color: 'bg-gray-200' };
    }
  }

  const strength = getPasswordStrength(passwordValue);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50/30">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <RegisterSidebar />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors">
              <span className="text-red-500 font-bold">G</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-colors">
              <span className="text-blue-600 font-bold">f</span> Facebook
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">or</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleUserRegister)}
            className="space-y-5">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-medium">
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    className="bg-gray-50 border-gray-200 rounded-lg h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-medium">
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    className="bg-gray-50 border-gray-200 rounded-lg h-11"
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
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-medium">
                    Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    className="bg-gray-50 border-gray-200 rounded-lg h-11"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${strength.color} h-full transition-all`}
                        style={{ width: strength.width }}></div>
                    </div>
                    <span className="text-xs text-gray-400 min-w-10">
                      {strength.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-medium">
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    className="bg-gray-50 border-gray-200 rounded-lg h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-medium">
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="01012345678"
                    className="bg-gray-50 border-gray-200 rounded-lg h-11"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="terms"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-start gap-3 mt-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="mt-1 accent-primary size-4"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-500">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      *
                    </label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              className="w-full h-11 bg-primary hover:bg-primary/90 rounded-lg text-white font-semibold mt-4"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2" /> Creating Account...
                </>
              ) : (
                'Create My Account'
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
