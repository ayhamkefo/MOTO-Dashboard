import type { CreateProductFormValues } from '../models/create-product.schema'
import type {
  CreateProductPayload,
  Product,
  ProductDraftPreview,
  ProductSelectOption,
} from '../models/product.types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const PRODUCT_BRAND_OPTIONS: ProductSelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'xiaomi', label: 'Xiaomi' },
  { value: 'nothing', label: 'Nothing' },
]

export const PRODUCT_CATEGORY_OPTIONS: ProductSelectOption[] = [
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'tablets', label: 'Tablets' },
  { value: 'accessories', label: 'Accessories' },
]

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'product-iphone-15-pro-max',
    sku: 'APL-IP15PM-256',
    name: 'iPhone 15 Pro Max',
    description: 'Premium flagship with titanium build, A17 Pro, and a versatile triple camera system.',
    brand: { id: 'apple', name: 'Apple' },
    category: { id: 'smartphones', name: 'Smartphones' },
    price: 1299,
    quantity: 18,
    isActive: true,
    colors: ['Natural Titanium', 'Black Titanium'],
    keyFeatures: ['A17 Pro', '5x telephoto camera', 'USB-C'],
    updatedLabel: 'Updated 45 minutes ago',
    accent: 'blue',
  },
  {
    id: 'product-galaxy-s24-ultra',
    sku: 'SMS-S24U-256',
    name: 'Galaxy S24 Ultra',
    description: 'Large-screen flagship with S Pen support, AI-assisted search, and all-day battery.',
    brand: { id: 'samsung', name: 'Samsung' },
    category: { id: 'smartphones', name: 'Smartphones' },
    price: 1249,
    quantity: 9,
    isActive: true,
    colors: ['Titanium Gray', 'Titanium Violet'],
    keyFeatures: ['S Pen', '200MP camera', 'Adaptive display'],
    updatedLabel: 'Updated today',
    accent: 'green',
  },
  {
    id: 'product-redmi-note-13-pro',
    sku: 'XMI-RN13P-256',
    name: 'Redmi Note 13 Pro',
    description: 'Value-focused Android device with a high refresh display and dependable daily performance.',
    brand: { id: 'xiaomi', name: 'Xiaomi' },
    category: { id: 'smartphones', name: 'Smartphones' },
    price: 399,
    quantity: 34,
    isActive: true,
    colors: ['Midnight Black', 'Aurora Purple'],
    keyFeatures: ['120Hz AMOLED', '67W charging', '200MP main camera'],
    updatedLabel: 'Updated yesterday',
    accent: 'amber',
  },
  {
    id: 'product-nothing-phone-2a',
    sku: 'NTH-P2A-128',
    name: 'Nothing Phone (2a)',
    description: 'Distinctive mid-range phone with a clean interface and standout industrial design.',
    brand: { id: 'nothing', name: 'Nothing' },
    category: { id: 'smartphones', name: 'Smartphones' },
    price: 379,
    quantity: 5,
    isActive: false,
    colors: ['Milk', 'Black'],
    keyFeatures: ['Glyph interface', 'Dimensity 7200 Pro', '50MP dual camera'],
    updatedLabel: 'Updated 2 days ago',
    accent: 'slate',
  },
  {
    id: 'product-ipad-air-m2',
    sku: 'APL-IPAIR-M2',
    name: 'iPad Air M2',
    description: 'Thin and lightweight tablet with Apple Pencil support and laptop-class performance.',
    brand: { id: 'apple', name: 'Apple' },
    category: { id: 'tablets', name: 'Tablets' },
    price: 699,
    quantity: 11,
    isActive: true,
    colors: ['Space Gray', 'Blue'],
    keyFeatures: ['M2 chip', 'Apple Pencil Pro support', '11-inch Liquid Retina'],
    updatedLabel: 'Updated this week',
    accent: 'blue',
  },
  {
    id: 'product-galaxy-buds-fe',
    sku: 'SMS-BUDS-FE',
    name: 'Galaxy Buds FE',
    description: 'Everyday wireless earbuds with active noise cancellation and compact charging case.',
    brand: { id: 'samsung', name: 'Samsung' },
    category: { id: 'accessories', name: 'Accessories' },
    price: 109,
    quantity: 42,
    isActive: true,
    colors: ['Graphite', 'White'],
    keyFeatures: ['ANC', 'Compact fit', 'Quick pairing'],
    updatedLabel: 'Updated this week',
    accent: 'green',
  },
]

export function formatProductPrice(value: number) {
  return currencyFormatter.format(value)
}

export function formatProductQuantity(quantity: number) {
  return `${quantity} ${quantity === 1 ? 'unit' : 'units'}`
}

export function getProductInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getInventoryTone(quantity: number): 'warning' | 'success' {
  return quantity <= 5 ? 'warning' : 'success'
}

export function normalizeTagValue(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function mapCreateProductFormToPayload(
  values: CreateProductFormValues,
): CreateProductPayload {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    brandId: values.brandId,
    categoryId: values.categoryId,
    price: Number(values.price),
    quantity: Number(values.quantity),
    colors: values.colors.map(normalizeTagValue),
    keyFeatures: values.keyFeatures.map(normalizeTagValue),
    media: [
      { id: 'primary-media', kind: 'image', slot: 'primary' },
      { id: 'gallery-media', kind: 'image', slot: 'gallery' },
      { id: 'packaging-media', kind: 'image', slot: 'packaging' },
    ],
  }
}

export function buildProductDraftPreview(
  values: CreateProductFormValues,
  brandOptions: ProductSelectOption[],
  categoryOptions: ProductSelectOption[],
): ProductDraftPreview {
  const brandLabel =
    brandOptions.find((option) => option.value === values.brandId)?.label ?? 'Select brand'
  const categoryLabel =
    categoryOptions.find((option) => option.value === values.categoryId)?.label ?? 'Select category'
  const quantityValue = Number(values.quantity)
  const priceValue = Number(values.price)

  return {
    name: values.name.trim() || 'New product draft',
    brandLabel,
    categoryLabel,
    priceLabel: Number.isFinite(priceValue) && priceValue > 0 ? formatProductPrice(priceValue) : 'Set price',
    quantityLabel:
      Number.isInteger(quantityValue) && quantityValue >= 0
        ? formatProductQuantity(quantityValue)
        : 'Set quantity',
    colors: values.colors,
    keyFeatures: values.keyFeatures,
    statusLabel: values.name.trim() && values.brandId && values.categoryId ? 'Ready to review' : 'Building details',
    statusTone: values.name.trim() && values.brandId && values.categoryId ? 'success' : 'info',
  }
}
