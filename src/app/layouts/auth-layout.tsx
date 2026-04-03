import { Outlet } from 'react-router-dom'

import { APP_NAME } from '../../shared/constants/app-nav'
import { StatusBadge } from '../../shared/components/status-badge'

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__shell">
        <section className="auth-layout__intro">
          <div className="auth-layout__brand">
            <p className="auth-layout__eyebrow">{APP_NAME}</p>
            <h1 className="auth-layout__title">Admin access for the store workspace</h1>
            <p className="auth-layout__description">
              Sign in to manage catalog operations, employee workflows, and dashboard
              activity from one controlled interface.
            </p>
          </div>

          <div className="auth-layout__intro-meta">
            <StatusBadge label="Auth foundation" tone="info" />
            <StatusBadge label="Backend hookup pending" tone="warning" />
          </div>

          <div className="auth-layout__intro-card">
            <p className="auth-layout__intro-title">Prepared for the next integration step</p>
            <ul className="auth-layout__intro-list">
              <li>Public entry route with protected dashboard redirect handling.</li>
              <li>Local session boundary that can later swap to real token persistence.</li>
              <li>Feature-local login schema, hook, and API adapter ready for backend replacement.</li>
            </ul>
          </div>
        </section>

        <div className="auth-layout__panel">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
