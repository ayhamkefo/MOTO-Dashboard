import type { CSSProperties, FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { CreateCategoryFormValues } from '../models/create-category.schema'

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: '0.75rem',
  alignItems: 'start',
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

interface CreateCategoryFormProps {
  form: UseFormReturn<CreateCategoryFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting: boolean
  submitMessage: string | null
}

export function CreateCategoryForm({
  form,
  isSubmitting,
  onSubmit,
  submitMessage,
}: CreateCategoryFormProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card title="New category">
      <form onSubmit={onSubmit} style={formStyle}>
        <div style={rowStyle}>
          <Input
            aria-invalid={errors.name ? 'true' : 'false'}
            autoComplete="off"
            id="category-name"
            label="Category name"
            placeholder="e.g. Helmets"
            {...register('name')}
          />
          <Button
            aria-busy={isSubmitting}
            disabled={isSubmitting}
            style={{ alignSelf: 'end', minWidth: '9.5rem' }}
            type="submit"
          >
            <PlusIcon />
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </div>

        <div style={{ minHeight: '1.25rem' }}>
          {errors.name ? (
            <p role="alert" style={errorStyle}>
              {errors.name.message}
            </p>
          ) : null}
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
