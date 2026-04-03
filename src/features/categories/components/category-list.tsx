import type { CSSProperties } from 'react'

import { Card } from '../../../shared/components/card'
import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { Category } from '../models/category.types'
import { CategoryListItem } from './category-list-item'

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

interface CategoryListProps {
  categories: Category[]
  categoriesCountLabel: string
}

export function CategoryList({
  categories,
  categoriesCountLabel,
}: CategoryListProps) {
  return (
    <Card title="Categories">
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <StatusBadge label={categoriesCountLabel} tone="info" />
        </div>
      </div>

      {categories.length > 0 ? (
        <div style={listStyle}>
          {categories.map((category) => (
            <CategoryListItem category={category} key={category.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories yet"
          message="Create your first category to start organizing products."
        />
      )}
    </Card>
  )
}
