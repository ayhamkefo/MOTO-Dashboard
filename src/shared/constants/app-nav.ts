import type { AppRouteMeta } from '../types/app-route-meta'

export const APP_NAME = 'Moto Dashboard'

export const appNavItems: AppRouteMeta[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    description: 'Overview, sync health, and quick operational context.',
  },
  {
    label: 'Categories',
    path: '/categories',
    description: 'Product taxonomy and catalog grouping will live here.',
  },
  {
    label: 'Brands',
    path: '/brands',
    description: 'Brand management, logo staging, and row actions live here.',
  },
  {
    label: 'Products',
    path: '/products',
    description: 'Inventory, pricing, and product workflows will live here.',
  },
  {
    label: 'Employees',
    path: '/employees',
    description: 'Store staff management and account administration.',
  },
  {
    label: 'Feedback',
    path: '/feedback',
    description: 'Employee feedback streams and review workflows.',
  },
]
