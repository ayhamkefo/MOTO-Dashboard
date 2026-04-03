import { StatusBadge } from '../../../shared/components/status-badge'
import type { FeedbackStatus } from '../models/feedback.types'
import { getFeedbackStatusLabel, getFeedbackStatusTone } from '../utils/feedback-ui'

interface FeedbackStatusBadgeProps {
  status: FeedbackStatus
}

export function FeedbackStatusBadge({ status }: FeedbackStatusBadgeProps) {
  return <StatusBadge label={getFeedbackStatusLabel(status)} tone={getFeedbackStatusTone(status)} />
}
