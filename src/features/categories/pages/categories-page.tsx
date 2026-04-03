import { FeaturePlaceholder } from '../../../shared/components/feature-placeholder'

export function CategoriesPage() {
  return (
    <FeaturePlaceholder
      title="Categories"
      description="This route is reserved for category CRUD, filters, and taxonomy management."
      note="Keep category endpoint access in feature-level API files and wrap server data with TanStack Query hooks."
    />
  )
}
