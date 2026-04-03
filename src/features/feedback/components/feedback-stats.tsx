import type { CSSProperties } from 'react'

import { Card } from '../../../shared/components/card'
import type { FeedbackSummaryTone } from '../utils/feedback-ui'
import { getFeedbackSummarySurface } from '../utils/feedback-ui'

const statsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
  gap: '1rem',
}

const valueStyle: CSSProperties = {
  marginTop: '0.625rem',
  fontSize: '1.9rem',
  lineHeight: 1,
  letterSpacing: '-0.06em',
}

const detailStyle: CSSProperties = {
  marginTop: '0.375rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

interface FeedbackStat {
  label: string
  value: string
  detail: string
  tone: FeedbackSummaryTone
}

interface FeedbackStatsProps {
  stats: FeedbackStat[]
}

export function FeedbackStats({ stats }: FeedbackStatsProps) {
  return (
    <div style={statsGridStyle}>
      {stats.map((stat) => {
        const surface = getFeedbackSummarySurface(stat.tone)

        return (
          <Card
            key={stat.label}
            style={{
              background: surface.background,
              borderColor: surface.borderColor,
            }}
          >
            <p className="metric-card__label">{stat.label}</p>
            <strong style={{ ...valueStyle, color: surface.textColor }}>{stat.value}</strong>
            <p style={detailStyle}>{stat.detail}</p>
          </Card>
        )
      })}
    </div>
  )
}
