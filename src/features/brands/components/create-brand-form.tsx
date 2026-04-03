import type { CSSProperties, FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { CreateBrandFormValues } from '../models/create-brand.schema'
import { BrandLogoUpload } from './brand-logo-upload'

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const errorStyle: CSSProperties = {
  color: 'var(--color-danger)',
  fontSize: '0.875rem',
}

const statusStyle: CSSProperties = {
  minHeight: '1.25rem',
  color: 'var(--color-text-soft)',
  fontSize: '0.875rem',
}

interface CreateBrandFormProps {
  form: UseFormReturn<CreateBrandFormValues>
  isSubmitting: boolean
  logoPreviewUrl: string | null
  onLogoFileChange: (file: File | null) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  submitMessage: string | null
  uploadMessage: string | null
}

export function CreateBrandForm({
  form,
  isSubmitting,
  logoPreviewUrl,
  onLogoFileChange,
  onSubmit,
  submitMessage,
  uploadMessage,
}: CreateBrandFormProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card title="New brand">
      <form onSubmit={onSubmit} style={formStyle}>
        <Input
          aria-invalid={errors.name ? 'true' : 'false'}
          autoComplete="off"
          id="brand-name"
          label="Brand name"
          placeholder="e.g. Bell"
          {...register('name')}
        />

        <div style={{ minHeight: '1.25rem' }}>
          {errors.name ? (
            <p role="alert" style={errorStyle}>
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <BrandLogoUpload
          errorMessage={errors.logoFile?.message}
          onFileChange={onLogoFileChange}
          previewUrl={logoPreviewUrl}
          statusMessage={uploadMessage}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            <PlusIcon />
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </div>

        <div aria-live="polite" style={statusStyle}>
          {submitMessage}
        </div>
      </form>
    </Card>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M8 3.333v9.334M3.333 8h9.334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
