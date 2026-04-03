import { FeaturePlaceholder } from '../../../shared/components/feature-placeholder'

export function EmployeesPage() {
  return (
    <FeaturePlaceholder
      title="Employees"
      description="This route will cover employee records, roles, and admin-side user management."
      note="Global client state has intentionally been deferred; local UI state should stay local unless a true cross-screen need emerges."
    />
  )
}
