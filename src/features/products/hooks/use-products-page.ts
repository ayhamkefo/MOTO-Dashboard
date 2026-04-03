import { useMemo, useState } from 'react'

import type { Product } from '../models/product.types'
import { INITIAL_PRODUCTS, PRODUCT_BRAND_OPTIONS } from '../utils/product-ui'

export function useProductsPage() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS)
  const [searchValue, setSearchValue] = useState('')
  const [brandId, setBrandId] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.brand.name, product.category.name, product.sku]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesBrand = brandId.length === 0 || product.brand.id === brandId
      const matchesActive = !activeOnly || product.isActive

      return matchesSearch && matchesBrand && matchesActive
    })
  }, [activeOnly, brandId, products, searchValue])

  const stats = useMemo(() => {
    const activeProducts = products.filter((product) => product.isActive).length
    const lowStockProducts = products.filter((product) => product.quantity <= 5).length
    const totalUnits = products.reduce((sum, product) => sum + product.quantity, 0)

    return [
      { label: 'Catalog products', value: `${products.length}`, tone: 'info' as const },
      { label: 'Active listings', value: `${activeProducts}`, tone: 'success' as const },
      { label: 'Units in stock', value: `${totalUnits}`, tone: 'warning' as const },
      { label: 'Low stock items', value: `${lowStockProducts}`, tone: 'warning' as const },
    ]
  }, [products])

  const filteredCountLabel = useMemo(() => {
    const count = filteredProducts.length
    return `${count} ${count === 1 ? 'product' : 'products'}`
  }, [filteredProducts.length])

  const totalCountLabel = useMemo(() => {
    const count = products.length
    return `${count} total ${count === 1 ? 'product' : 'products'}`
  }, [products.length])

  const hasActiveFilters = searchValue.trim().length > 0 || brandId.length > 0 || activeOnly

  return {
    brandId,
    brandOptions: PRODUCT_BRAND_OPTIONS,
    filteredProducts,
    filteredCountLabel,
    hasActiveFilters,
    activeOnly,
    searchValue,
    stats,
    totalCountLabel,
    setActiveOnly,
    setBrandId,
    setSearchValue,
    resetFilters: () => {
      setSearchValue('')
      setBrandId('')
      setActiveOnly(false)
    },
  }
}
