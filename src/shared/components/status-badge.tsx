import { cn } from '../utils/cn'

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface StatusBadgeProps {
  label: string
  tone?: StatusTone
}

export function StatusBadge({
  label,
  tone = 'neutral',
}: StatusBadgeProps) {
  return <span className={cn('status-badge', `status-badge--${tone}`)}>{label}</span>
}
