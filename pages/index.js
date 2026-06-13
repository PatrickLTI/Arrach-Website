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
                <Link href="/gallery" className="hero-button">Browse the gallery</Link>
                <Link href="/events" className="hero-button hero-button-secondary">RSVP to events</Link>
              </div>

              <SlidingGallery />

              <div className="hero-metrics">
                <div className="metric-pill">
                  <span>40</span>
                  <small>storytellers</small>
                </div>
                <div className="metric-pill">
                  <span>5</span>
                  <small>upcoming rituals</small>
                </div>
                <div className="metric-pill">
                  <span>24</span>
                  <small>shared tales</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-features">
          <article className="feature-card">
            <h3>Lantern-lit atmosphere</h3>
            <p>Rich bronze tones, gentle textures, and geometric flourishes create a mood that feels handcrafted and ceremonial.</p>
          </article>
          <article className="feature-card">
            <h3>People at the center</h3>
            <p>Every section is designed to showcase members, gatherings, and shared stories with warmth and authenticity.</p>
          </article>
          <article className="feature-card">
            <h3>Artful gatherings</h3>
            <p>Events and discussions are presented like chapter openings in a guild epic, with elegant detail and cinematic rhythm.</p>
          </article>
        </section>
      </div>
    </main>
  )
}
