import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Enter your email or username.')
    .min(3, 'Use at least 3 characters.'),
  password: z
    .string()
    .min(1, 'Enter your password.')
    .min(6, 'Use at least 6 characters.'),
})
