import React from 'react'

export default function Appointments({ appointments, currentUser, onCancel }) {
  if (!currentUser) {
    return (
      <section className="panel appointments-panel">
        <h2>Appointments</h2>
        <p>Please sign in to view or book appointments.</p>
      </section>
    )
  }

  const my = appointments.filter((a) => a.userEmail === currentUser.email)

  return (
    <section className="panel appointments-panel">
      <h2>Appointments</h2>
      {my.length === 0 ? (
        <p>No appointments booked yet. Use the booking form to add one.</p>
      ) : (
        <ul className="appointments-list">
          {my.map((a) => (
            <li key={a.id} className="appointment-item">
              <div className="appointment-left">
                <div className="appointment-title">{a.title}</div>
                <div className="appointment-meta muted">{a.category} • {new Date(a.date).toLocaleString()}</div>
                {a.note && <div className="appointment-note">{a.note}</div>}
              </div>
              <div className="appointment-actions">
                <button className="cancel-btn" onClick={() => onCancel(a.id)}>Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
