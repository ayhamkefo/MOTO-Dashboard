import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createBrandSchema, type CreateBrandFormValues } from '../models/create-brand.schema'
import type { Brand } from '../models/brand.types'
import { buildLocalBrand, readBrandLogoPreview } from '../utils/brand-ui'

const INITIAL_BRANDS: Brand[] = [
  {
    id: 'brand-apple',
    name: 'Apple',
    productCount: 84,
    updatedLabel: 'Updated 1 hour ago',
    accent: 'blue',
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    productCount: 112,
    updatedLabel: 'Updated today',
    accent: 'green',
  },
  {
    id: 'brand-xiaomi',
    name: 'Xiaomi',
    productCount: 53,
    updatedLabel: 'Updated yesterday',
    accent: 'amber',
  },
  {
    id: 'brand-nothing',
    name: 'Nothing',
    productCount: 16,
    updatedLabel: 'Updated this week',
    accent: 'slate',
  },
]

export function useBrandsPage() {
  const [brands, setBrands] = useState(INITIAL_BRANDS)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)

  const form = useForm<CreateBrandFormValues>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: '',
      logoFile: undefined,
    },
  })

  const handleLogoFileChange = async (file: File | null) => {
    if (!file) {
      form.resetField('logoFile', {
        defaultValue: undefined,
      })
      setLogoPreviewUrl(null)
      setUploadMessage(null)
      return
    }

    form.clearErrors('logoFile')
    form.setValue('logoFile', file, {
      shouldDirty: true,
      shouldValidate: true,
    })

    try {
      const previewUrl = await readBrandLogoPreview(file)
      setLogoPreviewUrl(previewUrl)
      setUploadMessage(`${file.name} selected.`)
    } catch {
      form.setError('logoFile', {
        type: 'manual',
        message: 'The selected image could not be previewed. Try another file.',
      })
      setLogoPreviewUrl(null)
      setUploadMessage(null)
    }
  }

  const handleCreateBrand = form.handleSubmit(async ({ logoFile, name }) => {
    const normalizedName = name.trim()
    const localLogoPreview = await readBrandLogoPreview(logoFile)

    setBrands((currentBrands) => [
      buildLocalBrand({
        name: normalizedName,
        logoUrl: localLogoPreview,
      }),
      ...currentBrands,
    ])
    setSubmitMessage(`${normalizedName} has been added.`)
    setUploadMessage(null)
    setLogoPreviewUrl(null)
    form.reset({
      name: '',
      logoFile: undefined,
    })
  })

  const brandsCountLabel = useMemo(() => {
    const count = brands.length
    return `${count} ${count === 1 ? 'brand' : 'brands'}`
  }, [brands.length])

  return {
    brands,
    brandsCount: brands.length,
    brandsCountLabel,
    form,
    handleCreateBrand,
    handleLogoFileChange,
    isSubmitting: form.formState.isSubmitting,
    logoPreviewUrl,
    submitMessage,
    uploadMessage,
  }
}
