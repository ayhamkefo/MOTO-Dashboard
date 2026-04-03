import type { Brand } from '../models/brand.types'
import { getBrandInitials } from '../utils/brand-ui'

interface BrandListItemProps {
  brand: Brand
}

export function BrandListItem({ brand }: BrandListItemProps) {
  return (
    <article className="brand-list-item">
      <div className="brand-list-item__identity">
        <div className="brand-list-item__logo-shell">
          {brand.logoUrl ? (
            <img
              alt={brand.logoAlt ?? `${brand.name} logo`}
              className="brand-list-item__logo-image"
              src={brand.logoUrl}
            />
          ) : (
            <div
              aria-hidden="true"
              className={`brand-list-item__logo-fallback brand-list-item__logo-fallback--${brand.accent}`}
            >
              {getBrandInitials(brand.name)}
            </div>
          )}
        </div>

        <div className="brand-list-item__copy">
          <h3 className="brand-list-item__name">{brand.name}</h3>
          <div className="brand-list-item__meta">
            <span>{brand.productCount} linked products</span>
            <span>{brand.updatedLabel}</span>
          </div>
        </div>
      </div>

      <div className="brand-list-item__actions" aria-label={`${brand.name} actions`}>
        <button className="brand-list-item__action" type="button">
          Edit
        </button>
        <button className="brand-list-item__action" type="button">
          Delete
        </button>
      </div>
    </article>
  )
}
