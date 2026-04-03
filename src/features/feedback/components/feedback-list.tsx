import type { CSSProperties } from 'react'

import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import { TableContainer } from '../../../shared/components/table-container'
import type { FeedbackItem } from '../models/feedback.types'
import { FeedbackListItem } from './feedback-list-item'

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
}

interface FeedbackListProps {
  items: FeedbackItem[]
  filteredCountLabel: string
  totalCountLabel: string
  unreadCountLabel: string
  hasActiveFilters: boolean
  onMarkAsRead: (feedbackId: string) => void
  onArchive: (feedbackId: string) => void
  onDelete: (feedbackId: string) => void
}

export function FeedbackList({
  filteredCountLabel,
  hasActiveFilters,
  items,
  onArchive,
  onDelete,
  onMarkAsRead,
  totalCountLabel,
  unreadCountLabel,
}: FeedbackListProps) {
  return (
    <TableContainer
      title="Feedback inbox"
      actions={
        <div style={actionsStyle}>
          <StatusBadge label={filteredCountLabel} tone="info" />
          <StatusBadge label={unreadCountLabel} />
          {hasActiveFilters ? <StatusBadge label={totalCountLabel} /> : null}
        </div>
      }
    >
      {items.length > 0 ? (
        <div style={listStyle}>
          {items.map((item) => (
            <FeedbackListItem
              item={item}
              key={item.id}
              onArchive={onArchive}
              onDelete={onDelete}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No feedback matches these filters"
          message="Try widening the search or clearing one of the current filters to bring submissions back into view."
        />
      )}
    </TableContainer>
  )
}
