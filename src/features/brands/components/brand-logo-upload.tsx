import type { ChangeEvent, CSSProperties } from 'react'
import { useId, useRef } from 'react'

import { Button } from '../../../shared/components/button'

const rootStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.875rem',
  padding: '1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '1rem',
  background: 'rgba(255, 255, 255, 0.72)',
}

const previewRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
}

const previewFrameStyle: CSSProperties = {
  width: '4rem',
  height: '4rem',
  borderRadius: '1rem',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-muted)',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  overflow: 'hidden',
}

const actionsStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
}

const statusStyle: CSSProperties = {
  minHeight: '1.25rem',
  fontSize: '0.875rem',
}

interface BrandLogoUploadProps {
  errorMessage?: string
  hint?: string
  onFileChange: (file: File | null) => void
  previewUrl: string | null
  statusMessage?: string | null
}

export function BrandLogoUpload({
  errorMessage,
  hint,
  onFileChange,
  previewUrl,
  statusMessage,
}: BrandLogoUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelectClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onFileChange(file)
  }

  const handleRemoveClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onFileChange(null)
  }

  return (
    <div style={rootStyle}>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Brand logo
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          {hint ?? 'PNG, JPG, WEBP, or SVG'}
        </p>
      </div>

      <input
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="brand-logo-upload__input"
        id={inputId}
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
      />

      <div style={previewRowStyle}>
        <div style={previewFrameStyle}>
          {previewUrl ? (
            <img
              alt="Selected brand logo preview"
              src={previewUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <ImageIcon />
          )}
        </div>

        {previewUrl ? (
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Logo selected</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              Replace it anytime before creating the brand.
            </p>
          </div>
        ) : (
          <div aria-hidden="true">
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No logo selected</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              Upload a logo to improve list scanning.
            </p>
          </div>
        )}
      </div>

      <div style={actionsStyle}>
        <Button onClick={handleSelectClick} type="button" variant="secondary">
          <UploadIcon />
          {previewUrl ? 'Replace' : 'Upload'}
        </Button>
        <Button disabled={!previewUrl} onClick={handleRemoveClick} type="button" variant="ghost">
          <TrashIcon />
          Remove
        </Button>
      </div>

      <div aria-live="polite" style={statusStyle}>
        {errorMessage ? (
          <p role="alert" style={{ color: 'var(--color-danger)' }}>
            {errorMessage}
          </p>
        ) : statusMessage ? (
          <p style={{ color: 'var(--color-text-soft)' }}>{statusMessage}</p>
        ) : null}
      </div>
    </div>
  )
}

function UploadIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M8 10.667V4M5.333 6.667 8 4l2.667 2.667M3.333 12.667h9.334"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path
        d="M2.667 4h10.666M6.667 7v4M9.333 7v4M4.667 4l.4 8.267A1.333 1.333 0 0 0 6.4 13.556h3.2a1.333 1.333 0 0 0 1.333-1.289L11.333 4M6 4V2.889c0-.245.2-.445.444-.445h3.112c.245 0 .444.2.444.445V4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Zm2 8.5h12l-3.6-3.6a1 1 0 0 0-1.414 0L11 14.386l-.793-.793a1 1 0 0 0-1.414 0L6 16Zm3-5.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
