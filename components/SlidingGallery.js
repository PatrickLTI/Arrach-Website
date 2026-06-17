import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

const slides = [
  { src: '/araches_themes/518316747_10172296279215355_7267452464875341550_n.jpg', event: 'Lantern Night Gathering' },
  { src: '/araches_themes/534610882_10162840576913249_3879022634474069298_n.jpg', event: 'Autumn Feast of Tales' },
  { src: '/araches_themes/471289131_10160912849231526_6845773063911852414_n.jpg', event: 'The Grand Portrait Session' },
  { src: '/araches_themes/468670479_10161511107063411_1530073685808394765_n.jpg', event: 'Midsummer Guild Ceremony' },
  { src: '/araches_themes/536002328_10160971877186525_6806441507963125736_n.jpg', event: 'Winter Storytelling Evening' },
]

export default function SlidingGallery() {
  const [current, setCurrent] = useState(0)
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="sliding-gallery">
      <div className="sliding-gallery-frame">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.event}
            className={`sliding-gallery-img${i === current ? ' sg-active' : ''}`}
          />
        ))}
        <div className="sliding-gallery-overlay">
          <p className="sliding-gallery-eyebrow">{t.from_archives}</p>
          <h3 className="sliding-gallery-event">{slide.event}</h3>
        </div>
        <button
          className="sg-arrow sg-arrow-left"
          onClick={() => setCurrent(i => (i - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="sg-arrow sg-arrow-right"
          onClick={() => setCurrent(i => (i + 1) % slides.length)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  )
}
