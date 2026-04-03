import type { z } from 'zod'

import type { loginSchema } from './login.schema'

export type LoginFormValues = z.infer<typeof loginSchema>

export interface LoginRequest {
  identifier: string
  password: string
}

export interface AuthSession {
  accessToken: string
  userIdentifier: string
  issuedAt: string
}

export interface LoginResponse {
  session: AuthSession
}
