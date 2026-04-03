import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { EmptyState } from '../../../shared/components/empty-state'
import { StatusBadge } from '../../../shared/components/status-badge'
import type { Brand } from '../models/brand.types'
import { BrandListItem } from './brand-list-item'

interface BrandsListProps {
  brands: Brand[]
  brandsCountLabel: string
}

export function BrandsList({ brands, brandsCountLabel }: BrandsListProps) {
  return (
    <Card
      className="brands-list-card"
      title="All brands"
      description="A scalable brand roster with space for future edit, delete, and sync actions. The current rows already reflect the final UI density the CRUD workflow will need."
    >
      <div className="brands-list-card__toolbar">
        <div className="brands-list-card__summary">
          <StatusBadge label={brandsCountLabel} tone="info" />
          <p className="brands-list-card__summary-copy">
            Clean logos and naming make supplier matching, product filters, and storefront presentation easier later.
          </p>
        </div>

        <Button disabled variant="secondary">
          Row actions later
        </Button>
      </div>

      {brands.length > 0 ? (
        <div className="brands-list">
          {brands.map((brand) => (
            <BrandListItem brand={brand} key={brand.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No brands yet"
          message="Create the first brand above to start building the supplier catalog structure."
        />
      )}
    </Card>
  )
}
