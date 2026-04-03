import type { CSSProperties } from 'react'

import { PageContainer } from '../../../shared/components/page-container'
import { CreateEmployeeForm } from '../components/create-employee-form'
import { useCreateEmployeeForm } from '../hooks/use-create-employee-form'

const contentGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 32rem))',
  gap: '1.5rem',
  alignItems: 'start',
}



export function EmployeesPage() {
  const {
    form,
    handleSubmit,
    isSubmitting,
    resetForm,
    roleOptions,
    submitMessage,
  } = useCreateEmployeeForm()

  return (
    <PageContainer>

      <div style={contentGridStyle}>
        <CreateEmployeeForm
          form={form}
          isSubmitting={isSubmitting}
          onReset={resetForm}
          onSubmit={handleSubmit}
          roleOptions={roleOptions}
          submitMessage={submitMessage}
        />
      </div>
    </PageContainer>
  )
}
