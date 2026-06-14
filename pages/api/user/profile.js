import fs from 'fs'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

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
  if (req.method === 'GET') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'User ID required' })

    const user = getUsers().find(u => u.id === id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const { passwordHash, ...safeUser } = user
    return res.status(200).json({ user: safeUser })
  }

  if (req.method === 'PUT') {
    const { id, firstName, lastName, email } = req.body || {}
    if (!id) return res.status(400).json({ error: 'User ID required' })
    if (!email?.trim()) return res.status(400).json({ error: 'Email is required' })

    const users = getUsers()
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) return res.status(404).json({ error: 'User not found' })

    const normalizedEmail = email.toLowerCase().trim()
    const emailTaken = users.some((u, i) => i !== idx && u.email === normalizedEmail)
    if (emailTaken) return res.status(409).json({ error: 'Email already in use' })

    users[idx] = {
      ...users[idx],
      firstName: (firstName || '').trim(),
      lastName: (lastName || '').trim(),
      email: normalizedEmail,
    }

    saveUsers(users)

    const { passwordHash, ...safeUser } = users[idx]
    return res.status(200).json({ user: safeUser })
  }

  return res.status(405).end()
}
