import type {
  DeleteFeedbackPayload,
  FeedbackListParams,
  FeedbackListResponse,
  UpdateFeedbackStatusPayload,
} from '../models/feedback.types'

export const feedbackKeys = {
  all: ['feedback'] as const,
  lists: () => [...feedbackKeys.all, 'list'] as const,
  list: (params: FeedbackListParams) => [...feedbackKeys.lists(), params] as const,
}

export async function getFeedbackList(_params: FeedbackListParams): Promise<FeedbackListResponse> {
  throw new Error('Feedback API integration is not implemented yet.')
}

export async function markFeedbackAsRead(
  _payload: UpdateFeedbackStatusPayload,
): Promise<void> {
  throw new Error('Feedback API integration is not implemented yet.')
}

export async function archiveFeedback(
  _payload: UpdateFeedbackStatusPayload,
): Promise<void> {
  throw new Error('Feedback API integration is not implemented yet.')
}

export async function deleteFeedback(_payload: DeleteFeedbackPayload): Promise<void> {
  throw new Error('Feedback API integration is not implemented yet.')
}
