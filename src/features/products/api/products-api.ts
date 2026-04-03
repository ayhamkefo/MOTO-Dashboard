import type {
  CreateProductPayload,
  ProductDetailResponse,
  ProductsListParams,
  ProductsListResponse,
  UpdateProductPayload,
} from '../models/product.types'

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: ProductsListParams = {}) => [...productsKeys.lists(), params] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (productId: string) => [...productsKeys.details(), productId] as const,
}

export async function getProducts(_params: ProductsListParams = {}): Promise<ProductsListResponse> {
  throw new Error('Products API is not connected yet.')
}

export async function getProductById(_productId: string): Promise<ProductDetailResponse> {
  throw new Error('Products API is not connected yet.')
}

export async function createProduct(_payload: CreateProductPayload): Promise<ProductDetailResponse> {
  throw new Error('Products API is not connected yet.')
}

export async function updateProduct(_payload: UpdateProductPayload): Promise<ProductDetailResponse> {
  throw new Error('Products API is not connected yet.')
}

export async function deleteProduct(_productId: string): Promise<void> {
  throw new Error('Products API is not connected yet.')
}
