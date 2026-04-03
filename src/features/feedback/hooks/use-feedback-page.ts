import { useMemo, useState } from 'react'

import type { FeedbackItem, FeedbackStatus, FeedbackType } from '../models/feedback.types'
import { INITIAL_FEEDBACK } from '../utils/feedback-ui'

type FeedbackFilterValue<T extends string> = T | 'all'

export function useFeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(INITIAL_FEEDBACK)
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState<FeedbackFilterValue<FeedbackStatus>>('all')
  const [type, setType] = useState<FeedbackFilterValue<FeedbackType>>('all')

  const filteredFeedback = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return feedbackItems.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          item.sender.name,
          item.sender.role,
          item.sender.branch,
          item.subject,
          item.message,
          item.source,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesStatus = status === 'all' || item.status === status
      const matchesType = type === 'all' || item.type === type

      return matchesSearch && matchesStatus && matchesType
    })
  }, [feedbackItems, searchValue, status, type])

  const stats = useMemo(() => {
    const total = feedbackItems.length
    const newCount = feedbackItems.filter((item) => item.status === 'new').length
    const readCount = feedbackItems.filter((item) => item.status === 'read').length

    return [
      {
        label: 'Total feedback',
        value: `${total}`,
        detail: 'All employee submissions',
      },
      {
        label: 'New',
        value: `${newCount}`,
        detail: 'Awaiting review',
      },
      {
        label: 'Read',
        value: `${readCount}`,
        detail: 'Already triaged',
      },
    ]
  }, [feedbackItems])

  const totalCountLabel = useMemo(() => {
    const count = feedbackItems.length
    return `${count} total ${count === 1 ? 'entry' : 'entries'}`
  }, [feedbackItems.length])

  const filteredCountLabel = useMemo(() => {
    const count = filteredFeedback.length
    return `${count} ${count === 1 ? 'result' : 'results'}`
  }, [filteredFeedback.length])

  const unreadCountLabel = useMemo(() => {
    const count = feedbackItems.filter((item) => item.status === 'new').length
    return `${count} new`
  }, [feedbackItems])

  const hasActiveFilters =
    searchValue.trim().length > 0 || status !== 'all' || type !== 'all'

  return {
    feedbackItems: filteredFeedback,
    filteredCountLabel,
    hasActiveFilters,
    searchValue,
    stats,
    status,
    totalCountLabel,
    type,
    unreadCountLabel,
    setSearchValue,
    setStatus,
    setType,
    markAsRead: (feedbackId: string) => {
      setFeedbackItems((currentItems) =>
        currentItems.map((item) =>
          item.id === feedbackId && item.status === 'new'
            ? { ...item, status: 'read' }
            : item,
        ),
      )
    },
    archiveFeedback: (feedbackId: string) => {
      setFeedbackItems((currentItems) =>
        currentItems.map((item) =>
          item.id === feedbackId ? { ...item, status: 'archived' } : item,
        ),
      )
    },
    deleteFeedback: (feedbackId: string) => {
      setFeedbackItems((currentItems) => currentItems.filter((item) => item.id !== feedbackId))
    },
    resetFilters: () => {
      setSearchValue('')
      setStatus('all')
      setType('all')
    },
  }
}
