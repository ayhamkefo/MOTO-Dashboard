export type FeedbackStatus = 'new' | 'read' | 'archived'

export type FeedbackType = 'bug' | 'suggestion' | 'process' | 'inventory' | 'other'

export interface FeedbackSender {
  id: string
  name: string
  role: string
  branch: string
}

export interface FeedbackItem {
  id: string
  sender: FeedbackSender
  type: FeedbackType
  status: FeedbackStatus
  subject: string
  message: string
  source: string
  createdAt: string
}

export interface FeedbackListParams {
  search?: string
  status?: FeedbackStatus | 'all'
  type?: FeedbackType | 'all'
}

export interface FeedbackListResponse {
  items: FeedbackItem[]
  total: number
  newCount: number
  readCount: number
  archivedCount: number
}

export interface UpdateFeedbackStatusPayload {
  feedbackId: string
  status: Exclude<FeedbackStatus, 'new'>
}

export interface DeleteFeedbackPayload {
  feedbackId: string
}
