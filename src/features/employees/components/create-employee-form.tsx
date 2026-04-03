import type { CSSProperties, FormEventHandler } from 'react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { CreateEmployeeFormValues } from '../models/create-employee.schema'
import type { EmployeeRoleOption } from '../models/employee.types'

const formStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
}

const fieldGroupStyle: CSSProperties = {
  display: 'grid',
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

const passwordRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: '0.75rem',
  alignItems: 'center',
}

const helperRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const helperTextStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  fontSize: '0.875rem',
  lineHeight: 1.5,
}

const errorStyle: CSSProperties = {
  color: 'var(--color-danger)',
  fontSize: '0.875rem',
}

const statusStyle: CSSProperties = {
  minHeight: '1.25rem',
  color: 'var(--color-success)',
  fontSize: '0.875rem',
}

const secondaryButtonStyle: CSSProperties = {
  minWidth: '4.75rem',
}

interface CreateEmployeeFormProps {
  form: UseFormReturn<CreateEmployeeFormValues>
  isSubmitting: boolean
  onReset: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  roleOptions: EmployeeRoleOption[]
  submitMessage: string | null
}

export function CreateEmployeeForm({
  form,
  isSubmitting,
  onReset,
  onSubmit,
  roleOptions,
  submitMessage,
}: CreateEmployeeFormProps) {
  const {
    register,
    watch,
    formState: { errors, isDirty },
  } = form
  const [showPassword, setShowPassword] = useState(false)
  const selectedRole = watch('role')
  const selectedRoleOption = roleOptions.find((option) => option.value === selectedRole)

  return (
    <Card
      title="New employee"
    >
      <form onSubmit={onSubmit} style={formStyle}>
        <div style={fieldGroupStyle}>
          <div>
            <Input
              aria-invalid={errors.username ? 'true' : 'false'}
              autoComplete="username"
              id="employee-username"
              label="Username"
              placeholder="e.g. rami_haddad"
              {...register('username')}
            />
            {errors.username ? (
              <p role="alert" style={errorStyle}>
                {errors.username.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="ui-field" htmlFor="employee-password">
              <span className="ui-field__label">Password</span>
              <div style={passwordRowStyle}>
                <input
                  aria-invalid={errors.password ? 'true' : 'false'}
                  autoComplete="new-password"
                  className="ui-input"
                  id="employee-password"
                  placeholder="Create a secure password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <Button
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                  style={secondaryButtonStyle}
                  type="button"
                  variant="secondary"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
            </label>
            {errors.password ? (
              <p role="alert" style={errorStyle}>
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="employee-role" style={labelStyle}>
              Role
            </label>
            <select
              aria-invalid={errors.role ? 'true' : 'false'}
              className="ui-input"
              id="employee-role"
              {...register('role')}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p style={helperTextStyle}>
              {selectedRoleOption?.description}
            </p>
            {errors.role ? (
              <p role="alert" style={errorStyle}>
                {errors.role.message}
              </p>
            ) : null}
          </div>
        </div>

        <div style={helperRowStyle}>

          {isDirty ? (
            <Button onClick={onReset} type="button" variant="ghost">
              Clear
            </Button>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            <PlusIcon />
            {isSubmitting ? 'Creating...' : 'Create employee'}
          </Button>

          <div aria-live="polite" style={statusStyle}>
            {submitMessage}
          </div>
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
