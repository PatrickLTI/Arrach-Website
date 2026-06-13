import Header from '../components/Header'
import SlidingGallery from '../components/SlidingGallery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Home() {
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero home-hero">
          <div className="hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">Guild of Arraches</p>
              <h1>{t.title}</h1>
              <p>{t.description}</p>

              <div className="hero-actions">
                <Link href="/gallery" className="hero-button">{t.browse_gallery}</Link>
                <Link href="/events" className="hero-button hero-button-secondary">{t.rsvp_events}</Link>
              </div>

              <SlidingGallery />

              <div className="hero-metrics">
                <div className="metric-pill">
                  <span>40</span>
                  <small>{t.metric_storytellers}</small>
                </div>
                <div className="metric-pill">
                  <span>5</span>
                  <small>{t.metric_rituals}</small>
                </div>
                <div className="metric-pill">
                  <span>24</span>
                  <small>{t.metric_tales}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-features">
          <article className="feature-card">
            <h3>{t.feature1_title}</h3>
            <p>{t.feature1_desc}</p>
          </article>
          <article className="feature-card">
            <h3>{t.feature2_title}</h3>
            <p>{t.feature2_desc}</p>
          </article>
          <article className="feature-card">
            <h3>{t.feature3_title}</h3>
            <p>{t.feature3_desc}</p>
          </article>
        </section>
      </div>
    </main>
  )
}
