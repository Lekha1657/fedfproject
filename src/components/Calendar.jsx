import React, { useState, useMemo } from 'react'

export default function Calendar({ events, reminders, currentUser, onAddReminder, onRemoveReminder }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showReminderForm, setShowReminderForm] = useState(false)
  const [reminderTitle, setReminderTitle] = useState('')
  const [reminderDate, setReminderDate] = useState('')
  const [reminderTime, setReminderTime] = useState('09:00')
  const [reminderType, setReminderType] = useState('resource')

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Create calendar grid
  const calendarDays = useMemo(() => {
    const days = []
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) days.push(null)
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }, [firstDay, daysInMonth])

  // Filter events and reminders for current user
  const userEvents = useMemo(
    () => events.filter((e) => e.userEmail === currentUser?.email),
    [events, currentUser]
  )

  const userReminders = useMemo(
    () => reminders.filter((r) => r.userEmail === currentUser?.email),
    [reminders, currentUser]
  )

  // Get events/reminders for a specific day
  const getItemsForDay = (day) => {
    if (!day) return { events: [], reminders: [] }
    const date = new Date(year, month, day)
    const dateStr = date.toLocaleDateString('en-CA') // YYYY-MM-DD format

    return {
      events: userEvents.filter((e) => new Date(e.date).toLocaleDateString('en-CA') === dateStr),
      reminders: userReminders.filter((r) => r.date === dateStr),
    }
  }

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  function submitReminder(e) {
    e.preventDefault()
    if (!reminderTitle || !reminderDate) return alert('Please fill in title and date.')
    const reminder = {
      id: Date.now().toString(),
      title: reminderTitle,
      date: reminderDate,
      time: reminderTime,
      type: reminderType,
      userEmail: currentUser?.email,
    }
    onAddReminder(reminder)
    setReminderTitle('')
    setReminderDate('')
    setReminderTime('09:00')
    setReminderType('resource')
    setShowReminderForm(false)
  }

  const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="calendar-panel">
      <div className="calendar-header">
        <h2>{monthName}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="outline" onClick={prevMonth}>← Prev</button>
          <button className="outline" onClick={() => setCurrentMonth(new Date())}>Today</button>
          <button className="outline" onClick={nextMonth}>Next →</button>
          <button className="btn" onClick={() => setShowReminderForm(!showReminderForm)}>+ Reminder</button>
        </div>
      </div>

      {showReminderForm && (
        <form className="panel reminder-form" onSubmit={submitReminder} style={{ display: 'grid', gap: 12, marginBottom: 12 }}>
          <h3>Add Reminder</h3>
          <label>
            Reminder Title
            <input
              type="text"
              placeholder="e.g., Read mental health article"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Date
            <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} required />
          </label>
          <label>
            Time
            <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required />
          </label>
          <label>
            Type
            <select value={reminderType} onChange={(e) => setReminderType(e.target.value)}>
              <option value="resource">Read Resource</option>
              <option value="appointment">Book Appointment</option>
              <option value="program">Join Program</option>
              <option value="other">Other</option>
            </select>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="book-btn">Save Reminder</button>
            <button type="button" className="cancel-btn" onClick={() => setShowReminderForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
        </div>

        <div className="calendar-dates">
          {calendarDays.map((day, idx) => {
            const { events: dayEvents, reminders: dayReminders } = day ? getItemsForDay(day) : { events: [], reminders: [] }
            return (
              <div key={idx} className={`calendar-day ${day ? 'active' : 'inactive'}`}>
                {day && (
                  <>
                    <div className="day-number">{day}</div>
                    <div className="day-content">
                      {dayEvents.map((ev) => (
                        <div key={ev.id} className="calendar-event" title={ev.title}>
                          📅 {ev.title}
                        </div>
                      ))}
                      {dayReminders.map((rem) => (
                        <div key={rem.id} className="calendar-reminder" title={rem.title}>
                          <span>🔔 {rem.title}</span>
                          <button
                            className="remove-btn"
                            onClick={() => onRemoveReminder(rem.id)}
                            style={{ marginLeft: 4, padding: '2px 6px', fontSize: '0.75rem' }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="calendar-summary">
        <h3>Upcoming Events & Reminders</h3>
        {userEvents.length === 0 && userReminders.length === 0 ? (
          <p className="muted">No events or reminders scheduled.</p>
        ) : (
          <ul className="history">
            {[...userEvents, ...userReminders]
              .sort((a, b) => new Date(a.date || a.date) - new Date(b.date || b.date))
              .slice(0, 10)
              .map((item) => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <div>
                    <strong>{item.title}</strong>
                    <div className="muted">
                      {item.date} {item.time ? `at ${item.time}` : new Date(item.date).toLocaleTimeString()}
                    </div>
                  </div>
                  {item.type === 'reminder' || item.time ? (
                    <button
                      className="muted"
                      onClick={() => item.time && onRemoveReminder(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  ) : null}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}
