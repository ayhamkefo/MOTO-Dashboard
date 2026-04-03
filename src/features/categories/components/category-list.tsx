import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { Category } from '../models/category.types'
import { CategoryListItem } from './category-list-item'

interface CategoryListProps {
  categories: Category[]
  categoriesCountLabel: string
}

export function CategoryList({
  categories,
  categoriesCountLabel,
}: CategoryListProps) {
  return (
    <Card
      className="categories-list-card"
      title="All categories"
      description="A clean management surface for current taxonomy entries. Edit and delete controls are rendered now so real row actions can attach later without changing the layout."
    >
      <div className="categories-list-card__toolbar">
        <div className="categories-list-card__summary">
          <StatusBadge label={categoriesCountLabel} tone="info" />
          <p className="categories-list-card__summary-copy">
            Keep category naming stable to support filters, imports, and future product
            assignment flows.
          </p>
        </div>

        <Button disabled variant="secondary">
          Bulk actions later
        </Button>
      </div>

      {categories.length > 0 ? (
        <div className="categories-list">
          {categories.map((category) => (
            <CategoryListItem category={category} key={category.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories yet"
          message="Create the first category above to start shaping the product catalog structure."
        />
      )}
    </Card>
  )
}
