import { Card } from '../../../shared/components/card'
import { PageContainer } from '../../../shared/components/page-container'
import { PageHeader } from '../../../shared/components/page-header'
import { StatusBadge } from '../../../shared/components/status-badge'
import { BrandsList } from '../components/brands-list'
import { CreateBrandForm } from '../components/create-brand-form'
import { useBrandsPage } from '../hooks/use-brands-page'

export function BrandsPage() {
  const {
    brands,
    brandsCount,
    brandsCountLabel,
    form,
    handleCreateBrand,
    handleLogoFileChange,
    integrationStatusMessage,
    isSubmitting,
    logoPreviewUrl,
    submitMessage,
    uploadMessage,
  } = useBrandsPage()

  return (
    <PageContainer>
      <PageHeader
        title="Brands"
        description="Manage supplier identity from a polished, UI-first dashboard surface. The page is already shaped for a future list query, create mutation, and logo upload flow without pretending those backend contracts exist yet."
        actions={
          <>
            <StatusBadge label={`${brandsCount} total`} tone="info" />
            <StatusBadge label="Backend pending" tone="warning" />
          </>
        }
      />

      <div className="brands-page__top-grid">
        <CreateBrandForm
          form={form}
          isSubmitting={isSubmitting}
          logoPreviewUrl={logoPreviewUrl}
          onLogoFileChange={handleLogoFileChange}
          onSubmit={handleCreateBrand}
          submitMessage={submitMessage}
          uploadMessage={uploadMessage}
        />

        <Card
          title="Integration readiness"
          description="The feature boundaries already match the moving parts the final Brands module will need."
        >
          <div className="brands-readiness">
            <div className="brands-readiness__item">
              <p className="brands-readiness__label">Current data mode</p>
              <strong className="brands-readiness__value">Local page state</strong>
              <p className="card-copy">
                The page stays interactive and visually complete without simulating a
                finished backend.
              </p>
            </div>

            <div className="brands-readiness__item">
              <p className="brands-readiness__label">Future integration slots</p>
              <strong className="brands-readiness__value">Feature `api/` + hook layer</strong>
              <p className="card-copy">{integrationStatusMessage}</p>
            </div>

            <div className="brands-readiness__item">
              <p className="brands-readiness__label">Prepared next steps</p>
              <p className="card-copy">
                List queries, create mutations, edit and delete row actions, plus an upload
                adapter can connect without restructuring the page.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BrandsList brands={brands} brandsCountLabel={brandsCountLabel} />
    </PageContainer>
  )
}
