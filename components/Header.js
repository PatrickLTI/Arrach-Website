import Link from 'next/link'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Header() {
  const router = useRouter()
  const { locale, pathname, query } = router
  const t = locale === 'fr' ? fr : en
  const other = locale === 'fr' ? 'en' : 'fr'
  const isActive = (path) => pathname === path

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

        <div className="lang-switch">
          <Link href={{ pathname, query }} locale={other} className="lang-btn">
            {other.toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  )
}
