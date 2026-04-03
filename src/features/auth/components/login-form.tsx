import type { CSSProperties, FormEventHandler } from 'react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { LoginFormValues } from '../models/auth.types'

const cardStyle: CSSProperties = {
  width: 'min(100%, 28rem)',
  marginInline: 'auto',
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const fieldErrorStyle: CSSProperties = {
  color: 'var(--color-danger)',
  fontSize: '0.875rem',
}

const subtleTextStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  fontSize: '0.875rem',
}

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
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <Card description="Use your account to access the dashboard." style={cardStyle} title="Sign in">
      <form onSubmit={onSubmit} style={formStyle}>
        <div>
          <Input
            autoComplete="username"
            aria-invalid={errors.identifier ? 'true' : 'false'}
            id="identifier"
            label="Username"
            placeholder="Enter your username"
            {...register('identifier')}
          />
          {errors.identifier ? (
            <p role="alert" style={fieldErrorStyle}>
              {errors.identifier.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="ui-field" htmlFor="password">
            <span className="ui-field__label">Password</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: '0.75rem',
                alignItems: 'center',
              }}
            >
              <input
                autoComplete="current-password"
                aria-invalid={errors.password ? 'true' : 'false'}
                className="ui-input"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                style={{
                  minWidth: '4.25rem',
                  minHeight: '3rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-text)',
                  fontWeight: 600,
                }}
                type="button"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          {errors.password ? (
            <p role="alert" style={fieldErrorStyle}>
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <label
          htmlFor="remember-me"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            color: 'var(--color-text-soft)',
            fontSize: '0.875rem',
          }}
        >
          <input
            checked={rememberMe}
            id="remember-me"
            onChange={(event) => setRememberMe(event.target.checked)}
            type="checkbox"
          />
          Remember me
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <div
            aria-live="polite"
            style={{
              minHeight: '1.25rem',
              padding: submitError ? '0.75rem 0.875rem' : 0,
              borderRadius: '0.875rem',
              background: submitError ? 'rgba(196, 69, 54, 0.08)' : 'transparent',
            }}
          >
            {submitError ? (
              <p role="alert" style={fieldErrorStyle}>
                {submitError}
              </p>
            ) : (
              <p style={subtleTextStyle}>Enter your credentials to continue.</p>
            )}
          </div>
        </div>
      </form>
    </Card>
  )
}
