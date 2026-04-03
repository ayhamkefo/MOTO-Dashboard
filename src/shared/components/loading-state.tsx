interface LoadingStateProps {
  title?: string
  message?: string
}

export function LoadingState({
  title = 'Loading',
  message = 'Preparing the latest data and layout context.',
}: LoadingStateProps) {
  return (
    <div className="ui-feedback-state">
      <div className="ui-feedback-state__spinner" aria-hidden="true" />
      <h2 className="ui-feedback-state__title">{title}</h2>
      <p className="ui-feedback-state__message">{message}</p>
    </div>
  )
}
