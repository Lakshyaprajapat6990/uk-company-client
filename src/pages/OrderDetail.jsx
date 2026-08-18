import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ordersApi } from '../lib/api.js'

const emptyPerson = () => ({
  type: 'individual',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: 'British',
  countryOfResidence: 'United Kingdom',
  email: '',
  phone: '',
  residentialAddress: { line1: '', city: '', postcode: '', country: 'United Kingdom' },
})

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [documents, setDocuments] = useState([])
  const [timeline, setTimeline] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [files, setFiles] = useState([])
  const [idType, setIdType] = useState('passport')
  const [details, setDetails] = useState({
    proposedName: '',
    nameEnding: 'Limited',
    sicCodes: [''],
    directors: [emptyPerson()],
    shareholders: [{ ...emptyPerson(), shares: 1, shareClass: 'Ordinary', amountPaidPerShare: 1 }],
    statementOfCapital: {
      shareClass: 'Ordinary',
      numberOfShares: 1,
      nominalValue: 1,
      currency: 'GBP',
    },
    registeredOffice: { line1: '', city: '', postcode: '', country: 'United Kingdom' },
    useOurRegisteredOffice: false,
    articlesType: 'model',
  })
  const [transfer, setTransfer] = useState({
    email: '',
    phone: '',
    directorName: '',
    pscName: '',
    sicCodes: [''],
    registeredOffice: { line1: '', city: '', postcode: '', country: 'United Kingdom' },
    verificationCode: '',
    wantsVerificationService: false,
  })

  async function load() {
    const data = await ordersApi.get(id)
    setOrder(data.order)
    setDocuments(data.documents || [])
    if (data.order?.formationDetails) {
      setDetails((d) => ({
        ...d,
        ...data.order.formationDetails,
        proposedName: data.order.formationDetails.proposedName || data.order.companyName || '',
        directors: data.order.formationDetails.directors?.length
          ? data.order.formationDetails.directors
          : d.directors,
        shareholders: data.order.formationDetails.shareholders?.length
          ? data.order.formationDetails.shareholders
          : d.shareholders,
      }))
    }
    if (data.order?.transferDetails) {
      setTransfer((t) => ({
        ...t,
        ...data.order.transferDetails,
        sicCodes: data.order.transferDetails.sicCodes?.length
          ? data.order.transferDetails.sicCodes
          : t.sicCodes,
        registeredOffice: data.order.transferDetails.registeredOffice || t.registeredOffice,
      }))
    }
    const t = await ordersApi.timeline(id)
    setTimeline(t.timeline || [])
  }

  useEffect(() => {
    load().catch((err) => setError(err.message))
  }, [id])

  async function payNow() {
    setBusy(true)
    setError('')
    try {
      const data = await ordersApi.pay(id)
      setMessage(data.message)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function saveDetails(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const payload = {
        ...details,
        sicCodes: details.sicCodes.filter(Boolean),
      }
      const data = await ordersApi.saveFormationDetails(id, payload)
      setMessage(data.message)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function uploadIds(e) {
    e.preventDefault()
    if (!files.length) {
      setError('Select at least one ID file')
      return
    }
    setBusy(true)
    setError('')
    try {
      const data = await ordersApi.uploadId(id, files, idType)
      setMessage(data.message)
      setFiles([])
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function saveTransfer(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const payload = {
        ...transfer,
        sicCodes: transfer.sicCodes.filter(Boolean),
      }
      const data = await ordersApi.saveTransferDetails(id, payload)
      setMessage(data.message)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!order && !error) {
    return (
      <section className="portal-page">
        <div className="container">Loading order...</div>
      </section>
    )
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/portal" className="portal-back">
          ← Back to portal
        </Link>
        {error ? <p className="auth-error">{error}</p> : null}
        {message ? <p className="auth-success">{message}</p> : null}

        {order ? (
          <>
            <div className="portal-header">
              <div>
                <p className="section-label">Order</p>
                <h1>{order.orderNumber}</h1>
                <p className="portal-lead">
                  {order.orderType === 'shelf_sale' ? 'Company for sale' : 'Formation'} · Status:{' '}
                  <strong>{order.status}</strong> · Payment: {order.paymentStatus} · Total: £
                  {Number(order.total).toFixed(2)}
                </p>
              </div>
              {order.orderType !== 'shelf_sale' && order.paymentStatus !== 'paid' ? (
                <button type="button" className="btn btn-primary" disabled={busy} onClick={payNow}>
                  {busy ? 'Processing...' : 'Pay now (simulated)'}
                </button>
              ) : null}
            </div>

            <div className="portal-grid">
              <div>
                <h2>Items</h2>
                <ul className="portal-item-list">
                  {order.items?.map((item) => (
                    <li key={`${item.slug}-${item.title}`}>
                      {item.title} — £{Number(item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <h2>Status timeline</h2>
                <ol className="portal-timeline">
                  {timeline.map((event, i) => (
                    <li key={`${event.status}-${i}`}>
                      <strong>{event.status}</strong>
                      <span>{event.note}</span>
                      <small>{event.at ? new Date(event.at).toLocaleString() : ''}</small>
                    </li>
                  ))}
                </ol>

                <h2>Documents</h2>
                {documents.length === 0 ? <p>No documents uploaded yet.</p> : null}
                <ul className="portal-item-list">
                  {documents.map((doc) => (
                    <li key={doc._id}>
                      {doc.title} · {doc.category}/{doc.docType} · {doc.status}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {order.orderType === 'shelf_sale' ? (
                  <>
                    <h2>Transfer details</h2>
                    <p className="portal-lead">
                      ID must be approved before we send a proforma invoice. Do not pay until you
                      receive that invoice.
                    </p>
                    <form className="auth-form" onSubmit={saveTransfer}>
                      <label>
                        Email
                        <input
                          type="email"
                          value={transfer.email}
                          onChange={(e) => setTransfer((t) => ({ ...t, email: e.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        Phone
                        <input
                          value={transfer.phone}
                          onChange={(e) => setTransfer((t) => ({ ...t, phone: e.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        Director name
                        <input
                          value={transfer.directorName}
                          onChange={(e) => setTransfer((t) => ({ ...t, directorName: e.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        PSC name
                        <input
                          value={transfer.pscName}
                          onChange={(e) => setTransfer((t) => ({ ...t, pscName: e.target.value }))}
                        />
                      </label>
                      <label>
                        SIC code
                        <input
                          value={transfer.sicCodes[0] || ''}
                          onChange={(e) => setTransfer((t) => ({ ...t, sicCodes: [e.target.value] }))}
                          placeholder="e.g. 62020"
                          required
                        />
                      </label>
                      <label>
                        Registered office line 1
                        <input
                          value={transfer.registeredOffice.line1}
                          onChange={(e) =>
                            setTransfer((t) => ({
                              ...t,
                              registeredOffice: { ...t.registeredOffice, line1: e.target.value },
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        City
                        <input
                          value={transfer.registeredOffice.city}
                          onChange={(e) =>
                            setTransfer((t) => ({
                              ...t,
                              registeredOffice: { ...t.registeredOffice, city: e.target.value },
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Postcode
                        <input
                          value={transfer.registeredOffice.postcode}
                          onChange={(e) =>
                            setTransfer((t) => ({
                              ...t,
                              registeredOffice: { ...t.registeredOffice, postcode: e.target.value },
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Companies House verification code
                        <input
                          value={transfer.verificationCode}
                          onChange={(e) =>
                            setTransfer((t) => ({ ...t, verificationCode: e.target.value }))
                          }
                          placeholder="Leave blank if using our £75 service"
                        />
                      </label>
                      <label className="shelf-check">
                        <input
                          type="checkbox"
                          checked={Boolean(transfer.wantsVerificationService)}
                          onChange={(e) =>
                            setTransfer((t) => ({
                              ...t,
                              wantsVerificationService: e.target.checked,
                            }))
                          }
                        />
                        Issue the verification code for me (£75)
                      </label>
                      <button className="btn btn-primary" disabled={busy}>
                        Save transfer details
                      </button>
                    </form>

                    <h2>Upload ID pack</h2>
                    <form className="auth-form" onSubmit={uploadIds}>
                      <label>
                        Document type
                        <select value={idType} onChange={(e) => setIdType(e.target.value)}>
                          <option value="passport">Photographic ID</option>
                          <option value="proof_of_address">Proof of address</option>
                        </select>
                      </label>
                      <label>
                        Files (PDF or image)
                        <input
                          type="file"
                          multiple
                          accept=".pdf,image/*"
                          onChange={(e) => setFiles([...e.target.files])}
                        />
                      </label>
                      <button className="btn btn-primary" disabled={busy}>
                        Upload documents
                      </button>
                    </form>
                  </>
                ) : order.paymentStatus === 'paid' ? (
                  <>
                    <h2>Formation details</h2>
                    <form className="auth-form" onSubmit={saveDetails}>
                      <label>
                        Proposed company name
                        <input
                          value={details.proposedName}
                          onChange={(e) => setDetails((d) => ({ ...d, proposedName: e.target.value }))}
                          required
                        />
                      </label>
                      <label>
                        Name ending
                        <select
                          value={details.nameEnding}
                          onChange={(e) => setDetails((d) => ({ ...d, nameEnding: e.target.value }))}
                        >
                          <option>Limited</option>
                          <option>Ltd</option>
                          <option>LTD</option>
                        </select>
                      </label>
                      <label>
                        SIC code
                        <input
                          value={details.sicCodes[0] || ''}
                          onChange={(e) =>
                            setDetails((d) => ({ ...d, sicCodes: [e.target.value] }))
                          }
                          placeholder="e.g. 62020"
                        />
                      </label>
                      <label>
                        Director first name
                        <input
                          value={details.directors[0]?.firstName || ''}
                          onChange={(e) =>
                            setDetails((d) => ({
                              ...d,
                              directors: [{ ...d.directors[0], firstName: e.target.value }],
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Director last name
                        <input
                          value={details.directors[0]?.lastName || ''}
                          onChange={(e) =>
                            setDetails((d) => ({
                              ...d,
                              directors: [{ ...d.directors[0], lastName: e.target.value }],
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Shareholder first name
                        <input
                          value={details.shareholders[0]?.firstName || ''}
                          onChange={(e) =>
                            setDetails((d) => ({
                              ...d,
                              shareholders: [{ ...d.shareholders[0], firstName: e.target.value }],
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Shareholder last name
                        <input
                          value={details.shareholders[0]?.lastName || ''}
                          onChange={(e) =>
                            setDetails((d) => ({
                              ...d,
                              shareholders: [{ ...d.shareholders[0], lastName: e.target.value }],
                            }))
                          }
                          required
                        />
                      </label>
                      <label>
                        Number of shares
                        <input
                          type="number"
                          min="1"
                          value={details.statementOfCapital.numberOfShares}
                          onChange={(e) =>
                            setDetails((d) => ({
                              ...d,
                              statementOfCapital: {
                                ...d.statementOfCapital,
                                numberOfShares: Number(e.target.value),
                              },
                              shareholders: [
                                { ...d.shareholders[0], shares: Number(e.target.value) },
                              ],
                            }))
                          }
                        />
                      </label>
                      <button className="btn btn-primary" disabled={busy}>
                        Save formation details
                      </button>
                    </form>

                    <h2>Upload ID documents</h2>
                    <form className="auth-form" onSubmit={uploadIds}>
                      <label>
                        Passport / photo ID (PDF or image)
                        <input
                          type="file"
                          multiple
                          accept=".pdf,image/*"
                          onChange={(e) => setFiles([...e.target.files])}
                        />
                      </label>
                      <button className="btn btn-primary" disabled={busy}>
                        Upload ID
                      </button>
                    </form>
                  </>
                ) : (
                  <p className="portal-lead">Pay this order to unlock formation details and ID upload.</p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
