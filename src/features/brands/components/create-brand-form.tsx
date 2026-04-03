import type { FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { CreateBrandFormValues } from '../models/create-brand.schema'
import { BrandLogoUpload } from './brand-logo-upload'

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
    <Card
      title="Create a brand"
      description="Stage the brand name and visual identity from one compact admin surface. Validation and upload boundaries are in place now so the final API can connect without reshaping the form."
    >
      <form className="brands-create-form" onSubmit={onSubmit}>
        <div className="brands-create-form__meta">
          <StatusBadge label="UI first" tone="info" />
          <StatusBadge label="Upload ready" tone="warning" />
          <StatusBadge label="Mutation ready" tone="warning" />
        </div>

        <div className="brands-create-form__grid">
          <div className="brands-create-form__field">
            <Input
              aria-invalid={errors.name ? 'true' : 'false'}
              autoComplete="off"
              hint="Keep the label consistent with supplier data and catalog naming."
              id="brand-name"
              label="Brand name"
              placeholder="Enter brand name"
              {...register('name')}
            />
            {errors.name ? (
              <p className="brands-create-form__field-error" role="alert">
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
        </div>

        <div className="brands-create-form__supporting-copy">
          <p>The current submit action updates only local page state to keep the feature honest while the backend is unfinished.</p>
          <p>The selected file stays isolated in the feature layer, which keeps the eventual upload adapter swap small and predictable.</p>
        </div>

        <div className="brands-create-form__actions">
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creating...' : 'Create brand'}
          </Button>
        </div>

        <div aria-live="polite" className="brands-create-form__status">
          {submitMessage ? (
            <p className="brands-create-form__submit-message">{submitMessage}</p>
          ) : (
            <p className="brands-create-form__status-copy">
              This form is ready for a future create-brand mutation and upload handoff.
            </p>
          )}
        </div>
      </form>
    </Card>
  )
}
