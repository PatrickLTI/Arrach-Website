import crypto from 'crypto'
import supabase from '../../../lib/supabase'

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password } = req.body || {}
  if (!username?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  const normalizedEmail = email.toLowerCase().trim()

  const { data: emailCheck } = await supabase
    .from('users')
    .select('id')
    .eq('email', normalizedEmail)
    .limit(1)

  if (emailCheck && emailCheck.length > 0) {
    return res.status(409).json({ error: 'An account with this email already exists' })
  }

  const { data: usernameCheck } = await supabase
    .from('users')
    .select('id')
    .ilike('username', username.trim())
    .limit(1)

  if (usernameCheck && usernameCheck.length > 0) {
    return res.status(409).json({ error: 'Username already taken' })
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      username: username.trim(),
      email: normalizedEmail,
      password_hash: hashPassword(password),
      first_name: '',
      last_name: '',
    })
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: 'Could not create account' })
  }

  const safeUser = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    createdAt: data.created_at,
  }

  return res.status(201).json({ user: safeUser })
}
