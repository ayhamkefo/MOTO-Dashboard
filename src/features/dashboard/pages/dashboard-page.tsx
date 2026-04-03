import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { LoadingState } from '../../../shared/components/loading-state'
import { PageContainer } from '../../../shared/components/page-container'
import { PageHeader } from '../../../shared/components/page-header'
import { StatusBadge } from '../../../shared/components/status-badge'
import { TableContainer } from '../../../shared/components/table-container'

const kpiCards = [
  { title: 'Catalog modules', value: '4', tone: 'info' as const },
  { title: 'Shared primitives', value: '8', tone: 'success' as const },
  { title: 'Pending CRUD flows', value: '6', tone: 'warning' as const },
]

export function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard overview"
        description="The overview page establishes the default content rhythm for cards, badges, and data blocks without introducing live business logic yet."
        actions={<Button variant="secondary">Export later</Button>}
      />

      <div className="dashboard-grid dashboard-grid--compact">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <p className="metric-card__label">{card.title}</p>
            <div className="metric-card__value-row">
              <strong className="metric-card__value">{card.value}</strong>
              <StatusBadge label="Foundation" tone={card.tone} />
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-grid">
        <Card
          title="Shared patterns"
          description="Thin pages, shared shell, centralized API client, and TanStack Query provider are in place."
        >
          <p className="card-copy">
            Future modules can now plug in feature `api/`, `hooks/`, and `components/`
            folders without changing the app-level composition.
          </p>
        </Card>

        <Card
          title="Server-state ready"
          description="Query client defaults are configured, but no business queries are wired in this phase."
        >
          <LoadingState
            title="Future dashboard queries"
            message="Live stats, sync health, and alerts can be connected through feature hooks later."
          />
        </Card>
      </div>

      <TableContainer
        title="Upcoming overview modules"
        description="A shared table area for future dashboard-level summaries and alerts."
        actions={<Button>New widget later</Button>}
      >
        <table className="data-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Status</th>
              <th>Next step</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Routing</td>
              <td>
                <StatusBadge label="Ready" tone="success" />
              </td>
              <td>Attach guards and per-feature lazy loading when needed.</td>
            </tr>
            <tr>
              <td>API integration</td>
              <td>
                <StatusBadge label="Ready" tone="success" />
              </td>
              <td>Introduce feature endpoint files that wrap the shared Axios client.</td>
            </tr>
            <tr>
              <td>Dashboard data</td>
              <td>
                <StatusBadge label="Pending" tone="warning" />
              </td>
              <td>Implement real query hooks once the backend contract is confirmed.</td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </PageContainer>
  )
}
