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
    isSubmitting,
    submitMessage,
  } = useCategoriesPage()

  return (
    <PageContainer>
      <PageHeader
        title="Categories"
        description="Organize catalog groups."
        actions={<StatusBadge label={`${categoriesCount} total`} tone="info" />}
      />

      <div style={{ maxWidth: '32rem' }}>
        <CreateCategoryForm
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={handleCreateCategory}
          submitMessage={submitMessage}
        />
      </div>

      <CategoryList categories={categories} categoriesCountLabel={categoriesCountLabel} />
    </PageContainer>
  )
}
