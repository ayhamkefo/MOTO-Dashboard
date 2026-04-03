import type { CSSProperties } from 'react'

import { StatusBadge } from '../../../shared/components/status-badge'
import type { Product } from '../models/product.types'
import {
  formatProductPrice,
  formatProductQuantity,
  getInventoryTone,
  getProductInitials,
} from '../utils/product-ui'

const itemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
  padding: '1rem 1.125rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.88)',
}

const mainStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: '1 1 22rem',
  minWidth: 0,
}

const thumbnailStyle: CSSProperties = {
  width: '3.75rem',
  height: '3.75rem',
  borderRadius: '1rem',
  display: 'grid',
  placeItems: 'center',
  fontSize: '0.875rem',
  fontWeight: 700,
  flexShrink: 0,
}

const metaStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 0.75rem',
  marginTop: '0.35rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

const statsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'stretch',
  flex: '0 1 auto',
}

const statStyle: CSSProperties = {
  display: 'grid',
  gap: '0.25rem',
  minWidth: '7.5rem',
  padding: '0.625rem 0.875rem',
  borderRadius: '0.875rem',
  background: 'var(--color-bg-muted)',
}

const statLabelStyle: CSSProperties = {
  color: 'var(--color-text-muted)',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginLeft: 'auto',
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

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <article style={itemStyle}>
      <div style={mainStyle}>
        <div aria-hidden="true" style={{ ...thumbnailStyle, ...accentStyles[product.accent] }}>
          {getProductInitials(product.name)}
        </div>

        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '1rem', lineHeight: 1.2 }}>{product.name}</h3>
          <div style={metaStyle}>
            <span>{product.brand.name}</span>
            <span>{product.category.name}</span>
            <span>{product.sku}</span>
            <span>{product.updatedLabel}</span>
          </div>
        </div>
      </div>

      <div style={statsStyle}>
        <div style={statStyle}>
          <span style={statLabelStyle}>Price</span>
          <strong>{formatProductPrice(product.price)}</strong>
        </div>

        <div style={statStyle}>
          <span style={statLabelStyle}>Quantity</span>
          <strong>{formatProductQuantity(product.quantity)}</strong>
        </div>

        <div style={statStyle}>
          <span style={statLabelStyle}>Status</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <StatusBadge
              label={product.isActive ? 'Active' : 'Inactive'}
              tone={product.isActive ? 'success' : 'neutral'}
            />
            <StatusBadge
              label={product.quantity <= 5 ? 'Low stock' : 'In stock'}
              tone={getInventoryTone(product.quantity)}
            />
          </div>
        </div>
      </div>

      <div aria-label={`${product.name} actions`} style={actionsStyle}>
        <button aria-label={`View ${product.name}`} style={actionButtonStyle} type="button">
          <EyeIcon />
        </button>
        <button aria-label={`Edit ${product.name}`} style={actionButtonStyle} type="button">
          <PencilIcon />
        </button>
        <button aria-label={`More actions for ${product.name}`} style={actionButtonStyle} type="button">
          <MoreIcon />
        </button>
      </div>
    </article>
  )
}

function EyeIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M1.667 8s2.424-4 6.333-4c3.91 0 6.333 4 6.333 4S11.91 12 8 12c-3.909 0-6.333-4-6.333-4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8" r="1.778" stroke="currentColor" strokeWidth="1.4" />
    </svg>
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

function MoreIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 16 16" width="16">
      <circle cx="3.333" cy="8" r="1.2" />
      <circle cx="8" cy="8" r="1.2" />
      <circle cx="12.667" cy="8" r="1.2" />
    </svg>
  )
}
