import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

function getUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
  } catch {
    return []
  }
}

function saveUsers(users) {
  fs.mkdirSync(path.dirname(usersFile), { recursive: true })
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password } = req.body || {}
  if (!username?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  const users = getUsers()

  if (users.find(u => u.email === email.toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists' })
  }
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(409).json({ error: 'Username already taken' })
  }

  const newUser = {
    id: Date.now().toString(),
    username: username.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)

  const { passwordHash, ...safeUser } = newUser
  return res.status(201).json({ user: safeUser })
}
