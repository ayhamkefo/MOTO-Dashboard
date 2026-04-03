import { z } from 'zod'

const fileSchema = z.custom<File>(
  (value) => value instanceof File,
  'Brand logo is required.',
)

export const createBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Brand name must be at least 2 characters.')
    .max(40, 'Brand name must stay under 40 characters.'),
  logoFile: fileSchema,
})

export type CreateBrandFormValues = z.infer<typeof createBrandSchema>
