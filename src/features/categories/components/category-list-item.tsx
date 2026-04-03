import type { Category } from '../models/category.types'
import { getCategoryInitials } from '../utils/category-ui'

interface CategoryListItemProps {
  category: Category
}

export function CategoryListItem({ category }: CategoryListItemProps) {
  return (
    <article className="category-list-item">
      <div className="category-list-item__identity">
        <div
          aria-hidden="true"
          className={`category-list-item__avatar category-list-item__avatar--${category.accent}`}
        >
          {getCategoryInitials(category.name)}
        </div>

        <div className="category-list-item__copy">
          <h3 className="category-list-item__name">{category.name}</h3>
          <div className="category-list-item__meta">
            <span>{category.productCount} linked products</span>
            <span>{category.updatedLabel}</span>
          </div>
        </div>
      </div>

      <div className="category-list-item__actions" aria-label={`${category.name} actions`}>
        <button className="category-list-item__action" type="button">
          Edit
        </button>
        <button className="category-list-item__action" type="button">
          Delete
        </button>
      </div>
    </article>
  )
}
