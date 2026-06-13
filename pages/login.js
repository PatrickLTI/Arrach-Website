import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Login() {
  const { login } = useAuth()
  const router = useRouter()
  const { locale, query } = router
  const t = locale === 'fr' ? fr : en
  const { redirect } = query
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
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
          <h1>{t.login_title}</h1>
          <p>{t.login_subtitle}</p>
        </section>
        <div className="auth-wrap">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}
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
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? t.signing_in : t.sign_in}
            </button>
            <p className="auth-switch">
              {t.no_account}{' '}
              <Link href={redirect ? `/register?redirect=${redirect}` : '/register'}>
                {t.create_account_link}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
