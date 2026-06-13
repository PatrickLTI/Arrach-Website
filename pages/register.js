import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Register() {
  const { register } = useAuth()
  const router = useRouter()
  const { locale, query } = router
  const t = locale === 'fr' ? fr : en
  const { redirect } = query
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError(t.passwords_mismatch)
      return
    }
    setLoading(true)
    try {
      await register(username, email, password)
      router.push(typeof redirect === 'string' ? redirect : '/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero hero-compact">
          <h1>{t.register_title}</h1>
          <p>{t.register_subtitle}</p>
        </section>
        <div className="auth-wrap">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}
            <div className="auth-field">
              <label htmlFor="username">{t.label_username}</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="GuildMember"
                minLength={3}
                maxLength={30}
              />
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
                placeholder="your@email.com"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">{t.label_password}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder={t.password_placeholder}
                minLength={6}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="confirm">{t.label_confirm_password}</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? t.creating_account : t.create_account}
            </button>
            <p className="auth-switch">
              {t.have_account}{' '}
              <Link href={redirect ? `/login?redirect=${redirect}` : '/login'}>
                {t.sign_in}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
