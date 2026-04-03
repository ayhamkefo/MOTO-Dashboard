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
  display: 'block',
  padding: '1rem 1.125rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.88)',
}

const bodyStyle: CSSProperties = {
  display: 'grid',
  gap: '0.8rem',
  minWidth: 0,
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.875rem',
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
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

const badgeRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
}

const badgeLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.8125rem',
  fontWeight: 600,
}

const subjectBlockStyle: CSSProperties = {
  display: 'grid',
  gap: '0.375rem',
}

const subjectStyle: CSSProperties = {
  fontSize: '0.975rem',
  lineHeight: 1.35,
}

const messageStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  fontSize: '0.9375rem',
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

const actionButtonStyle: CSSProperties = {
  minHeight: '2.4rem',
  paddingInline: '0.95rem',
}

const actionButtonVariants = {
  read: {
    color: 'var(--color-info)',
    borderColor: 'rgba(37, 99, 235, 0.2)',
    background: 'rgba(37, 99, 235, 0.08)',
  },
  archive: {
    color: 'var(--color-warning)',
    borderColor: 'rgba(173, 106, 18, 0.24)',
    background: 'rgba(173, 106, 18, 0.08)',
  },
  delete: {
    color: 'var(--color-danger)',
    borderColor: 'rgba(196, 69, 54, 0.24)',
    background: 'rgba(196, 69, 54, 0.08)',
  },
} as const

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
          <div aria-hidden="true" style={avatarStyle}>
            {getFeedbackInitials(item.sender.name)}
          </div>

          <div style={{ minWidth: 0, display: 'grid', gap: '0.45rem' }}>
            <h3 style={{ fontSize: '1rem', lineHeight: 1.2 }}>{item.sender.name}</h3>

            <div style={senderMetaStyle}>
              <span>{item.sender.role}</span>
              <span>{item.sender.branch}</span>
              <span>{item.source}</span>
            </div>
          </div>
        </div>

        <div style={badgeRowStyle}>
          <span style={badgeLabelStyle}>Type</span>
          <FeedbackTypeBadge type={item.type} />
          <span style={badgeLabelStyle}>Status</span>
          <FeedbackStatusBadge status={item.status} />
        </div>

        <div style={subjectBlockStyle}>
          <h4 style={subjectStyle}>{item.subject}</h4>
          <p style={messageStyle}>{getFeedbackPreview(item.message)}</p>
        </div>

        <div style={footerStyle}>
          <div style={footerMetaStyle}>
            <span>{formatFeedbackDate(item.createdAt)}</span>
            <span>{item.source}</span>
          </div>

          <div aria-label={`${item.sender.name} actions`} style={actionsStyle}>
            <Button
              disabled={!canMarkAsRead}
              onClick={() => onMarkAsRead(item.id)}
              style={{ ...actionButtonStyle, ...actionButtonVariants.read }}
              variant="ghost"
            >
              <CheckIcon />
              Mark as read
            </Button>
            <Button
              disabled={!canArchive}
              onClick={() => onArchive(item.id)}
              style={{ ...actionButtonStyle, ...actionButtonVariants.archive }}
              variant="ghost"
            >
              <ArchiveIcon />
              Archive
            </Button>
            <Button
              onClick={() => onDelete(item.id)}
              style={{ ...actionButtonStyle, ...actionButtonVariants.delete }}
              variant="secondary"
            >
              <TrashIcon />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="m3.333 8.222 2.89 2.89 6.444-6.445"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M2.667 4.222h10.666v2.111H2.667zm.889 2.111h8.888v6A1.11 1.11 0 0 1 11.333 13.444H4.667a1.11 1.11 0 0 1-1.111-1.111zM6.222 8h3.556"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M2.667 4h10.666M6.667 7v4M9.333 7v4M4.667 4l.4 8.267A1.333 1.333 0 0 0 6.4 13.556h3.2a1.333 1.333 0 0 0 1.333-1.289L11.333 4M6 4V2.889c0-.245.2-.445.444-.445h3.112c.245 0 .444.2.444.445V4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}
