import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createCategorySchema, type CreateCategoryFormValues } from '../models/create-category.schema'
import type { Category } from '../models/category.types'
import { buildLocalCategory } from '../utils/category-ui'

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'category-smartphones',
    name: 'Smartphones',
    productCount: 148,
    updatedLabel: 'Updated 2 hours ago',
    accent: 'blue',
  },
  {
    id: 'category-tablets',
    name: 'Tablets',
    productCount: 36,
    updatedLabel: 'Updated today',
    accent: 'green',
  },
  {
    id: 'category-accessories',
    name: 'Accessories',
    productCount: 212,
    updatedLabel: 'Updated yesterday',
    accent: 'amber',
  },
  {
    id: 'category-wearables',
    name: 'Wearables',
    productCount: 24,
    updatedLabel: 'Updated this week',
    accent: 'slate',
  },
]

export function useCategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  })

  const handleCreateCategory = form.handleSubmit(async ({ name }) => {
    const normalizedName = name.trim()

    setCategories((currentCategories) => [buildLocalCategory(normalizedName), ...currentCategories])
    setSubmitMessage(`${normalizedName} has been added.`)
    form.reset()
  })

  const categoriesCountLabel = useMemo(() => {
    const count = categories.length
    return `${count} ${count === 1 ? 'category' : 'categories'}`
  }, [categories.length])

  return {
    form,
    categories,
    categoriesCount: categories.length,
    categoriesCountLabel,
    handleCreateCategory,
    isSubmitting: form.formState.isSubmitting,
    submitMessage,
  }
}
