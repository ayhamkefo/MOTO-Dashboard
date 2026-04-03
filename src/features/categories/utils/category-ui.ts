import type { Category, CategoryAccent } from '../models/category.types'

const ACCENTS: CategoryAccent[] = ['blue', 'green', 'amber', 'slate']

export function getCategoryInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getCategoryAccent(name: string) {
  const sum = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0)

  return ACCENTS[sum % ACCENTS.length]
}

export function buildLocalCategory(name: string): Category {
  return {
    id: `local-category-${crypto.randomUUID()}`,
    name,
    productCount: 0,
    updatedLabel: 'Created just now',
    accent: getCategoryAccent(name),
  }
}
