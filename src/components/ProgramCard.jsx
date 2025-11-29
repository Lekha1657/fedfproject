import React, { useState, useMemo } from 'react'
import Modal from './Modal'

export default function ProgramCard({ program, user, onJoin, onLeave }) {
  const [open, setOpen] = useState(false)
  const isJoined = useMemo(() => {
    return user?.participation?.some((p) => p.id === program.id) || false
  }, [user, program.id])

  const handleJoin = () => {
    onJoin(program.id)
  }
  const handleLeave = () => {
    onLeave(program.id)
  }

  return (
    <article className="program-card">
      <div className="card-header">
        <h3>{program.title}</h3>
        <span className="badge">{program.category}</span>
      </div>

      <p className="desc">{program.short}</p>

      <div className="card-footer">
        <div className="meta">Participants: <strong>{program.participants}</strong></div>
        <div className="actions">
          <button onClick={() => setOpen(true)} className="outline">Details</button>
          {!isJoined ? (
            <button onClick={handleJoin}>Join</button>
          ) : (
            <button onClick={handleLeave} className="joined-btn" style={{ background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white' }}>Joined ✓</button>
          )}
        </div>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} title={program.title}>
          <p>{program.long}</p>
          <p><strong>Category:</strong> {program.category}</p>
          <p><strong>Duration:</strong> {program.duration}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => { handleJoin(); setOpen(false) }}>Join program</button>
            <button onClick={() => setOpen(false)} className="muted">Close</button>
          </div>
        </Modal>
      )}
    </article>
  )
}
