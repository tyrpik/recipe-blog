import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
})

export const LoginSchema = z.object({
  emailOrPhone: z.string(),
  password: z.string(),
})