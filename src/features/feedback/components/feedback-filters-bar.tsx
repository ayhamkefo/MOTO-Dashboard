import type { CSSProperties } from 'react'

import { Button } from '../../../shared/components/button'
import { Card } from '../../../shared/components/card'
import { Input } from '../../../shared/components/input'
import type { FeedbackStatus, FeedbackType } from '../models/feedback.types'
import { FEEDBACK_STATUS_OPTIONS, FEEDBACK_TYPE_OPTIONS } from '../utils/feedback-ui'

const toolbarStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(18rem, 1.8fr) minmax(11rem, 0.8fr) minmax(11rem, 0.8fr) auto',
  gap: '1rem',
  alignItems: 'end',
}

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}

const labelStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
}

const helperStyle: CSSProperties = {
  color: 'var(--color-text-soft)',
  fontSize: '0.875rem',
}

interface FeedbackFiltersBarProps {
  searchValue: string
  status: FeedbackStatus | 'all'
  type: FeedbackType | 'all'
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onStatusChange: (value: FeedbackStatus | 'all') => void
  onTypeChange: (value: FeedbackType | 'all') => void
  onReset: () => void
}

export function FeedbackFiltersBar({
  hasActiveFilters,
  onReset,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  searchValue,
  status,
  type,
}: FeedbackFiltersBarProps) {
  return (
    <Card title="Review filters">
      <div style={toolbarStyle}>
        <Input
          autoComplete="off"
          id="feedback-search"
          label="Search feedback"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by sender, branch, subject, or message"
          value={searchValue}
        />

        <label htmlFor="feedback-status-filter" style={fieldStyle}>
          <span style={labelStyle}>Status</span>
          <select
            className="ui-input"
            id="feedback-status-filter"
            onChange={(event) => onStatusChange(event.target.value as FeedbackStatus | 'all')}
            value={status}
          >
            {FEEDBACK_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="feedback-type-filter" style={fieldStyle}>
          <span style={labelStyle}>Type</span>
          <select
            className="ui-input"
            id="feedback-type-filter"
            onChange={(event) => onTypeChange(event.target.value as FeedbackType | 'all')}
            value={type}
          >
            {FEEDBACK_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div style={{ display: 'grid', gap: '0.5rem', justifyItems: 'start' }}>
          <span style={helperStyle}>Quick actions</span>
          <Button disabled={!hasActiveFilters} onClick={onReset} variant="ghost">
            Clear filters
          </Button>
        </div>
      </div>
    </Card>
  )
}
