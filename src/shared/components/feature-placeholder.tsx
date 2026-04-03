import { Button } from './button'
import { Card } from './card'
import { EmptyState } from './empty-state'
import { PageContainer } from './page-container'
import { PageHeader } from './page-header'
import { StatusBadge } from './status-badge'
import { TableContainer } from './table-container'

interface FeaturePlaceholderProps {
  title: string
  description: string
  note: string
}

export function FeaturePlaceholder({
  description,
  note,
  title,
}: FeaturePlaceholderProps) {
  return (
    <PageContainer>
      <PageHeader
        title={title}
        description={description}
        actions={<Button variant="secondary">Future actions</Button>}
      />

      <div className="dashboard-grid">
        <Card title="Module status" description="Foundation only for this phase.">
          <div className="placeholder-meta">
            <StatusBadge label="Placeholder page" tone="info" />
            <StatusBadge label="Ready for feature hooks" />
          </div>
          <p className="card-copy">{note}</p>
        </Card>

        <Card
          title="Implementation boundary"
          description="Business CRUD stays out of the foundation pass."
        >
          <p className="card-copy">
            Shared layout, API access, and UI primitives are ready. Feature API files,
            query hooks, and forms can be added in the next phase without reshaping the
            app shell.
          </p>
        </Card>
      </div>

      <TableContainer
        title={`${title} workspace`}
        description="Use this block for tables, filters, and empty/loading/error states later."
        actions={<StatusBadge label="Scaffolded" tone="success" />}
      >
        <EmptyState
          title={`No ${title.toLowerCase()} content yet`}
          message="This placeholder confirms the route, shell, and shared table area are wired correctly for future implementation."
          action={<Button>Start building this module</Button>}
        />
      </TableContainer>
    </PageContainer>
  )
}
