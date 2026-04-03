import type { InputHTMLAttributes } from 'react'

import { cn } from '../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export function Input({ className, hint, id, label, ...props }: InputProps) {
  return (
    <label className="ui-field" htmlFor={id}>
      {label ? <span className="ui-field__label">{label}</span> : null}
      <input className={cn('ui-input', className)} id={id} {...props} />
      {hint ? <span className="ui-field__hint">{hint}</span> : null}
    </label>
  )
}
