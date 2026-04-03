export type BrandAccent = 'blue' | 'green' | 'amber' | 'slate'

export interface Brand {
  id: string
  name: string
  productCount: number
  logoUrl?: string
  logoAlt?: string
  updatedLabel: string
  accent: BrandAccent
}

export interface CreateBrandPayload {
  name: string
  logoAssetId?: string
}

export interface UpdateBrandPayload {
  name?: string
  logoAssetId?: string | null
}

export interface BrandsListParams {
  search?: string
}

export interface BrandsListResponse {
  items: Brand[]
  total: number
}
