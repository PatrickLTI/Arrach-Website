import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Profile() {
  const { user, loading, updateUser } = useAuth()
  const router = useRouter()
  const { locale } = router
  const t = locale === 'fr' ? fr : en

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')
  const [saving, setSaving]       = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    if (user) {
      setFirstName(user.firstName || '')
      setLastName(user.lastName   || '')
      setEmail(user.email         || '')
    }
  }, [user, loading, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, firstName, lastName, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t.profile_error_generic)
      updateUser(data.user)
      setSuccess(t.profile_saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) return null

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero hero-compact">
          <h1 className="hero-title">{t.profile_title}</h1>
          <p className="hero-subtitle">{t.profile_subtitle}</p>
        </section>

        <div className="profile-wrap">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="profile-meta">
              <span className="profile-username-display">⟐ {user.username}</span>
              {joinedDate && (
                <span className="profile-joined">{t.member_since} {joinedDate}</span>
              )}
            </div>
          </div>

          <form className="auth-form profile-form" onSubmit={handleSubmit}>
            {error   && <p className="auth-error">{error}</p>}
            {success && <p className="profile-success">{success}</p>}

            <div className="profile-name-row">
              <div className="auth-field">
                <label htmlFor="firstName">{t.label_first_name}</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder={t.label_first_name}
                  maxLength={50}
                  autoComplete="given-name"
                />
              </div>
              <div className="auth-field">
                <label htmlFor="lastName">{t.label_last_name}</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder={t.label_last_name}
                  maxLength={50}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="email">{t.label_email}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={saving}>
              {saving ? t.profile_saving : t.profile_save}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
