import React, { useMemo, useState } from 'react'

export default function AppointmentForm({ sessions, defaultCategory, onBook, onClose, currentUser }) {
  const categories = useMemo(() => Array.from(new Set(sessions.map((s) => s.category))), [sessions])
  const [category, setCategory] = useState(defaultCategory || categories[0] || '')
  const filtered = useMemo(() => sessions.filter((s) => s.category === category), [sessions, category])
  const [serviceId, setServiceId] = useState(filtered[0]?.id || '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [note, setNote] = useState('')

  // update selected service when category changes
  React.useEffect(() => {
    setServiceId(filtered[0]?.id || '')
  }, [category, filtered])

  function submit(e) {
    e.preventDefault()
    if (!currentUser) return alert('Please sign in to book an appointment.')
    if (!serviceId || !date) return alert('Please choose a service and date.')
    const datetime = new Date(`${date}T${time}`)
    const session = sessions.find((s) => s.id === serviceId)
    const appt = {
      id: Date.now().toString(),
      sessionId: serviceId,
      title: session?.title || 'Session',
      provider: session?.provider || 'Provider',
      category,
      userEmail: currentUser.email,
      date: datetime.toISOString(),
      note,
    }
    onBook(appt)
    if (onClose) onClose()
  }

  return (
    <form className="panel appointment-form" onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
      <h3 className="appointment-head">📅 Book Appointment</h3>
      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Service
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
          {filtered.map((s) => (
            <option key={s.id} value={s.id}>{s.title} — {s.provider}</option>
          ))}
        </select>
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <label style={{ flex: 1 }}>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label style={{ width: 120 }}>
          Time
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
      </div>

      <label>
        Note (optional)
        <input value={note} onChange={(e) => setNote(e.target.value)} />
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" className="book-btn">Book appointment</button>
        {onClose && <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>}
      </div>
    </form>
  )
}
