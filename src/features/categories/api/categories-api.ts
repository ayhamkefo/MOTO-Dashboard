import type {
  CategoriesListParams,
  CategoriesListResponse,
  Category,
  CreateCategoryPayload,
} from '../models/category.types'

export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  list: (params: CategoriesListParams = {}) => [...categoriesKeys.lists(), params] as const,
}

export const CATEGORIES_API_NOT_READY_MESSAGE =
  'Categories endpoints are not connected yet. Replace the local page state with feature query and mutation hooks when the backend contract is confirmed.'

export async function getCategories(
  _params: CategoriesListParams = {},
): Promise<CategoriesListResponse> {
  throw new Error(CATEGORIES_API_NOT_READY_MESSAGE)
}

export async function createCategory(
  _payload: CreateCategoryPayload,
): Promise<Category> {
  throw new Error(CATEGORIES_API_NOT_READY_MESSAGE)
}

export async function updateCategory(
  _categoryId: string,
  _payload: CreateCategoryPayload,
): Promise<Category> {
  throw new Error(CATEGORIES_API_NOT_READY_MESSAGE)
}

export async function deleteCategory(_categoryId: string): Promise<void> {
  throw new Error(CATEGORIES_API_NOT_READY_MESSAGE)
}
