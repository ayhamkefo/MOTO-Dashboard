import { LoginForm } from '../components/login-form'
import { useLoginForm } from '../hooks/use-login-form'

export function LoginPage() {
  const { form, handleSubmit, isSubmitting, submitError } = useLoginForm()

  return (
    <LoginForm
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitError={submitError}
    />
  )
}
