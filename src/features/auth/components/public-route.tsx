import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthSession } from '../hooks/use-auth-session'

const DEFAULT_AUTHENTICATED_REDIRECT = '/dashboard'

export function PublicRoute() {
  const location = useLocation()
  const { isAuthenticated } = useAuthSession()

  if (isAuthenticated) {
    const searchParams = new URLSearchParams(location.search)
    const redirectTo = searchParams.get('redirectTo')
    const destination =
      redirectTo && redirectTo.startsWith('/')
        ? redirectTo
        : DEFAULT_AUTHENTICATED_REDIRECT

    return <Navigate replace to={destination} />
  }

  return <Outlet />
}
