import crypto from 'crypto'
import supabase from '../../../lib/supabase'

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  const check = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return check === hash
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body || {}
  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .single()

  if (error || !user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    createdAt: user.created_at,
  }

  return res.status(200).json({ user: safeUser })
}
