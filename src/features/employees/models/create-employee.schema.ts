import { z } from 'zod'

import { employeeRoleValues } from '../utils/employee-ui'

export const createEmployeeSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(24, 'Username must stay under 24 characters.')
    .regex(
      /^[a-zA-Z0-9._]+$/,
      'Use only letters, numbers, dots, or underscores.',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[a-zA-Z]/, 'Password must include at least one letter.')
    .regex(/[0-9]/, 'Password must include at least one number.'),
  role: z.enum(employeeRoleValues),
})

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>
