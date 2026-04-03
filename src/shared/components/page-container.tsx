import type { PropsWithChildren } from 'react'

import { cn } from '../utils/cn'

interface PageContainerProps {
  className?: string
}

export function PageContainer({
  children,
  className,
}: PropsWithChildren<PageContainerProps>) {
  return <div className={cn('page-container', className)}>{children}</div>
}
