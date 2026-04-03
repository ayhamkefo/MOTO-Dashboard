import type { CSSProperties } from 'react'

import { Button } from '../../../shared/components/button'
import type { FeedbackItem } from '../models/feedback.types'
import {
  formatFeedbackDate,
  getFeedbackInitials,
  getFeedbackPreview,
} from '../utils/feedback-ui'
import { FeedbackStatusBadge } from './feedback-status-badge'
import { FeedbackTypeBadge } from './feedback-type-badge'

const itemStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: '1rem',
  padding: '1rem 1.125rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.88)',
}

const bodyStyle: CSSProperties = {
  display: 'grid',
  gap: '0.875rem',
  minWidth: 0,
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
}

const senderBlockStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.875rem',
  minWidth: 0,
}

const avatarStyle: CSSProperties = {
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '0.95rem',
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(37, 99, 235, 0.1)',
  color: 'var(--color-info)',
  fontSize: '0.8125rem',
  fontWeight: 700,
  flexShrink: 0,
}

const senderMetaStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 0.75rem',
  marginTop: '0.35rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

const badgeRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
}

const messageStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  lineHeight: 1.65,
}

const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
}

const footerMetaStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem 1rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
}

interface FeedbackListItemProps {
  item: FeedbackItem
  onMarkAsRead: (feedbackId: string) => void
  onArchive: (feedbackId: string) => void
  onDelete: (feedbackId: string) => void
}

export function FeedbackListItem({
  item,
  onArchive,
  onDelete,
  onMarkAsRead,
}: FeedbackListItemProps) {
  const canMarkAsRead = item.status === 'new'
  const canArchive = item.status !== 'archived'

  return (
    <article style={itemStyle}>
      <div style={bodyStyle}>
        <div style={topRowStyle}>
          <div style={senderBlockStyle}>
            <div aria-hidden="true" style={avatarStyle}>
              {getFeedbackInitials(item.sender.name)}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={badgeRowStyle}>
                <h3 style={{ fontSize: '1rem', lineHeight: 1.2 }}>{item.sender.name}</h3>
                <FeedbackTypeBadge type={item.type} />
                <FeedbackStatusBadge status={item.status} />
              </div>
              <div style={senderMetaStyle}>
                <span>{item.sender.role}</span>
                <span>{item.sender.branch}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.375rem' }}>
          <h4 style={{ fontSize: '0.95rem', lineHeight: 1.35 }}>{item.subject}</h4>
          <p style={messageStyle}>{getFeedbackPreview(item.message)}</p>
        </div>

        <div style={footerStyle}>
          <div style={footerMetaStyle}>
            <span>{item.source}</span>
            <span>{formatFeedbackDate(item.createdAt)}</span>
          </div>

          <div aria-label={`${item.sender.name} actions`} style={actionsStyle}>
            <Button disabled={!canMarkAsRead} onClick={() => onMarkAsRead(item.id)} variant="ghost">
              Mark as read
            </Button>
            <Button disabled={!canArchive} onClick={() => onArchive(item.id)} variant="ghost">
              Archive
            </Button>
            <Button onClick={() => onDelete(item.id)} variant="secondary">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
