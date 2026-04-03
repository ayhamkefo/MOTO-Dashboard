import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

export function Card({
  children,
  className,
  description,
  title,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <section className={cn('ui-card', className)} {...props}>
      {title || description ? (
        <header className="ui-card__header">
          {title ? <h2 className="ui-card__title">{title}</h2> : null}
          {description ? <p className="ui-card__description">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  )
}
