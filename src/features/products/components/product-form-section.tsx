import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: '0.875rem',
  paddingTop: '0.25rem',
}

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: '1rem',
}

interface ProductFormSectionProps {
  title: string
  action?: ReactNode
}

export function ProductFormSection({
  action,
  children,
  title,
}: PropsWithChildren<ProductFormSectionProps>) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2
          style={{
            fontSize: '1rem',
            lineHeight: 1.2,
            fontWeight: 700,
            color: 'var(--color-primary)',
          }}
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
