import type { ReactNode } from 'react'

interface ErrorStateProps {
  title?: string
  message?: string
  action?: ReactNode
}

export function ErrorState({
  action,
  title = 'Something went wrong',
  message = 'The requested content could not be prepared. Retry or check the API configuration.',
}: ErrorStateProps) {
  return (
    <div className="ui-feedback-state ui-feedback-state--error">
      <p className="ui-feedback-state__eyebrow">Request issue</p>
      <h2 className="ui-feedback-state__title">{title}</h2>
      <p className="ui-feedback-state__message">{message}</p>
      {action}
    </div>
  )
}
