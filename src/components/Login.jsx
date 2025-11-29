import React, { useState } from 'react'

export default function Login({ onClose, onLogin, openSignin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await onLogin({ email, password })
      if (!res || !res.success) {
        setError(res?.message || 'Login failed')
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
          <h2>Welcome back</h2>
          <p>Access mental health resources, fitness programs and nutrition advice for students.</p>
          <p style={{ opacity: 0.9 }}>Sign in to view your profile, participate in programs, or manage resources (admins).</p>
        </div>

        <div className="auth-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Sign in</h3>
            <div>
              <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
            </div>
          </div>

          <form onSubmit={submit} className="auth-form">
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
              <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
              <button type="button" className="muted" onClick={onClose}>Cancel</button>
            </div>
          </form>

          <div className="auth-bottom">
            <span>New here?</span>
            <button className="link" onClick={() => openSignin()}>Create account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
