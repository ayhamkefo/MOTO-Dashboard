import type { CSSProperties } from 'react'

import { Card } from '../../../shared/components/card'
import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { Brand } from '../models/brand.types'
import { BrandListItem } from './brand-list-item'

const toolbarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '1rem',
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}

interface BrandsListProps {
  brands: Brand[]
  brandsCountLabel: string
}

export function BrandsList({ brands, brandsCountLabel }: BrandsListProps) {
  return (
    <Card title="Brands">
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <StatusBadge label={brandsCountLabel} tone="info" />
        </div>
      </div>

      {brands.length > 0 ? (
        <div style={listStyle}>
          {brands.map((brand) => (
            <BrandListItem brand={brand} key={brand.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No brands yet"
          message="Create your first brand to start organizing suppliers."
        />
      )}
    </Card>
  )
}
