import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const INITIAL = {
  fullName: '',
  phone: '',
  email: '',
  companyName: '',
  comments: '',
}

export default function EnquiryModal({ open, companyName = '', onClose }) {
  const titleId = useId()
  const firstFieldRef = useRef(null)
  const [form, setForm] = useState(INITIAL)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    setForm({ ...INITIAL, companyName: companyName || '' })
    setSending(false)
    setSent(false)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 80)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
    }
  }, [open, companyName, onClose])

  if (!open) return null

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const subject = `Enquiry: ${form.companyName || 'Ready Made Company'}`
    const body = [
      `Full name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Company: ${form.companyName}`,
      '',
      'Comments:',
      form.comments || '(none)',
    ].join('\n')

    const mailto = `mailto:info@uk.company?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    window.setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 400)
  }

  return createPortal(
    <div className="enquiry-overlay" onClick={onClose} role="presentation">
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="enquiry-close-icon" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 id={titleId} className="enquiry-title">
          Enquiry Form
        </h2>
        <p className="enquiry-lead">
          Our team is happy to answer your Ready Made Companies questions. Fill out the form and
          we&apos;ll be in touch as soon as possible.
        </p>

        {sent ? (
          <div className="enquiry-success">
            <p>Thanks - your enquiry is ready to send via your email app.</p>
            <button type="button" className="enquiry-submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <label>
              Your Full Name
              <input
                ref={firstFieldRef}
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={update('fullName')}
                required
                autoComplete="name"
              />
            </label>
            <label>
              Your Phone Number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={update('phone')}
                required
                autoComplete="tel"
              />
            </label>
            <label>
              Your Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update('email')}
                required
                autoComplete="email"
              />
            </label>
            <label>
              Company name you&apos;re enquiring about
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={update('companyName')}
                required
              />
            </label>
            <label>
              Your Comments
              <textarea
                name="comments"
                value={form.comments}
                onChange={update('comments')}
                placeholder="Comments"
                rows={5}
              />
            </label>
            <button type="submit" className="enquiry-submit" disabled={sending}>
              {sending ? 'Opening…' : 'Submit'}
            </button>
          </form>
        )}

        <button type="button" className="enquiry-close-link" onClick={onClose}>
          Close x
        </button>
      </div>
    </div>,
    document.body
  )
}
