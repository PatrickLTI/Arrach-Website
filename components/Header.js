import Link from 'next/link'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const router = useRouter()
  const { locale, pathname, query } = router
  const t = locale === 'fr' ? fr : en
  const other = locale === 'fr' ? 'en' : 'fr'
  const isActive = (path) => pathname === path
  const { user, logout, loading } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-nav">
          <Link href="/" className="site-title">⟐ Arraches</Link>
          <nav className="site-nav">
            <Link href="/" className={isActive('/') ? 'active' : ''}>{t.nav_home}</Link>
            <Link href="/events" className={isActive('/events') ? 'active' : ''}>{t.nav_events}</Link>
            <Link href="/gallery" className={isActive('/gallery') ? 'active' : ''}>{t.nav_gallery}</Link>
            <Link href="/forum" className={isActive('/forum') ? 'active' : ''}>{t.nav_forum}</Link>
          </nav>
        </div>

        <div className="header-right">
          {!loading && (
            user ? (
              <div className="header-user">
                <span className="header-username">⟐ {user.username}</span>
                <button className="header-auth-btn header-auth-btn--ghost" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="header-auth">
                <Link href="/login" className="header-auth-btn header-auth-btn--ghost">Sign In</Link>
                <Link href="/register" className="header-auth-btn header-auth-btn--primary">Join Guild</Link>
              </div>
            )
          )}
          <Link href={{ pathname, query }} locale={other} className="lang-btn">
            {other.toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  )
}
