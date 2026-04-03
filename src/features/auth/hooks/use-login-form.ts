import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { login } from '../api/auth-api'
import { loginSchema } from '../models/login.schema'
import type { LoginFormValues } from '../models/auth.types'
import { persistAuthSession } from '../utils/auth-session'

const DEFAULT_REDIRECT_PATH = '/dashboard'

function resolveRedirectTarget(search: string) {
  const searchParams = new URLSearchParams(search)
  const redirectTo = searchParams.get('redirectTo')

  if (!redirectTo || !redirectTo.startsWith('/')) {
    return DEFAULT_REDIRECT_PATH
  }

  return redirectTo
}

export function useLoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const redirectTo = resolveRedirectTarget(location.search)

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null)

    try {
      const response = await login(values)
      persistAuthSession(response.session)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Sign-in is unavailable right now. Retry once the auth service is ready.'

      setSubmitError(message)
    }
  })

  return {
    form,
    handleSubmit,
    submitError,
    isSubmitting: form.formState.isSubmitting,
  }
}
