import { useState } from 'react'

const INITIAL = {
  fullName: '',
  phone: '',
  email: '',
  companyName: '',
  comments: '',
}

export default function ProductContactForm({
  subjectPrefix = 'Enquiry',
  companyLabel = 'Company name',
  submitLabel = 'Send enquiry',
}) {
  const [form, setForm] = useState(INITIAL)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const subject = `${subjectPrefix}: ${form.companyName || form.fullName || 'UK.company'}`
    const body = [
      `Full name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `${companyLabel}: ${form.companyName || '(not provided)'}`,
      '',
      'Comments:',
      form.comments || '(none)',
    ].join('\n')

    window.location.href = `mailto:info@uk.company?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 400)
  }

  if (sent) {
    return (
      <div className="product-form-success">
        <p>Thanks - your email app should open with the enquiry ready to send.</p>
        <button type="button" className="btn btn-primary" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="product-contact-form" onSubmit={handleSubmit}>
      <label>
        Your full name
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={update('fullName')}
          required
          autoComplete="name"
        />
      </label>
      <label>
        Phone number
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
        Email address
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
        {companyLabel}
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={update('companyName')}
        />
      </label>
      <label>
        Comments
        <textarea
          name="comments"
          value={form.comments}
          onChange={update('comments')}
          rows={4}
          placeholder="Tell us briefly what you need"
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? 'Opening…' : submitLabel}
      </button>
    </form>
  )
}
