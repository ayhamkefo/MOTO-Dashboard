export type ProductAccent = 'blue' | 'green' | 'amber' | 'slate'

export interface ProductReference {
  id: string
  name: string
}

export interface Product {
  id: string
  sku: string
  name: string
  description: string
  brand: ProductReference
  category: ProductReference
  price: number
  quantity: number
  isActive: boolean
  colors: string[]
  keyFeatures: string[]
  updatedLabel: string
  accent: ProductAccent
}

export interface ProductSelectOption {
  value: string
  label: string
}

export interface ProductsListParams {
  search?: string
  brandId?: string
  categoryId?: string
  activeOnly?: boolean
}

export interface ProductsListResponse {
  items: Product[]
  total: number
}

export interface ProductDetailResponse {
  item: Product
}

export interface ProductMediaDraft {
  id: string
  kind: 'image'
  slot: 'primary' | 'gallery' | 'packaging'
  alt?: string
  url?: string
}

export interface CreateProductPayload {
  name: string
  description: string
  brandId: string
  categoryId: string
  price: number
  quantity: number
  colors: string[]
  keyFeatures: string[]
  media: ProductMediaDraft[]
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string
}

export interface ProductDraftPreview {
  name: string
  brandLabel: string
  categoryLabel: string
  priceLabel: string
  quantityLabel: string
  colors: string[]
  keyFeatures: string[]
  statusLabel: string
  statusTone: 'info' | 'success'
}
