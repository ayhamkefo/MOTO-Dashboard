import { PageContainer } from '../../../shared/components/page-container'
import { BrandsList } from '../components/brands-list'
import { CreateBrandForm } from '../components/create-brand-form'
import { useBrandsPage } from '../hooks/use-brands-page'

export function BrandsPage() {
  const {
    brands,
    brandsCountLabel,
    form,
    handleCreateBrand,
    handleLogoFileChange,
    isSubmitting,
    logoPreviewUrl,
    submitMessage,
    uploadMessage,
  } = useBrandsPage()

  return (
    <PageContainer>

      <div style={{ maxWidth: '36rem' }}>
        <CreateBrandForm
          form={form}
          isSubmitting={isSubmitting}
          logoPreviewUrl={logoPreviewUrl}
          onLogoFileChange={handleLogoFileChange}
          onSubmit={handleCreateBrand}
          submitMessage={submitMessage}
          uploadMessage={uploadMessage}
        />
      </div>

      <BrandsList brands={brands} brandsCountLabel={brandsCountLabel} />
    </PageContainer>
  )
}
