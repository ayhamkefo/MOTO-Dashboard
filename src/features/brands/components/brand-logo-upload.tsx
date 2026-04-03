import type { ChangeEvent } from 'react'
import { useId, useRef } from 'react'

import { Button } from '../../../shared/components/button'

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
    <div className="brand-logo-upload">
      <div className="brand-logo-upload__header">
        <div>
          <p className="brand-logo-upload__label">Brand logo</p>
          <p className="brand-logo-upload__hint">
            {hint ??
              'Use a clean square mark when possible. This preview is local-only until the upload flow is connected.'}
          </p>
        </div>
      </div>

      <input
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="brand-logo-upload__input"
        id={inputId}
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
      />

      <div className="brand-logo-upload__surface">
        {previewUrl ? (
          <img alt="Selected brand logo preview" className="brand-logo-upload__preview" src={previewUrl} />
        ) : (
          <div aria-hidden="true" className="brand-logo-upload__placeholder">
            <span className="brand-logo-upload__placeholder-badge">PNG / JPG / SVG</span>
            <strong className="brand-logo-upload__placeholder-title">Drop in a brand mark</strong>
            <p className="brand-logo-upload__placeholder-copy">
              The selected file stays local for now and is ready to be routed through a real upload adapter later.
            </p>
          </div>
        )}
      </div>

      <div className="brand-logo-upload__actions">
        <Button onClick={handleSelectClick} type="button" variant="secondary">
          {previewUrl ? 'Replace image' : 'Select image'}
        </Button>
        <Button disabled={!previewUrl} onClick={handleRemoveClick} type="button" variant="ghost">
          Remove
        </Button>
      </div>

      <div aria-live="polite" className="brand-logo-upload__status">
        {errorMessage ? (
          <p className="brand-logo-upload__error" role="alert">
            {errorMessage}
          </p>
        ) : statusMessage ? (
          <p className="brand-logo-upload__message">{statusMessage}</p>
        ) : null}
      </div>
    </div>
  )
}
