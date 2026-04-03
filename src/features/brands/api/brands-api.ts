import type {
  Brand,
  BrandsListParams,
  BrandsListResponse,
  CreateBrandPayload,
  UpdateBrandPayload,
} from '../models/brand.types'

export const brandsKeys = {
  all: ['brands'] as const,
  lists: () => [...brandsKeys.all, 'list'] as const,
  list: (params: BrandsListParams = {}) => [...brandsKeys.lists(), params] as const,
  details: () => [...brandsKeys.all, 'detail'] as const,
  detail: (brandId: string) => [...brandsKeys.details(), brandId] as const,
}

export const BRANDS_API_NOT_READY_MESSAGE =
  'Brands endpoints are not connected yet. Replace the local page state with feature query and mutation hooks when the backend contract and upload flow are confirmed.'

export async function getBrands(_params: BrandsListParams = {}): Promise<BrandsListResponse> {
  throw new Error(BRANDS_API_NOT_READY_MESSAGE)
}

export async function createBrand(_payload: CreateBrandPayload): Promise<Brand> {
  throw new Error(BRANDS_API_NOT_READY_MESSAGE)
}

export async function updateBrand(
  _brandId: string,
  _payload: UpdateBrandPayload,
): Promise<Brand> {
  throw new Error(BRANDS_API_NOT_READY_MESSAGE)
}

export async function deleteBrand(_brandId: string): Promise<void> {
  throw new Error(BRANDS_API_NOT_READY_MESSAGE)
}

export async function uploadBrandLogo(_file: File): Promise<{ assetId: string; url: string }> {
  throw new Error(BRANDS_API_NOT_READY_MESSAGE)
}
