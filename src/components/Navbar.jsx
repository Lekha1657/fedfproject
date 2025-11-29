import React from 'react'

export default function Navbar({ tabs, current, onChange, dark, setDark, query, setQuery, onOpenLogin, currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand">Student Wellness Hub</div>

      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={"tab" + (current === t ? ' active' : '')}
            onClick={() => onChange(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="controls">
        <input
          aria-label="Search programs"
          className="search"
          placeholder="Search programs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="icon-btn" onClick={() => setDark((d) => !d)} title="Toggle theme">
          {dark ? '🌙' : '☀️'}
        </button>

        {currentUser ? (
          <div className="user-pill">
            <div className="user-avatar">{(currentUser.name || currentUser.email || 'U').slice(0,1).toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{currentUser.name || currentUser.email}</span>
              <button className="muted" onClick={onLogout} style={{ fontSize: 12 }}>Logout</button>
            </div>
          </div>
        ) : (
          <button onClick={onOpenLogin} className="btn">Sign in</button>
        )}
      </div>
    </header>
  )
}
