import React, { useState } from 'react'

export default function Signin({ onClose, onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await onSignup({ name, email, password })
      if (!res || !res.success) {
        setError(res?.message || 'Signup failed')
        setLoading(false)
        return
      }
    } catch (err) {
      setError(String(err.message || err))
    }
    setLoading(false)
  }

  return (
    <div className="fullscreen-panel" role="dialog" aria-modal="true">
      <div className="auth-card">
        <div className="auth-side">
          <h2>Create your account</h2>
          <p>Join Student Wellness Hub to track participation, save resources, and access programs.</p>
        </div>

        <div className="auth-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Create account</h3>
            <div>
              <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
            </div>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label>
              Password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>
            {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
            <div className="form-actions">
              <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
              <button type="button" className="muted" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
