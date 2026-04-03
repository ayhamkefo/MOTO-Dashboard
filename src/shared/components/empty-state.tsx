import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  message: string
  action?: ReactNode
}

export function EmptyState({ action, message, title }: EmptyStateProps) {
  return (
    <div className="ui-feedback-state">
      <p className="ui-feedback-state__eyebrow">No content yet</p>
      <h2 className="ui-feedback-state__title">{title}</h2>
      <p className="ui-feedback-state__message">{message}</p>
      {action}
    </div>
  )
}
