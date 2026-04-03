export type CategoryAccent = 'blue' | 'green' | 'amber' | 'slate'

export interface Category {
  id: string
  name: string
  productCount: number
  updatedLabel: string
  accent: CategoryAccent
}

export interface CreateCategoryPayload {
  name: string
}

export interface CategoriesListParams {
  search?: string
}

export interface CategoriesListResponse {
  items: Category[]
  total: number
}
