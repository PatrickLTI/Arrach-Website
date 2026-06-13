import Header from '../components/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

export default function Home() {
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en

  const miniGallery = [
    '/araches_themes/518316747_10172296279215355_7267452464875341550_n.jpg',
    '/araches_themes/534610882_10162840576913249_3879022634474069298_n.jpg',
    '/araches_themes/534316414_10160971876631525_5170494439516712210_n.jpg',
  ]

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

            <aside className="hero-mosaic">
              <div className="hero-tile hero-tile-large">
                <img src="/araches_themes/516336041_10160711354846525_432269721027865871_n.jpg" alt="Guild portrait" />
                <div className="hero-tile-label">Guild portrait</div>
              </div>

              <div className="hero-tile-grid">
                {miniGallery.map((src, idx) => (
                  <div key={idx} className="hero-tile hero-tile-small">
                    <img src={src} alt={`${t.gallery} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="hero-banner">
            <div className="hero-banner-left">
              <span>⟢</span>
              <p>Warm lantern glow, rhythmic geometry, and portrait-led storytelling for the Arraches community.</p>
            </div>
            <div className="hero-banner-right">
              <h3>Step inside the story hall</h3>
              <p>Discover gatherings, shared tales, and a gentle Arab/Persian mood that makes every event feel alive.</p>
              <Link href="/gallery" className="hero-invite-link">Discover the world</Link>
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

        <section className="home-gallery-section">
          <h2>{t.gallery}</h2>
          <p className="hint">{t.gallery_hint}</p>
          <div className="gallery-grid">
            {[
              '/araches_themes/468670479_10161511107063411_1530073685808394765_n.jpg',
              '/araches_themes/468708157_10161739864190041_5601916982836411369_n.jpg',
              '/araches_themes/471289131_10160912849231526_6845773063911852414_n.jpg',
              '/araches_themes/535024993_10160971877476525_3997946561275890337_n.jpg',
              '/araches_themes/535052851_10160971876531525_2452258456322247001_n.jpg',
              '/araches_themes/535103168_10160971876711525_151330830386645263_n.jpg',
              '/araches_themes/65634677_10155882396071525_355542117226905600_n.jpg',
            ].map((img, idx) => (
              <div key={idx} className="thumb">
                <img src={img} alt={`${t.gallery} ${idx + 1}`} onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22160%22%3E%3Crect fill=%22%23242f3f%22 width=%22240%22 height=%22160%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22 fill=%22%237d8899%22%3EImage Placeholder%3C/text%3E%3C/svg%3E' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
