import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import {
  createProductSchema,
  type CreateProductFormValues,
} from '../models/create-product.schema'
import {
  PRODUCT_BRAND_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  buildProductDraftPreview,
  mapCreateProductFormToPayload,
  normalizeTagValue,
} from '../utils/product-ui'

function addUniqueTag(values: string[], draft: string) {
  const normalizedDraft = normalizeTagValue(draft)

  if (!normalizedDraft) {
    return values
  }

  const alreadyExists = values.some(
    (value) => value.toLowerCase() === normalizedDraft.toLowerCase(),
  )

  if (alreadyExists) {
    return values
  }

  return [...values, normalizedDraft]
}

export function useCreateProductForm() {
  const [colorDraft, setColorDraft] = useState('')
  const [featureDraft, setFeatureDraft] = useState('')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      brandId: '',
      categoryId: '',
      price: '',
      quantity: '',
      colors: [],
      keyFeatures: [],
    },
  })

  const watchedValues = useWatch({
    control: form.control,
  })

  const colors = useMemo(() => watchedValues.colors ?? [], [watchedValues.colors])
  const keyFeatures = useMemo(
    () => watchedValues.keyFeatures ?? [],
    [watchedValues.keyFeatures],
  )

  const preview = useMemo(
    () =>
      buildProductDraftPreview(
        {
          name: watchedValues.name ?? '',
          description: watchedValues.description ?? '',
          brandId: watchedValues.brandId ?? '',
          categoryId: watchedValues.categoryId ?? '',
          price: watchedValues.price ?? '',
          quantity: watchedValues.quantity ?? '',
          colors,
          keyFeatures,
        },
        PRODUCT_BRAND_OPTIONS,
        PRODUCT_CATEGORY_OPTIONS,
      ),
    [
      colors,
      keyFeatures,
      watchedValues.brandId,
      watchedValues.categoryId,
      watchedValues.description,
      watchedValues.name,
      watchedValues.price,
      watchedValues.quantity,
    ],
  )

  const handleAddColor = () => {
    const nextColors = addUniqueTag(colors, colorDraft)
    form.setValue('colors', nextColors, {
      shouldDirty: true,
      shouldValidate: nextColors.length > 0,
    })
    setColorDraft('')
    form.clearErrors('colors')
  }

  const handleRemoveColor = (valueToRemove: string) => {
    const nextColors = colors.filter((value) => value !== valueToRemove)
    form.setValue('colors', nextColors, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const handleAddFeature = () => {
    const nextFeatures = addUniqueTag(keyFeatures, featureDraft)
    form.setValue('keyFeatures', nextFeatures, {
      shouldDirty: true,
      shouldValidate: nextFeatures.length > 0,
    })
    setFeatureDraft('')
    form.clearErrors('keyFeatures')
  }

  const handleRemoveFeature = (valueToRemove: string) => {
    const nextFeatures = keyFeatures.filter((value) => value !== valueToRemove)
    form.setValue('keyFeatures', nextFeatures, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    const payload = mapCreateProductFormToPayload(values)

    setSubmitMessage(`${payload.name} is ready for catalog review.`)
  })

  return {
    brandOptions: PRODUCT_BRAND_OPTIONS,
    categoryOptions: PRODUCT_CATEGORY_OPTIONS,
    colorDraft,
    colors,
    featureDraft,
    keyFeatures,
    form,
    handleAddColor,
    handleAddFeature,
    handleRemoveColor,
    handleRemoveFeature,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    preview,
    setColorDraft,
    setFeatureDraft,
    submitMessage,
  }
}
