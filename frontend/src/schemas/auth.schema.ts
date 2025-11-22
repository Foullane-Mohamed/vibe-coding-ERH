import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type RegisterFormValues = z.infer<typeof registerSchema>
