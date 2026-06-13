import Header from '../components/Header'
import { useRouter } from 'next/router'
import { useState } from 'react'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'
import { useAuth } from '../contexts/AuthContext'

export default function Events() {
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en
  const { user } = useAuth()
  const totalGuildMembers = 40
  const [attendanceState, setAttendanceState] = useState([null, null, null])
  const [openAttendees, setOpenAttendees] = useState(null)

  const upcomingEvents = [
    {
      title: t.event1_title,
      date: t.event1_date,
      description: t.event1_description,
      attendees: ['Amina', 'Jafar', 'Selim', 'Laleh', 'Rashid'],
    },
    {
      title: t.event2_title,
      date: t.event2_date,
      description: t.event2_description,
      attendees: ['Nura', 'Hamid', 'Yara', 'Zayn', 'Omar', 'Rania'],
    },
    {
      title: t.event3_title,
      date: t.event3_date,
      description: t.event3_description,
      attendees: ['Kareem', 'Maya', 'Basil', 'Farah'],
    },
  ]

  const handleAttendance = (index, value) => {
    if (!user) return
    setAttendanceState((prev) => prev.map((item, idx) => (idx === index ? value : item)))
  }

  const getAttendees = (event, index) => {
    const list = [...event.attendees]
    if (user && attendanceState[index] === true) {
      const name = user.username
      if (!list.includes(name)) list.unshift(name)
    }
    return list
  }

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero hero-compact">
          <h1>{t.events_title}</h1>
          <p>{t.events_hint}</p>
        </section>

        <section>
          <h2>{t.events_upcoming_title}</h2>
          <div className="event-grid">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="card">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p>{event.description}</p>

                <div className="attendance-row">
                  <div className="attendance-meta">
                    <strong>{t.attending_label}:</strong>
                    <span>{getAttendees(event, idx).length} / {totalGuildMembers}</span>
                  </div>
                  <div className="attendance-controls">
                    <button
                      className={attendanceState[idx] === true ? 'attendance-btn active' : 'attendance-btn'}
                      onClick={() => handleAttendance(idx, true)}
                      disabled={!user}
                    >
                      {t.attending_yes}
                    </button>
                    <button
                      className={attendanceState[idx] === false ? 'attendance-btn active secondary' : 'attendance-btn secondary'}
                      onClick={() => handleAttendance(idx, false)}
                      disabled={!user}
                    >
                      {t.attending_no}
                    </button>
                  </div>
                </div>

                <div className="event-details-row">
                  <span className="details-count">{getAttendees(event, idx).length} {t.attendee_label}</span>
                  <button
                    className="details-button"
                    onClick={() => setOpenAttendees(openAttendees === idx ? null : idx)}
                  >
                    {openAttendees === idx ? t.hide_attendees : t.show_attendees}
                  </button>
                </div>

                {openAttendees === idx && (
                  <ul className="attendee-list">
                    {getAttendees(event, idx).map((name, nameIdx) => (
                      <li key={nameIdx}>{name}</li>
                    ))}
                  </ul>
                )}

                <p className="attendance-note">{t.attendance_note}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>{t.events_calendar_title}</h2>
          <div className="calendar-placeholder">
            {t.calendar_placeholder || 'Interactive calendar coming soon - stay tuned!'}
          </div>
        </section>
      </div>
    </main>
  )
}
