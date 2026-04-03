import { Outlet } from 'react-router-dom'

import { APP_NAME } from '../../shared/constants/app-nav'

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

          {/* <div className="auth-layout__intro-card">
            <p className="auth-layout__intro-title">Built for everyday store operations</p>
            <ul className="auth-layout__intro-list">
              <li>Review inventory activity and product organization from one workspace.</li>
              <li>Keep team administration and operational follow-up in a single admin flow.</li>
              <li>Move quickly through daily catalog, employee, and feedback tasks.</li>
            </ul>
          </div> */}
        </section>

        <div className="auth-layout__panel">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
