import type {
  FeedbackItem,
  FeedbackStatus,
  FeedbackType,
} from '../models/feedback.types'

export const FEEDBACK_STATUS_OPTIONS: Array<{ value: FeedbackStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
]

export const FEEDBACK_TYPE_OPTIONS: Array<{ value: FeedbackType | 'all'; label: string }> = [
  { value: 'all', label: 'All types' },
  { value: 'bug', label: 'Bug report' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'process', label: 'Process' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'other', label: 'Other' },
]

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: 'fb-001',
    sender: {
      id: 'emp-014',
      name: 'Rami Hasan',
      role: 'Sales associate',
      branch: 'Damascus Flagship',
    },
    type: 'bug',
    status: 'new',
    subject: 'Barcode scanner fails after standby',
    message:
      'The barcode scanner stops responding after the POS tablet sleeps. We need to reconnect it manually before every sale.',
    source: 'Store app',
    createdAt: '2026-04-03T07:45:00.000Z',
  },
  {
    id: 'fb-002',
    sender: {
      id: 'emp-018',
      name: 'Nour Saad',
      role: 'Inventory coordinator',
      branch: 'Aleppo Warehouse',
    },
    type: 'inventory',
    status: 'new',
    subject: 'Stock transfers need batch confirmation',
    message:
      'Transfers are easy to create, but the team needs a final review step before quantities leave warehouse inventory.',
    source: 'Warehouse app',
    createdAt: '2026-04-02T16:20:00.000Z',
  },
  {
    id: 'fb-003',
    sender: {
      id: 'emp-006',
      name: 'Mira Khalil',
      role: 'Branch supervisor',
      branch: 'Homs Central',
    },
    type: 'process',
    status: 'read',
    subject: 'Returns flow is missing reason presets',
    message:
      'The team enters return reasons manually, which creates inconsistent records. Predefined reasons would make review much easier.',
    source: 'Store app',
    createdAt: '2026-04-01T10:12:00.000Z',
  },
  {
    id: 'fb-004',
    sender: {
      id: 'emp-024',
      name: 'Jad Hamwi',
      role: 'Sales associate',
      branch: 'Latakia Marina',
    },
    type: 'suggestion',
    status: 'read',
    subject: 'Add customer preference notes to checkout',
    message:
      'Staff often remember accessory preferences verbally. A small note field during checkout would help repeat visits and upselling.',
    source: 'Store app',
    createdAt: '2026-03-31T13:05:00.000Z',
  },
  {
    id: 'fb-005',
    sender: {
      id: 'emp-011',
      name: 'Sara Mardini',
      role: 'Operations lead',
      branch: 'Damascus Flagship',
    },
    type: 'other',
    status: 'archived',
    subject: 'Weekly meeting notes should be attached to tasks',
    message:
      'Some action items get lost after branch reviews. Linking meeting notes to operational tasks would make follow-up clearer.',
    source: 'Admin portal',
    createdAt: '2026-03-28T08:30:00.000Z',
  },
  {
    id: 'fb-006',
    sender: {
      id: 'emp-031',
      name: 'Lina Darwish',
      role: 'Customer support',
      branch: 'Remote support desk',
    },
    type: 'bug',
    status: 'new',
    subject: 'IMEI search returns empty on partial match',
    message:
      'Support can only find devices when the full IMEI is pasted. Partial search would make lookup much faster during calls.',
    source: 'Admin portal',
    createdAt: '2026-03-27T15:40:00.000Z',
  },
]

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  new: 'New',
  read: 'Read',
  archived: 'Archived',
}

const TYPE_LABELS: Record<FeedbackType, string> = {
  bug: 'Bug report',
  suggestion: 'Suggestion',
  process: 'Process',
  inventory: 'Inventory',
  other: 'Other',
}

export function getFeedbackStatusLabel(status: FeedbackStatus) {
  return STATUS_LABELS[status]
}

export function getFeedbackTypeLabel(type: FeedbackType) {
  return TYPE_LABELS[type]
}

export function getFeedbackInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function formatFeedbackDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export function getFeedbackPreview(message: string, maxLength = 120) {
  if (message.length <= maxLength) {
    return message
  }

  return `${message.slice(0, maxLength).trimEnd()}...`
}
