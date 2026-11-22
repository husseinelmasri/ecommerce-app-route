import * as z from 'zod';

const passwordValidation = z
  .string()
  .nonempty('Password is Required')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain one uppercase letter')
  .regex(/[a-z]/, 'Must contain one lowercase letter')
  .regex(/[0-9]/, 'Must contain one number')
  .regex(/[#?!@$%^&*-]/, 'Must contain one special character');

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is Required')
      .min(3, 'Min chars is 3')
      .max(50, 'Max chars is 50'),

    email: z.string().nonempty('Email is Required').email('Email is not Valid'),

    password: passwordValidation,

    rePassword: z.string().nonempty('Please confirm your password'),

 
    phone: z
      .string()
      .nonempty('Phone is Required')
      .regex(
        /^01[0125][0-9]{8}$/,
        'Please enter a valid 11-digit Egyptian phone number (e.g., 01012345678)'
      ),

    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords do not match',
  });

export const loginSchema = z.object({
  email: z.string().nonempty('Email is Required').email('Email is not Valid'),
  password: passwordValidation,
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;