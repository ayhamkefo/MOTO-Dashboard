import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import { TableContainer } from '../../../shared/components/table-container'
import type { Product } from '../models/product.types'
import { ProductListItem } from './product-list-item'

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
}

interface ProductsListProps {
  products: Product[]
  filteredCountLabel: string
  totalCountLabel: string
  hasActiveFilters: boolean
}

export function ProductsList({
  filteredCountLabel,
  hasActiveFilters,
  products,
  totalCountLabel,
}: ProductsListProps) {
  return (
    <TableContainer
      actions={
        <div style={actionsStyle}>
          <StatusBadge label={filteredCountLabel} tone="info" />
          {hasActiveFilters ? <StatusBadge label={totalCountLabel} /> : null}
        </div>
      }
      title="Product catalog"
    >
      {products.length > 0 ? (
        <div style={listStyle}>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <Link className="ui-button ui-button--secondary" to="/products/new">
              Add product
            </Link>
          }
          message="Try widening the search or clearing filters to bring more products back into view."
          title="No products match these filters"
        />
      )}
    </TableContainer>
  )
}
