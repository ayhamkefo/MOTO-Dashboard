import type { CSSProperties, FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import type { CreateProductFormValues } from '../models/create-product.schema'
import type { ProductSelectOption } from '../models/product.types'
import { ProductFormSection } from './product-form-section'
import { ProductTagsInput } from './product-tags-input'

const formStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
}

const twoColumnStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1rem',
}

const fieldStyle: CSSProperties = {
  display: 'grid',
  gap: '0.375rem',
}

const labelStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
}

const textareaStyle: CSSProperties = {
  minHeight: '7rem',
  padding: '0.75rem 1rem',
  resize: 'vertical',
}

const errorStyle: CSSProperties = {
  color: 'var(--color-danger)',
  fontSize: '0.875rem',
}

const statusStyle: CSSProperties = {
  minHeight: '1.5rem',
  color: 'var(--color-success)',
  fontSize: '0.875rem',
}

const sectionTitleStyle: CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.2,
  fontWeight: 700,
  color: 'var(--color-primary)',
}

interface CreateProductFormProps {
  form: UseFormReturn<CreateProductFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting: boolean
  submitMessage: string | null
  brandOptions: ProductSelectOption[]
  categoryOptions: ProductSelectOption[]
  colorDraft: string
  onColorDraftChange: (value: string) => void
  onAddColor: () => void
  onRemoveColor: (value: string) => void
  featureDraft: string
  onFeatureDraftChange: (value: string) => void
  onAddFeature: () => void
  onRemoveFeature: (value: string) => void
}

export function CreateProductForm({
  brandOptions,
  categoryOptions,
  colorDraft,
  featureDraft,
  form,
  isSubmitting,
  onAddColor,
  onAddFeature,
  onColorDraftChange,
  onFeatureDraftChange,
  onRemoveColor,
  onRemoveFeature,
  onSubmit,
  submitMessage,
}: CreateProductFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form

  const colors = watch('colors')
  const keyFeatures = watch('keyFeatures')

  return (
    <div style={{ maxWidth: '48rem' }}>
      <Card>
        <form onSubmit={onSubmit} style={formStyle}>
          <div style={{ display: 'grid', gap: '0.875rem' }}>
            <h2 style={sectionTitleStyle}>Basic info</h2>
            <div style={fieldStyle}>
              <label htmlFor="product-name" style={labelStyle}>
                Product name
              </label>
              <input
                aria-invalid={errors.name ? 'true' : 'false'}
                autoComplete="off"
                className="ui-input"
                id="product-name"
                placeholder="Galaxy Z Fold 6"
                {...register('name')}
              />
              {errors.name ? (
                <p role="alert" style={errorStyle}>
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div style={fieldStyle}>
              <label htmlFor="product-description" style={labelStyle}>
                Description
              </label>
              <textarea
                aria-invalid={errors.description ? 'true' : 'false'}
                className="ui-input"
                id="product-description"
                placeholder="Short product description"
                style={textareaStyle}
                {...register('description')}
              />
              {errors.description ? (
                <p role="alert" style={errorStyle}>
                  {errors.description.message}
                </p>
              ) : null}
            </div>
          </div>

          <ProductFormSection title="Classification">
            <div style={twoColumnStyle}>
              <SelectField
                errorMessage={errors.brandId?.message}
                id="product-brand"
                label="Brand"
                options={brandOptions}
                placeholder="Choose brand"
                registration={register('brandId')}
              />
              <SelectField
                errorMessage={errors.categoryId?.message}
                id="product-category"
                label="Category"
                options={categoryOptions}
                placeholder="Choose category"
                registration={register('categoryId')}
              />
            </div>
          </ProductFormSection>

          <ProductFormSection title="Pricing">
            <div style={twoColumnStyle}>
              <div style={fieldStyle}>
                <label htmlFor="product-price" style={labelStyle}>
                  Price
                </label>
                <input
                  aria-invalid={errors.price ? 'true' : 'false'}
                  className="ui-input"
                  id="product-price"
                  inputMode="decimal"
                  placeholder="1099"
                  {...register('price')}
                />
                {errors.price ? (
                  <p role="alert" style={errorStyle}>
                    {errors.price.message}
                  </p>
                ) : null}
              </div>

              <div style={fieldStyle}>
                <label htmlFor="product-quantity" style={labelStyle}>
                  Quantity
                </label>
                <input
                  aria-invalid={errors.quantity ? 'true' : 'false'}
                  className="ui-input"
                  id="product-quantity"
                  inputMode="numeric"
                  placeholder="24"
                  {...register('quantity')}
                />
                {errors.quantity ? (
                  <p role="alert" style={errorStyle}>
                    {errors.quantity.message}
                  </p>
                ) : null}
              </div>
            </div>
          </ProductFormSection>

          <ProductFormSection title="Colors & Key features">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <ProductTagsInput
                addLabel="Add"
                errorMessage={errors.colors?.message}
                id="product-colors"
                label="Colors"
                onAdd={onAddColor}
                onRemove={onRemoveColor}
                onValueChange={onColorDraftChange}
                placeholder="Titanium Blue"
                value={colorDraft}
                values={colors}
              />

              <ProductTagsInput
                addLabel="Add"
                errorMessage={errors.keyFeatures?.message}
                id="product-key-features"
                label="Key features"
                onAdd={onAddFeature}
                onRemove={onRemoveFeature}
                onValueChange={onFeatureDraftChange}
                placeholder="144Hz AMOLED display"
                value={featureDraft}
                values={keyFeatures}
              />
            </div>
          </ProductFormSection>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
              <SaveIcon />
              {isSubmitting ? 'Saving...' : 'Save product'}
            </Button>
            <div aria-live="polite" style={statusStyle}>
              {submitMessage}
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

interface SelectFieldProps {
  id: string
  label: string
  options: ProductSelectOption[]
  placeholder: string
  errorMessage?: string
  registration: ReturnType<UseFormReturn<CreateProductFormValues>['register']>
}

function SelectField({
  errorMessage,
  id,
  label,
  options,
  placeholder,
  registration,
}: SelectFieldProps) {
  return (
    <div style={fieldStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      <select aria-invalid={errorMessage ? 'true' : 'false'} className="ui-input" id={id} {...registration}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage ? (
        <p role="alert" style={errorStyle}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}

function SaveIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M3.556 2.667h7.776l1.778 1.777v8.223a.889.889 0 0 1-.888.889H3.778a.889.889 0 0 1-.889-.889V3.556c0-.49.398-.89.889-.89Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.333 2.667v3.11h4.889v-3.11M5.333 13.556V9.778h5.334v3.778"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
