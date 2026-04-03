import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { initializeAuthSession } from '../../features/auth/utils/auth-session'
import { queryClient } from './query-client'

function AuthSessionBootstrap() {
  useEffect(() => {
    initializeAuthSession()
  }, [])

  return null
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionBootstrap />
      {children}
    </QueryClientProvider>
  )
}
