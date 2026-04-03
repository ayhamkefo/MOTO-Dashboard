import { StatusBadge } from '../../../shared/components/status-badge'
import type { FeedbackType } from '../models/feedback.types'
import { getFeedbackTypeLabel, getFeedbackTypeTone } from '../utils/feedback-ui'

interface FeedbackTypeBadgeProps {
  type: FeedbackType
}

export function FeedbackTypeBadge({ type }: FeedbackTypeBadgeProps) {
  return <StatusBadge label={getFeedbackTypeLabel(type)} tone={getFeedbackTypeTone(type)} />
}
