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
              <span>{item.label}</span>
              <small>{item.description}</small>
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
              <StatusBadge label="Protected route" tone="success" />
              <StatusBadge
                label={session ? `Signed in as ${session.userIdentifier}` : 'No session'}
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
