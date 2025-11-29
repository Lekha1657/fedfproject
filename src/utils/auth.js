// Simple client-side auth utilities.
// NOTE: This is a demo-only approach. Storing credentials on the client is insecure for production.

async function hashPassword(password) {
  const enc = new TextEncoder()
  const data = enc.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

function getUsers() {
  try {
    const raw = localStorage.getItem('swh_users')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  localStorage.setItem('swh_users', JSON.stringify(users))
}

// Save a new user with hashed password. Returns { success, message, user }
async function saveUser({ name, email }, password) {
  if (!email || !password) return { success: false, message: 'Email and password required' }
  const users = getUsers()
  if (users[email]) return { success: false, message: 'An account with that email already exists' }
  const passwordHash = await hashPassword(password)
  const studentId = `S${Date.now().toString().slice(-6)}`
  const user = { name, email, studentId, participation: [], passwordHash }
  users[email] = user
  saveUsers(users)
  return { success: true, message: 'Account created', user }
}

// Verify credentials. Returns { success, message, user }
async function verifyUser(email, password) {
  const users = getUsers()
  const u = users[email]
  if (!u) return { success: false, message: 'No account found for that email' }
  const hash = await hashPassword(password)
  if (hash !== u.passwordHash) return { success: false, message: 'Incorrect password' }
  // return user without passwordHash
  const { passwordHash, ...user } = u
  return { success: true, message: 'Authenticated', user }
}

function getUserByEmail(email) {
  const users = getUsers()
  const u = users[email]
  if (!u) return null
  const { passwordHash, ...user } = u
  return user
}

export { saveUser, verifyUser, getUserByEmail }

// Ensure a default admin exists (demo convenience). Returns created user or existing user.
async function ensureDefaultAdmin(email = 'admin@school.edu', password = 'admin123') {
  const users = getUsers()
  if (users[email]) {
    const { passwordHash, ...user } = users[email]
    return user
  }
  const res = await saveUser({ name: 'Admin', email }, password)
  if (res.success) return res.user
  return null
}

export { ensureDefaultAdmin }
