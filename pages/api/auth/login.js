import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  const check = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return check === hash
}

function getUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'))
  } catch {
    return []
  }
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body || {}
  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const users = getUsers()
  const user = users.find(u => u.email === email.toLowerCase().trim())

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const { passwordHash, ...safeUser } = user
  return res.status(200).json({ user: safeUser })
}
