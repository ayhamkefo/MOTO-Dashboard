import { Card } from '../../../shared/components/card'
import { PageContainer } from '../../../shared/components/page-container'
import { PageHeader } from '../../../shared/components/page-header'
import { StatusBadge } from '../../../shared/components/status-badge'
import { CategoryList } from '../components/category-list'
import { CreateCategoryForm } from '../components/create-category-form'
import { useCategoriesPage } from '../hooks/use-categories-page'

export function CategoriesPage() {
  const {
    categories,
    categoriesCount,
    categoriesCountLabel,
    form,
    handleCreateCategory,
    integrationStatusMessage,
    isSubmitting,
    submitMessage,
  } = useCategoriesPage()

  return (
    <PageContainer>
      <PageHeader
        title="Categories"
        description="Manage the store taxonomy from a calm, UI-first admin surface. This page is production-shaped from a layout perspective and intentionally keeps backend integration behind feature boundaries."
        actions={
          <>
            <StatusBadge label={`${categoriesCount} total`} tone="info" />
            <StatusBadge label="Backend pending" tone="warning" />
          </>
        }
      />

      <div className="categories-page__top-grid">
        <CreateCategoryForm
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateCategory}
          submitMessage={submitMessage}
        />

        <Card
          title="Integration readiness"
          description="The page already has the same composition boundaries a real CRUD module will need."
        >
          <div className="categories-readiness">
            <div className="categories-readiness__item">
              <p className="categories-readiness__label">Current data mode</p>
              <strong className="categories-readiness__value">Local page state</strong>
              <p className="card-copy">
                The list stays interactive without pretending the backend contract is
                complete.
              </p>
            </div>

            <div className="categories-readiness__item">
              <p className="categories-readiness__label">Future API slot</p>
              <strong className="categories-readiness__value">Feature `api/` + hook layer</strong>
              <p className="card-copy">{integrationStatusMessage}</p>
            </div>

            <div className="categories-readiness__item">
              <p className="categories-readiness__label">Prepared next steps</p>
              <p className="card-copy">
                List queries, create mutations, and row actions can plug in without
                rewriting the page or form structure.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <CategoryList categories={categories} categoriesCountLabel={categoriesCountLabel} />
    </PageContainer>
  )
}
