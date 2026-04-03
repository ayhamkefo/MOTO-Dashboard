import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { APP_NAME, appNavItems } from '../../shared/constants/app-nav'
import { StatusBadge } from '../../shared/components/status-badge'
import { cn } from '../../shared/utils/cn'

function getActiveSection(pathname: string) {
  return appNavItems.find((item) => pathname.startsWith(item.path)) ?? appNavItems[0]
}

export function AppShellLayout() {
  const location = useLocation()
  const activeSection = getActiveSection(location.pathname)

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
          <div className="app-topbar__meta">
            <StatusBadge label="Foundation phase" tone="info" />
            <StatusBadge label="No auth guard yet" tone="warning" />
          </div>
        </header>

        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
