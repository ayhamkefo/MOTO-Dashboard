import type { LoginRequest, LoginResponse } from '../models/auth.types'

const AUTH_MOCK_DELAY_MS = 500

function wait(delayMs: number) {
  return new Promise((resolve) => window.setTimeout(resolve, delayMs))
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  await wait(AUTH_MOCK_DELAY_MS)

  // Temporary local-only adapter until the backend auth contract is finalized.
  // Replace this function body with the real endpoint call later.
  return {
    session: {
      accessToken: `local-session-${crypto.randomUUID()}`,
      userIdentifier: payload.identifier.trim(),
      issuedAt: new Date().toISOString(),
    },
  }
}
