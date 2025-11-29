import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import Signin from './components/Signin'
import AppointmentForm from './components/AppointmentForm'
import AppointmentsComp from './components/Appointments'
import Calendar from './components/Calendar'
import { saveUser as saveUserToStore, verifyUser, ensureDefaultAdmin } from './utils/auth'
import { initialPrograms, initialUser, initialSessions } from './data/mockData'

const TABS = ['Home', 'Calendar', 'Appointments', 'Profile', 'Admin']

function App() {
  const [tab, setTab] = useState('Home')
  const [showLogin, setShowLogin] = useState(false)
  const [showSignin, setShowSignin] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem('swh_current_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [programs, setPrograms] = useState(() => {
    // load from localStorage if present
    try {
      const raw = localStorage.getItem('swh_programs')
      return raw ? JSON.parse(raw) : initialPrograms
    } catch {
      return initialPrograms
    }
  })

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('swh_user')
      return raw ? JSON.parse(raw) : initialUser
    } catch {
      return initialUser
    }
  })

  const [sessions, setSessions] = useState(() => initialSessions)

  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(() => {
    const val = localStorage.getItem('swh_dark')
    return val ? JSON.parse(val) : false
  })
  const [calendarEvents, setCalendarEvents] = useState(() => {
    try {
      const raw = localStorage.getItem('swh_calendar')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [appointments, setAppointments] = useState(() => {
    try {
      const raw = localStorage.getItem('swh_appointments')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [reminders, setReminders] = useState(() => {
    try {
      const raw = localStorage.getItem('swh_reminders')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('swh_programs', JSON.stringify(programs))
  }, [programs])

  useEffect(() => {
    localStorage.setItem('swh_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('swh_current_user', JSON.stringify(currentUser))
  }, [currentUser])

  // Ensure a default admin exists (demo) and show login on first load if not signed in
  useEffect(() => {
    ensureDefaultAdmin('admin@school.edu', 'admin123')
    if (!currentUser) setShowLogin(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('swh_dark', JSON.stringify(dark))
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    localStorage.setItem('swh_calendar', JSON.stringify(calendarEvents))
  }, [calendarEvents])

  useEffect(() => {
    localStorage.setItem('swh_appointments', JSON.stringify(appointments))
  }, [appointments])

  useEffect(() => {
    localStorage.setItem('swh_reminders', JSON.stringify(reminders))
  }, [reminders])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return programs
    return programs.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }, [programs, query])

  function joinProgram(programId) {
    setPrograms((prev) =>
      prev.map((p) => (p.id === programId ? { ...p, participants: p.participants + 1 } : p))
    )
    const eventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // default next week
    setUser((u) => ({ ...u, participation: [...u.participation, { id: programId, date: eventDate }] }))
    // add calendar event tied to current user (if signed in)
    setCalendarEvents((ev) => [
      { id: Date.now().toString(), programId, title: programs.find((p) => p.id === programId)?.title || 'Program', date: eventDate, userEmail: currentUser?.email || null },
      ...ev,
    ])
  }

  function leaveProgram(programId) {
    setPrograms((prev) => prev.map((p) => (p.id === programId ? { ...p, participants: Math.max(0, p.participants - 1) } : p)))
    setUser((u) => ({ ...u, participation: u.participation.filter((x) => x.id !== programId) }))
    // remove calendar events for this program for current user
    setCalendarEvents((ev) => ev.filter((e) => !(e.programId === programId && (!currentUser || e.userEmail === currentUser.email))))
  }

  function bookAppointment(appt) {
    setAppointments((s) => [appt, ...s])
    // also add to calendarEvents for visibility
    setCalendarEvents((ev) => [{ id: Date.now().toString(), programId: appt.programId, title: appt.title, date: appt.date, userEmail: appt.userEmail }, ...ev])
  }

  function cancelAppointment(apptId) {
    const appt = appointments.find((a) => a.id === apptId)
    setAppointments((s) => s.filter((a) => a.id !== apptId))
    if (appt) {
      setCalendarEvents((ev) => ev.filter((e) => !(e.programId === appt.programId && e.date === appt.date && e.userEmail === appt.userEmail)))
    }
  }

  function addProgram(program) {
    setPrograms((prev) => [{ ...program, id: Date.now().toString(), participants: 0 }, ...prev])
  }

  function updateProgram(id, updates) {
    setPrograms((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  function deleteProgram(id) {
    setPrograms((prev) => prev.filter((p) => p.id !== id))
  }

  function addReminder(reminder) {
    setReminders((prev) => [reminder, ...prev])
  }

  function removeReminder(reminderId) {
    setReminders((prev) => prev.filter((r) => r.id !== reminderId))
  }

  function handleOpenLogin() {
    setShowLogin(true)
  }

  async function handleLogin({ email, password }) {
    // verify credentials using local user store
    const res = await verifyUser(email, password)
    if (!res.success) {
      return res
    }

    const userObj = res.user
    setCurrentUser(userObj)
    setShowLogin(false)

    // sync profile view user
    setUser((u) => ({ ...u, name: userObj.name, email: userObj.email, studentId: userObj.studentId, participation: userObj.participation || [] }))

    if (email === 'admin@school.edu') {
      setTab('Admin')
    } else if (email.endsWith('@student.edu')) {
      setTab('Profile')
    } else {
      setTab('Home')
    }

    return { success: true }
  }

  async function handleSignup({ name, email, password }) {
    const res = await saveUserToStore({ name, email }, password)
    if (!res.success) return res

    const userObj = res.user
    setCurrentUser(userObj)
    setShowSignin(false)
    setTab('Profile')

    setUser({ name: userObj.name, email: userObj.email, studentId: userObj.studentId, participation: [] })
    return { success: true }
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  const visibleTabs = TABS.filter((t) => t !== 'Admin' || (currentUser && currentUser.email === 'admin@school.edu'))

  return (
    <div className="app-root">
      <Navbar
        tabs={visibleTabs}
        current={tab}
        onChange={setTab}
        dark={dark}
        setDark={setDark}
        query={query}
        setQuery={setQuery}
        onOpenLogin={handleOpenLogin}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="container">
        {tab === 'Home' && (
          <Home programs={filtered} user={user} onJoin={joinProgram} onLeave={leaveProgram} query={query} setQuery={setQuery} />
        )}

        {tab === 'Profile' && <Profile user={user} currentUser={currentUser} programs={programs} onLeave={leaveProgram} />}

        {tab === 'Admin' && (
          currentUser && currentUser.email === 'admin@school.edu' ? (
            <AdminDashboard
              programs={programs}
              addProgram={addProgram}
              updateProgram={updateProgram}
              deleteProgram={deleteProgram}
            />
          ) : (
            <section className="panel">
              <h2>Access denied</h2>
              <p>This section is for administrators only. Please sign in with admin credentials.</p>
            </section>
          )
        )}

        {tab === 'Calendar' && (
          <Calendar
            events={calendarEvents}
            reminders={reminders}
            currentUser={currentUser}
            onAddReminder={addReminder}
            onRemoveReminder={removeReminder}
          />
        )}

        {tab === 'Appointments' && (
          <div style={{ display: 'grid', gap: 12 }}>
            <AppointmentForm sessions={sessions} onBook={bookAppointment} currentUser={currentUser} />
            <AppointmentsComp appointments={appointments} currentUser={currentUser} onCancel={cancelAppointment} />
          </div>
        )}
        </main>

        {showLogin && (
          <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} openSignin={() => { setShowLogin(false); setShowSignin(true) }} />
        )}

        {showSignin && (
          <Signin onClose={() => setShowSignin(false)} onSignup={handleSignup} />
        )}
      </div>
    )
  }

  export default App
