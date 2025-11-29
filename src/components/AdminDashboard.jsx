import React, { useState } from 'react'
import Modal from './Modal'

export default function AdminDashboard({ programs, addProgram, updateProgram, deleteProgram }) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', short: '', long: '', category: '', duration: '' })

  function openAdd() {
    setEditing(null)
    setForm({ title: '', short: '', long: '', category: '', duration: '' })
    setOpen(true)
  }

  function openEdit(p) {
    setEditing(p.id)
    setForm({ title: p.title, short: p.short, long: p.long, category: p.category, duration: p.duration })
    setOpen(true)
  }

  function submit(e) {
    e.preventDefault()
    if (editing) {
      updateProgram(editing, form)
    } else {
      addProgram(form)
    }
    setOpen(false)
  }

  return (
    <section className="panel admin">
      <div className="admin-head">
        <h2>Admin Dashboard</h2>
        <div>
          <button onClick={openAdd}>Add Program</button>
        </div>
      </div>

      <div className="program-list">
        {programs.map((p) => (
          <div key={p.id} className="program-row">
            <div>
              <strong>{p.title}</strong>
              <div className="muted">{p.category} • {p.duration}</div>
            </div>
            <div className="row-actions">
              <button className="outline" onClick={() => openEdit(p)}>Edit</button>
              <button className="muted" onClick={() => deleteProgram(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? 'Edit Program' : 'Add Program'} onClose={() => setOpen(false)}>
          <form onSubmit={submit} className="admin-form">
            <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label>Short description<input required value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} /></label>
            <label>Long description<textarea required value={form.long} onChange={(e) => setForm({ ...form, long: e.target.value })} /></label>
            <label>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Duration<input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></label>
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" className="muted" onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  )
}
