import type { CSSProperties, KeyboardEventHandler } from 'react'

import { Button } from '../../../shared/components/button'

const rootStyle: CSSProperties = {
  display: 'grid',
  gap: '0.875rem',
}

const labelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.5rem',
}

const labelTextStyle: CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 600,
}

const inputRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: '0.75rem',
  alignItems: 'start',
}

const chipsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.625rem',
}

const chipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  minHeight: '2rem',
  padding: '0.375rem 0.75rem',
  borderRadius: '999px',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-elevated)',
  fontSize: '0.875rem',
}

const chipRemoveButtonStyle: CSSProperties = {
  width: '1.25rem',
  height: '1.25rem',
  border: 'none',
  borderRadius: '999px',
  background: 'rgba(15, 23, 42, 0.08)',
  color: 'var(--color-text)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const errorStyle: CSSProperties = {
  color: 'var(--color-danger)',
  fontSize: '0.875rem',
}

interface ProductTagsInputProps {
  id: string
  label: string
  placeholder: string
  value: string
  values: string[]
  onValueChange: (value: string) => void
  onAdd: () => void
  onRemove: (value: string) => void
  errorMessage?: string
  addLabel?: string
}

export function ProductTagsInput({
  addLabel = 'Add',
  errorMessage,
  id,
  label,
  onAdd,
  onRemove,
  onValueChange,
  placeholder,
  value,
  values,
}: ProductTagsInputProps) {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onAdd()
    }
  }

  return (
    <div style={rootStyle}>
      <label htmlFor={id} style={labelStyle}>
        <span style={labelTextStyle}>{label}</span>
      </label>

      <div style={inputRowStyle}>
        <input
          aria-invalid={errorMessage ? 'true' : 'false'}
          className="ui-input"
          id={id}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={value}
        />
        <Button onClick={onAdd} style={{ minWidth: '5.25rem' }} type="button" variant="secondary">
          <PlusIcon />
          {addLabel}
        </Button>
      </div>

      {values.length > 0 ? (
        <div style={chipsStyle}>
          {values.map((item) => (
            <span key={item} style={chipStyle}>
              {item}
              <button
                aria-label={`Remove ${item}`}
                onClick={() => onRemove(item)}
                style={chipRemoveButtonStyle}
                type="button"
              >
                <CloseIcon />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {errorMessage ? (
        <p role="alert" style={errorStyle}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
      <path
        d="M8 3.333v9.334M3.333 8h9.334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
      <path
        d="M3 3l6 6M9 3 3 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}
