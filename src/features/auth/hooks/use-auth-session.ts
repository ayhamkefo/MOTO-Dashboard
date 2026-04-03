import { useSyncExternalStore } from 'react'

import {
  clearAuthSession,
  readAuthSession,
  subscribeToAuthSession,
} from '../utils/auth-session'

export function useAuthSession() {
  const session = useSyncExternalStore(
    subscribeToAuthSession,
    readAuthSession,
    () => null,
  )

  return {
    session,
    isAuthenticated: session !== null,
    clearSession: clearAuthSession,
  }
}
