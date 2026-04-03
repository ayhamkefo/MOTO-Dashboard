import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Category name must be at least 2 characters.')
    .max(40, 'Category name must stay under 40 characters.'),
})

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>
