import { Link } from 'react-router-dom'

import { PageContainer } from '../../../shared/components/page-container'
import { CreateProductForm } from '../components/create-product-form'
import { useCreateProductForm } from '../hooks/use-create-product-form'

export function CreateProductPage() {
  const {
    brandOptions,
    categoryOptions,
    colorDraft,
    featureDraft,
    form,
    handleAddColor,
    handleAddFeature,
    handleRemoveColor,
    handleRemoveFeature,
    handleSubmit,
    isSubmitting,
    setColorDraft,
    setFeatureDraft,
    submitMessage,
  } = useCreateProductForm()

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link className="ui-button ui-button--secondary" to="/products">
          Back
        </Link>
      </div>

      <CreateProductForm
        brandOptions={brandOptions}
        categoryOptions={categoryOptions}
        colorDraft={colorDraft}
        featureDraft={featureDraft}
        form={form}
        isSubmitting={isSubmitting}
        onAddColor={handleAddColor}
        onAddFeature={handleAddFeature}
        onColorDraftChange={setColorDraft}
        onFeatureDraftChange={setFeatureDraft}
        onRemoveColor={handleRemoveColor}
        onRemoveFeature={handleRemoveFeature}
        onSubmit={handleSubmit}
        submitMessage={submitMessage}
      />
    </PageContainer>
  )
}
