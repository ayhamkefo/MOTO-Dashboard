import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import { StatusBadge } from '../../../shared/components/status-badge'

export function LoginPage() {
  return (
    <Card
      title="Sign in"
      description="This is a foundation-only auth screen. Real form validation and API integration will be added later."
    >
      <form className="login-form" onSubmit={(event) => event.preventDefault()}>
        <div className="placeholder-meta">
          <StatusBadge label="Public route" tone="info" />
          <StatusBadge label="No auth flow yet" tone="warning" />
        </div>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="admin@motostore.com"
          hint="Shared input styling is ready for React Hook Form later."
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
        />
        <Button type="submit">Continue</Button>
      </form>
    </Card>
  )
}
