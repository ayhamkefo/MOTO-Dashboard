import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthSession } from '../hooks/use-auth-session'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated } = useAuthSession()

  if (!isAuthenticated) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`

    return (
      <Navigate
        replace
        to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
      />
    )
  }

  return <Outlet />
}
