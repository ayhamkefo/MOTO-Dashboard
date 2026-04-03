import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShellLayout } from '../layouts/app-shell-layout'
import { AuthLayout } from '../layouts/auth-layout'
import { ProtectedRoute } from '../../features/auth/components/protected-route'
import { PublicRoute } from '../../features/auth/components/public-route'
import { LoginPage } from '../../features/auth/pages/login-page'
import { DashboardPage } from '../../features/dashboard/pages/dashboard-page'
import { CategoriesPage } from '../../features/categories/pages/categories-page'
import { BrandsPage } from '../../features/brands/pages/brands-page'
import { CreateProductPage } from '../../features/products/pages/create-product-page'
import { ProductsPage } from '../../features/products/pages/products-page'
import { EmployeesPage } from '../../features/employees/pages/employees-page'
import { FeedbackPage } from '../../features/feedback/pages/feedback-page'

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <AuthLayout />,
        children: [{ index: true, element: <LoginPage /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppShellLayout />,
        children: [
          { index: true, element: <Navigate replace to="/dashboard" /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'categories', element: <CategoriesPage /> },
          { path: 'brands', element: <BrandsPage /> },
          { path: 'products', element: <ProductsPage /> },
          { path: 'products/new', element: <CreateProductPage /> },
          { path: 'employees', element: <EmployeesPage /> },
          { path: 'feedback', element: <FeedbackPage /> },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
