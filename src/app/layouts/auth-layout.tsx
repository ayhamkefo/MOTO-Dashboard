import { Outlet } from 'react-router-dom'

import { APP_NAME } from '../../shared/constants/app-nav'

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__panel">
        <div className="auth-layout__brand">
          <p className="auth-layout__eyebrow">{APP_NAME}</p>
          <h1 className="auth-layout__title">Admin access</h1>
          <p className="auth-layout__description">
            Shared auth UI foundation for future login and session handling.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
