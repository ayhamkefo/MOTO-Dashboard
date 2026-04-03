import { z } from 'zod'

const isValidCurrency = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0
}

const isValidQuantity = (value: string) => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed >= 0
}

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Product name must be at least 2 characters.')
    .max(80, 'Product name must be 80 characters or fewer.'),
  description: z
    .string()
    .trim()
    .min(24, 'Description must be at least 24 characters.')
    .max(600, 'Description must be 600 characters or fewer.'),
  brandId: z.string().min(1, 'Choose a brand.'),
  categoryId: z.string().min(1, 'Choose a category.'),
  price: z
    .string()
    .trim()
    .min(1, 'Enter a price.')
    .refine(isValidCurrency, 'Enter a valid price greater than zero.'),
  quantity: z
    .string()
    .trim()
    .min(1, 'Enter a quantity.')
    .refine(isValidQuantity, 'Enter a whole number of units.'),
  colors: z.array(z.string().trim().min(1)).min(1, 'Add at least one color.'),
  keyFeatures: z
    .array(z.string().trim().min(1))
    .min(1, 'Add at least one key feature.'),
})

export type CreateProductFormValues = z.infer<typeof createProductSchema>
