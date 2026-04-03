import { StatusBadge } from '../../../shared/components/status-badge'
import type { FeedbackType } from '../models/feedback.types'
import { getFeedbackTypeLabel } from '../utils/feedback-ui'

interface FeedbackTypeBadgeProps {
  type: FeedbackType
}

const typeToneMap = {
  bug: 'danger',
  suggestion: 'success',
  process: 'warning',
  inventory: 'info',
  other: 'neutral',
} as const

export function FeedbackTypeBadge({ type }: FeedbackTypeBadgeProps) {
  return <StatusBadge label={getFeedbackTypeLabel(type)} tone={typeToneMap[type]} />
}
