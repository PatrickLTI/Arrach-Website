import supabase from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'User ID required' })

    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, first_name, last_name, created_at')
      .eq('id', id)
      .single()

    if (error || !user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
      },
    })
  }

  if (req.method === 'PUT') {
    const { id, firstName, lastName, email } = req.body || {}
    if (!id) return res.status(400).json({ error: 'User ID required' })
    if (!email?.trim()) return res.status(400).json({ error: 'Email is required' })

    const normalizedEmail = email.toLowerCase().trim()

    const { data: emailCheck } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .neq('id', id)
      .limit(1)

    if (emailCheck && emailCheck.length > 0) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const { data: updated, error } = await supabase
      .from('users')
      .update({
        first_name: (firstName || '').trim(),
        last_name: (lastName || '').trim(),
        email: normalizedEmail,
      })
      .eq('id', id)
      .select('id, username, email, first_name, last_name, created_at')
      .single()

    if (error || !updated) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({
      user: {
        id: updated.id,
        username: updated.username,
        email: updated.email,
        firstName: updated.first_name,
        lastName: updated.last_name,
        createdAt: updated.created_at,
      },
    })
  }

  return res.status(405).end()
}
