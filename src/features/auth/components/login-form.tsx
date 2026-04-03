import type { FormEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { LoginFormValues } from '../models/auth.types'

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting: boolean
  submitError: string | null
}

export function LoginForm({
  form,
  isSubmitting,
  onSubmit,
  submitError,
}: LoginFormProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card
      className="login-card"
      title="Sign in"
      description="Use your staff account to enter the admin workspace. This screen is integration-ready and currently persists a local session until backend auth is deployed."
    >
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-form__meta">
          <StatusBadge label="Public route" tone="info" />
          <StatusBadge label="Local session for now" tone="warning" />
        </div>

        <div className="login-form__field">
          <Input
            autoComplete="username"
            aria-invalid={errors.identifier ? 'true' : 'false'}
            hint="Use the same identifier field later for email or username based login."
            id="identifier"
            label="Email or username"
            placeholder="admin@motostore.com"
            {...register('identifier')}
          />
          {errors.identifier ? (
            <p className="login-form__field-error" role="alert">
              {errors.identifier.message}
            </p>
          ) : null}
        </div>

        <div className="login-form__field">
          <Input
            autoComplete="current-password"
            aria-invalid={errors.password ? 'true' : 'false'}
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register('password')}
          />
          {errors.password ? (
            <p className="login-form__field-error" role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="login-form__supporting-copy">
          <p>Protected routes will redirect back here until a valid session exists.</p>
          <p>The real login endpoint can later replace the current adapter in one place.</p>
        </div>

        <div className="login-form__actions">
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Continue to dashboard'}
          </Button>
        </div>

        <div aria-live="polite" className="login-form__status">
          {submitError ? (
            <p className="login-form__submit-error" role="alert">
              {submitError}
            </p>
          ) : (
            <p className="login-form__status-copy">
              Session persistence currently stays local to this browser while backend
              deployment is in progress.
            </p>
          )}
        </div>
      </form>
    </Card>
  )
}
