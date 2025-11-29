import React from 'react'

export default function Profile({ user, currentUser, programs, onLeave }) {
  const displayUser = currentUser ? { ...user, name: currentUser.name, email: currentUser.email } : user

  function getTitle(id) {
    const p = programs.find((x) => x.id === id)
    return p ? p.title : 'Unknown program'
  }

  const participation = displayUser.participation || []

  return (
    <section className="panel profile">
      <h2>Profile</h2>
      <div className="profile-grid">
        <div className="card">
          <h3>{displayUser.name}</h3>
          <p><strong>Email:</strong> {displayUser.email}</p>
          <p><strong>Student ID:</strong> {displayUser.studentId || '—'}</p>
        </div>

        <div className="card">
          <h3>Participation History</h3>
          {participation.length === 0 ? (
            <p>No programs joined yet.</p>
          ) : (
            <ul className="history">
              {participation.map((h, i) => (
                <li key={i}>
                  <div>
                    <strong>{getTitle(h.id)}</strong>
                    <div className="muted">{new Date(h.date).toLocaleString()}</div>
                  </div>
                  <button className="muted" onClick={() => onLeave(h.id)}>Leave</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
