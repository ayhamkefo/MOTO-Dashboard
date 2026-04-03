import type { ButtonHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('ui-button', `ui-button--${variant}`, className)}
      type={type}
      {...props}
    />
  )
}
