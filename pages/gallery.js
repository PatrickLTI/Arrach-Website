import Header from '../components/Header'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

const sampleImages = [
  '/araches_themes/468017733_10160659041866526_8945567926388894668_n.jpg',
  '/araches_themes/468522081_10169437290585063_7602991082738569899_n.jpg',
  '/araches_themes/468670479_10161511107063411_1530073685808394765_n.jpg',
  '/araches_themes/468708157_10161739864190041_5601916982836411369_n.jpg',
  '/araches_themes/471289131_10160912849231526_6845773063911852414_n.jpg',
  '/araches_themes/516336041_10160711354846525_432269721027865871_n.jpg',
  '/araches_themes/518316747_10172296279215355_7267452464875341550_n.jpg',
  '/araches_themes/534316414_10160971876631525_5170494439516712210_n.jpg',
  '/araches_themes/534610882_10162840576913249_3879022634474069298_n.jpg',
  '/araches_themes/535024993_10160971877476525_3997946561275890337_n.jpg',
  '/araches_themes/535052851_10160971876531525_2452258456322247001_n.jpg',
  '/araches_themes/535103168_10160971876711525_151330830386645263_n.jpg',
  '/araches_themes/536002328_10160971877186525_6806441507963125736_n.jpg',
  '/araches_themes/536006924_10160971876236525_486056554277935757_n.jpg',
  '/araches_themes/54798095_10161424851625063_75592291992993792_n.jpg',
  '/araches_themes/65634677_10155882396071525_355542117226905600_n.jpg',
  '/araches_themes/67912323_10156589428423786_817698332196470784_n.jpg',
]

export default function Gallery() {
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero hero-compact">
          <h1>{t.gallery || 'Gallery'}</h1>
          <p>{t.gallery_subtitle}</p>
        </section>

        <section>
          <h2>{t.gallery_section_title}</h2>
          <p className="hint">{t.gallery_instructions || 'A collection of themed images and member photographs'}</p>
          <div className="gallery-grid">
            {sampleImages.map((src, i) => (
              <div key={i} className="thumb">
                <img src={src} alt={`${t.gallery} ${i + 1}`} onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22160%22%3E%3Crect fill=%22%23242f3f%22 width=%22240%22 height=%22160%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2214%22 fill=%22%237d8899%22%3EImage Placeholder%3C/text%3E%3C/svg%3E' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
