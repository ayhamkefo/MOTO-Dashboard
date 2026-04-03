import { PageContainer } from '../../../shared/components/page-container'
import { CategoryList } from '../components/category-list'
import { CreateCategoryForm } from '../components/create-category-form'
import { useCategoriesPage } from '../hooks/use-categories-page'

export function CategoriesPage() {
  const {
    categories,
    categoriesCountLabel,
    form,
    handleCreateCategory,
    isSubmitting,
    submitMessage,
  } = useCategoriesPage()

  return (
    <PageContainer>
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
