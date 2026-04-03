import { Link } from 'react-router-dom'

import { Card } from '../../../shared/components/card'
import { PageContainer } from '../../../shared/components/page-container'
import { StatusBadge } from '../../../shared/components/status-badge'
import { ProductsFiltersBar } from '../components/products-filters-bar'
import { ProductsList } from '../components/products-list'
import { useProductsPage } from '../hooks/use-products-page'

export function ProductsPage() {
  const {
    activeOnly,
    brandId,
    brandOptions,
    filteredProducts,
    filteredCountLabel,
    hasActiveFilters,
    searchValue,
    stats,
    totalCountLabel,
    resetFilters,
    setActiveOnly,
    setBrandId,
    setSearchValue,
  } = useProductsPage()

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link className="ui-button ui-button--primary" to="/products/new">
          Add product
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))',
          gap: '1rem',
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="metric-card__label">{stat.label}</p>
            <div className="metric-card__value-row">
              <strong className="metric-card__value" style={{ fontSize: '2rem' }}>
                {stat.value}
              </strong>
              <StatusBadge label="Live view" tone={stat.tone} />
            </div>
          </Card>
        ))}
      </div>

      <ProductsFiltersBar
        activeOnly={activeOnly}
        brandId={brandId}
        brandOptions={brandOptions}
        hasActiveFilters={hasActiveFilters}
        onActiveOnlyChange={setActiveOnly}
        onBrandChange={setBrandId}
        onReset={resetFilters}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />

      <ProductsList
        filteredCountLabel={filteredCountLabel}
        hasActiveFilters={hasActiveFilters}
        products={filteredProducts}
        totalCountLabel={totalCountLabel}
      />
    </PageContainer>
  )
}
