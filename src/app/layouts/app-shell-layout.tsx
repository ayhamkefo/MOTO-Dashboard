import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthSession } from '../../features/auth/hooks/use-auth-session'
import { APP_NAME, appNavItems } from '../../shared/constants/app-nav'
import { Button } from '../../shared/components/button'
import { StatusBadge } from '../../shared/components/status-badge'
import { cn } from '../../shared/utils/cn'

function getActiveSection(pathname: string) {
  return appNavItems.find((item) => pathname.startsWith(item.path)) ?? appNavItems[0]
}

export function AppShellLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeSection = getActiveSection(location.pathname)
  const { clearSession, session } = useAuthSession()

  function handleSignOut() {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <span className="app-sidebar__brand-mark">M</span>
          <div>
            <p className="app-sidebar__brand-name">{APP_NAME}</p>
            <p className="app-sidebar__brand-copy">Mobile store admin</p>
          </div>
        </div>

        <nav className="app-sidebar__nav" aria-label="Primary navigation">
          {appNavItems.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                cn('app-sidebar__link', isActive && 'app-sidebar__link--active')
              }
              to={item.path}
            >
              <span className="app-sidebar__link-icon" aria-hidden="true">
                <NavItemIcon label={item.label} />
              </span>
              <span className="app-sidebar__link-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-shell__content">
        <header className="app-topbar">
          <div>
            <p className="app-topbar__eyebrow">Current section</p>
            <h1 className="app-topbar__title">{activeSection.label}</h1>
          </div>
          <div className="app-topbar__actions">
            <div className="app-topbar__meta">
              <StatusBadge
                label={session ? `Signed in as ${session.userIdentifier}` : 'Admin session'}
                tone="info"
              />
            </div>
            <Button onClick={handleSignOut} variant="ghost">
              Sign out
            </Button>
          </div>
        </header>

        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function NavItemIcon({ label }: { label: string }) {
  switch (label) {
    case 'Dashboard':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M4 5.75A1.75 1.75 0 0 1 5.75 4h4.5A1.75 1.75 0 0 1 12 5.75v4.5A1.75 1.75 0 0 1 10.25 12h-4.5A1.75 1.75 0 0 1 4 10.25v-4.5ZM12 13.75A1.75 1.75 0 0 1 13.75 12h4.5A1.75 1.75 0 0 1 20 13.75v4.5A1.75 1.75 0 0 1 18.25 20h-4.5A1.75 1.75 0 0 1 12 18.25v-4.5ZM4 13.75A1.75 1.75 0 0 1 5.75 12h4.5A1.75 1.75 0 0 1 12 13.75v4.5A1.75 1.75 0 0 1 10.25 20h-4.5A1.75 1.75 0 0 1 4 18.25v-4.5ZM12 5.75A1.75 1.75 0 0 1 13.75 4h4.5A1.75 1.75 0 0 1 20 5.75v4.5A1.75 1.75 0 0 1 18.25 12h-4.5A1.75 1.75 0 0 1 12 10.25v-4.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'Categories':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M6 7h12M6 12h12M6 17h8M4.75 7h.5M4.75 12h.5M4.75 17h.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      )
    case 'Brands':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M6.5 5.5h7l4 4v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5.5 18.5v-11A2 2 0 0 1 7.5 5.5Zm6 0V10h5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'Products':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M6.75 7.25 12 4l5.25 3.25M6 8.25 12 12m6-3.75L12 12m0 0v8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M6.75 7.25 12 10.5l5.25-3.25M6 8.25v7.5L12 20m6-11.75v7.5L12 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'Employees':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M12 12a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM6.5 19a5.5 5.5 0 0 1 11 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )
    case 'Feedback':
      return (
        <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
          <path
            d="M7 17.5h4l4.25 3.5v-3.5h1.25A2.5 2.5 0 0 0 19 15V7.5A2.5 2.5 0 0 0 16.5 5h-9A2.5 2.5 0 0 0 5 7.5V15A2.5 2.5 0 0 0 7.5 17.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      )
    default:
      return null
  }
}
