import z from 'zod';

const emailSchema = z
  .email('Please enter a valid email')
  .trim()
  .min(1, 'Email is required');

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must be less than 100 characters')
  .regex(
    /[a-z]/,
    'Password must contain at least one lowercase letter',
  )
  .regex(
    /[A-Z]/,
    'Password must contain at least one uppercase letter',
  )
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^a-zA-Z0-9]/,
    'Password must contain at least one special character',
  );

export const registerFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .min(3, {
      message: 'First name must be at least 3 characters',
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .min(3, {
      message: 'Last name must be at least 3 characters',
    }),
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginFormSchema>;
