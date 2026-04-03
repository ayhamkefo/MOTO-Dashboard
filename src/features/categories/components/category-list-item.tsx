import type { CSSProperties } from 'react'

import type { Category } from '../models/category.types'
import { getCategoryInitials } from '../utils/category-ui'

const itemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  padding: '0.875rem 1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.88)',
}

const identityStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
  minWidth: 0,
}

const avatarStyle: CSSProperties = {
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0.875rem',
  display: 'grid',
  placeItems: 'center',
  fontSize: '0.8125rem',
  fontWeight: 700,
  flexShrink: 0,
}

const metaStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 0.75rem',
  marginTop: '0.25rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

const actionGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexShrink: 0,
}

const actionButtonStyle: CSSProperties = {
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '999px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-elevated)',
  color: 'var(--color-text)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const accentStyles = {
  blue: {
    background: 'rgba(37, 99, 235, 0.12)',
    color: 'var(--color-info)',
  },
  green: {
    background: 'rgba(28, 143, 95, 0.12)',
    color: 'var(--color-success)',
  },
  amber: {
    background: 'rgba(173, 106, 18, 0.12)',
    color: 'var(--color-warning)',
  },
  slate: {
    background: 'rgba(85, 100, 118, 0.12)',
    color: 'var(--color-text-soft)',
  },
} as const

interface CategoryListItemProps {
  category: Category
}

export function CategoryListItem({ category }: CategoryListItemProps) {
  return (
    <article style={itemStyle}>
      <div style={identityStyle}>
        <div aria-hidden="true" style={{ ...avatarStyle, ...accentStyles[category.accent] }}>
          {getCategoryInitials(category.name)}
        </div>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>{category.name}</h3>
          <div style={metaStyle}>
            <span>{category.productCount} linked products</span>
            <span>{category.updatedLabel}</span>
          </div>
        </div>
      </div>

      <div aria-label={`${category.name} actions`} style={actionGroupStyle}>
        <button aria-label={`Edit ${category.name}`} style={actionButtonStyle} type="button">
          <PencilIcon />
        </button>
        <button aria-label={`Delete ${category.name}`} style={actionButtonStyle} type="button">
          <TrashIcon />
        </button>
      </div>
    </article>
  )
}

function PencilIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M10.667 2.667a1.886 1.886 0 1 1 2.666 2.666L5.111 13.556l-2.667.666.667-2.666 8.222-8.223Z"
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
