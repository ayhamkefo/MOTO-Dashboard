import { setApiAuthToken } from '../../../shared/api/api-client'
import type { AuthSession } from '../models/auth.types'

const AUTH_SESSION_STORAGE_KEY = 'moto-dashboard.auth.session'
const AUTH_SESSION_EVENT = 'moto-dashboard:auth-session'

let cachedSessionStorageValue: string | null | undefined
let cachedSessionSnapshot: AuthSession | null = null

function isBrowser() {
  return typeof window !== 'undefined'
}

function parseSession(value: string | null): AuthSession | null {
  if (!value) {
    return null
  }

  try {
    const parsed = JSON.parse(value) as Partial<AuthSession>

    if (
      typeof parsed.accessToken !== 'string' ||
      typeof parsed.userIdentifier !== 'string' ||
      typeof parsed.issuedAt !== 'string'
    ) {
      return null
    }

    return {
      accessToken: parsed.accessToken,
      userIdentifier: parsed.userIdentifier,
      issuedAt: parsed.issuedAt,
    }
  } catch {
    return null
  }
}

function syncApiToken(session: AuthSession | null) {
  setApiAuthToken(session?.accessToken ?? null)
}

function emitAuthSessionChange() {
  if (!isBrowser()) {
    return
  }

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT))
}

export function readAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null
  }

  const storageValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY)

  if (storageValue === cachedSessionStorageValue) {
    return cachedSessionSnapshot
  }

  const session = parseSession(storageValue)

  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    cachedSessionStorageValue = null
    cachedSessionSnapshot = null

    return null
  }

  cachedSessionStorageValue = storageValue
  cachedSessionSnapshot = session

  return session
}

export function initializeAuthSession() {
  syncApiToken(readAuthSession())
}

export function persistAuthSession(session: AuthSession) {
  if (!isBrowser()) {
    return
  }

  const serializedSession = JSON.stringify(session)

  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, serializedSession)
  cachedSessionStorageValue = serializedSession
  cachedSessionSnapshot = session
  syncApiToken(session)
  emitAuthSessionChange()
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
  cachedSessionStorageValue = null
  cachedSessionSnapshot = null
  syncApiToken(null)
  emitAuthSessionChange()
}

export function subscribeToAuthSession(callback: () => void) {
  if (!isBrowser()) {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === AUTH_SESSION_STORAGE_KEY) {
      callback()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(AUTH_SESSION_EVENT, callback)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(AUTH_SESSION_EVENT, callback)
  }
}
