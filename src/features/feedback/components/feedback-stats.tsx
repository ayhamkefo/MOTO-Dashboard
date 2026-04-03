import type { CSSProperties } from 'react'

import { Card } from '../../../shared/components/card'

const statsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
  gap: '1rem',
}

const valueStyle: CSSProperties = {
  fontSize: '2rem',
  lineHeight: 1,
  letterSpacing: '-0.06em',
}

const detailStyle: CSSProperties = {
  marginTop: '0.5rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
}

interface FeedbackStat {
  label: string
  value: string
  detail: string
}

interface FeedbackStatsProps {
  stats: FeedbackStat[]
}

export function FeedbackStats({ stats }: FeedbackStatsProps) {
  return (
    <div style={statsGridStyle}>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <p className="metric-card__label">{stat.label}</p>
          <strong style={valueStyle}>{stat.value}</strong>
          <p style={detailStyle}>{stat.detail}</p>
        </Card>
      ))}
    </div>
  )
}
