import type { CSSProperties } from 'react'

import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import { TableContainer } from '../../../shared/components/table-container'
import type { FeedbackItem } from '../models/feedback.types'
import {
  FEEDBACK_TYPE_OPTIONS,
  getFeedbackStatusTone,
} from '../utils/feedback-ui'
import { FeedbackListItem } from './feedback-list-item'
import { FeedbackTypeBadge } from './feedback-type-badge'

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  flexWrap: 'wrap',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
}

const actionGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
}

const typesWrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
}

const typesLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.8125rem',
  fontWeight: 600,
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
          <div style={actionGroupStyle}>
            <StatusBadge label={filteredCountLabel} tone="info" />
            <StatusBadge label={unreadCountLabel} tone={getFeedbackStatusTone('new')} />
            {hasActiveFilters ? <StatusBadge label={totalCountLabel} /> : null}
          </div>

          <div style={typesWrapStyle}>
            <span style={typesLabelStyle}>Types</span>
            {FEEDBACK_TYPE_OPTIONS.filter(
              (option): option is { value: FeedbackItem['type']; label: string } =>
                option.value !== 'all',
            ).map((option) => (
              <FeedbackTypeBadge key={option.value} type={option.value} />
            ))}
          </div>
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
