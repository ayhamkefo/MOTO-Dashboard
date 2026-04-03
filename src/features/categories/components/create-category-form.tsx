import type { FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { CreateCategoryFormValues } from '../models/create-category.schema'

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
    <Card
      title="Create a category"
      description="Add the next catalog group from here. The form uses the final validation stack now and can be swapped onto a real mutation later without reshaping the UI."
    >
      <form className="categories-create-form" onSubmit={onSubmit}>
        <div className="categories-create-form__meta">
          <StatusBadge label="UI first" tone="info" />
          <StatusBadge label="Mutation ready" tone="warning" />
        </div>

        <div className="categories-create-form__field">
          <Input
            aria-invalid={errors.name ? 'true' : 'false'}
            autoComplete="off"
            hint="Keep names short and consistent so list pages and filters remain easy to scan."
            id="category-name"
            label="Category name"
            placeholder="Enter category name"
            {...register('name')}
          />
          {errors.name ? (
            <p className="categories-create-form__field-error" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="categories-create-form__supporting-copy">
          <p>Future create-category mutations can connect at the feature hook boundary.</p>
          <p>Until the backend contract is ready, submissions update only local page state.</p>
        </div>

        <div className="categories-create-form__actions">
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creating...' : 'Create category'}
          </Button>
        </div>

        <div aria-live="polite" className="categories-create-form__status">
          {submitMessage ? (
            <p className="categories-create-form__submit-message">{submitMessage}</p>
          ) : (
            <p className="categories-create-form__status-copy">
              This section is ready for a real mutation hook once the categories API is
              available.
            </p>
          )}
        </div>
      </form>
    </Card>
  )
}
