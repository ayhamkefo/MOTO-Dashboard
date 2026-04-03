import { StatusBadge } from '../../../shared/components/status-badge'
import type { FeedbackStatus } from '../models/feedback.types'
import { getFeedbackStatusLabel } from '../utils/feedback-ui'

interface FeedbackStatusBadgeProps {
  status: FeedbackStatus
}

const statusToneMap = {
  new: 'info',
  read: 'neutral',
  archived: 'warning',
} as const

export function FeedbackStatusBadge({ status }: FeedbackStatusBadgeProps) {
  return <StatusBadge label={getFeedbackStatusLabel(status)} tone={statusToneMap[status]} />
}
