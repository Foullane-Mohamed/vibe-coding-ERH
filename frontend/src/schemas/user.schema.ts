import * as z from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'doctor', 'nurse', 'secretary', 'patient', 'pharmacist', 'lab_technician']),
});

export type UserFormValues = z.infer<typeof userSchema>;
