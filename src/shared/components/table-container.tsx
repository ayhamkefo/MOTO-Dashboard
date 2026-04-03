import type { PropsWithChildren, ReactNode } from 'react'

interface TableContainerProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function TableContainer({
  actions,
  children,
  description,
  title,
}: PropsWithChildren<TableContainerProps>) {
  return (
    <section className="table-container">
      <header className="table-container__header">
        <div>
          <h2 className="table-container__title">{title}</h2>
          {description ? (
            <p className="table-container__description">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="table-container__actions">{actions}</div> : null}
      </header>
      <div className="table-container__body">{children}</div>
    </section>
  )
}
