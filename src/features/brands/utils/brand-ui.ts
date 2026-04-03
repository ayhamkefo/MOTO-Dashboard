import type { Brand, BrandAccent } from '../models/brand.types'

const ACCENTS: BrandAccent[] = ['blue', 'green', 'amber', 'slate']

export async function readBrandLogoPreview(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Could not read the selected file.'))
    }

    reader.onerror = () => {
      reject(new Error('Could not read the selected file.'))
    }

    reader.readAsDataURL(file)
  })
}

export function getBrandInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getBrandAccent(name: string) {
  const sum = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0)

  return ACCENTS[sum % ACCENTS.length]
}

export function buildLocalBrand({
  logoUrl,
  name,
}: {
  name: string
  logoUrl?: string
}): Brand {
  return {
    id: `local-brand-${crypto.randomUUID()}`,
    name,
    productCount: 0,
    logoUrl,
    logoAlt: logoUrl ? `${name} logo` : undefined,
    updatedLabel: 'Created just now',
    accent: getBrandAccent(name),
  }
}
