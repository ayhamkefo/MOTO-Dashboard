import type { CSSProperties } from 'react'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { ProductSelectOption } from '../models/product.types'

const toolbarStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(16rem, 1.4fr) minmax(12rem, 0.7fr) auto auto',
  gap: '1rem',
  alignItems: 'end',
}

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}

const labelStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
}

const toggleStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.75rem',
  minHeight: '3rem',
  padding: '0 1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'var(--color-bg-elevated)',
  whiteSpace: 'nowrap',
}

const helperStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  fontSize: '0.875rem',
}

interface ProductsFiltersBarProps {
  activeOnly: boolean
  brandId: string
  brandOptions: ProductSelectOption[]
  hasActiveFilters: boolean
  onActiveOnlyChange: (value: boolean) => void
  onBrandChange: (value: string) => void
  onReset: () => void
  onSearchChange: (value: string) => void
  searchValue: string
}

export function ProductsFiltersBar({
  activeOnly,
  brandId,
  brandOptions,
  hasActiveFilters,
  onActiveOnlyChange,
  onBrandChange,
  onReset,
  onSearchChange,
  searchValue,
}: ProductsFiltersBarProps) {
  return (
    <Card
      title="Filters"
    >
      <div style={toolbarStyle}>
        <Input
          autoComplete="off"
          id="products-search"
          label="Search products"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by product, brand, category, or SKU"
          value={searchValue}
        />

        <label htmlFor="products-brand-filter" style={fieldStyle}>
          <span style={labelStyle}>Brand</span>
          <select
            className="ui-input"
            id="products-brand-filter"
            onChange={(event) => onBrandChange(event.target.value)}
            value={brandId}
          >
            <option value="">All brands</option>
            {brandOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label style={fieldStyle}>
          <span style={labelStyle}>Availability</span>
          <span style={toggleStyle}>
            <input
              checked={activeOnly}
              onChange={(event) => onActiveOnlyChange(event.target.checked)}
              type="checkbox"
            />
            Active only
          </span>
        </label>

        <div style={{ display: 'grid', gap: '0.5rem', justifyItems: 'start' }}>
          <span style={helperStyle}>Quick actions</span>
          <Button disabled={!hasActiveFilters} onClick={onReset} type="button" variant="ghost">
            Clear filters
          </Button>
        </div>
      </div>
    </Card>
  )
}
