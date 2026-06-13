import Header from '../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'

const forumData = {
  en: [
    {
      id: 1,
      title: 'Welcome to the Arraches Guild Forum!',
      author: 'GuildMaster',
      category: 'general',
      date: '2 days ago',
      replies: 12,
      views: 156,
      badge: 'Pinned',
      posts: [
        {
          id: 1,
          author: 'GuildMaster',
          avatar: 'G',
          timestamp: '2 days ago',
          content: 'Welcome to our community! This is the official forum for the Arraches Guild. Feel free to introduce yourself, share ideas, and discuss guild matters.',
        },
        {
          id: 2,
          author: 'SteamEngineer',
          avatar: 'S',
          timestamp: '1 day ago',
          content: 'Thanks for setting this up! Excited to be here.',
        },
        {
          id: 3,
          author: 'ArcaneScribe',
          avatar: 'A',
          timestamp: '1 day ago',
          content: 'Great to have a central place to communicate.',
        },
      ],
    },
    {
      id: 2,
      title: 'Upcoming Guild Gathering - June 15th',
      author: 'EventPlanner',
      category: 'events',
      date: '1 day ago',
      replies: 8,
      views: 89,
      posts: [
        {
          id: 1,
          author: 'EventPlanner',
          avatar: 'E',
          timestamp: '1 day ago',
          content: 'Planning our monthly gathering! Who is interested in attending? We will be meeting at the usual location.',
        },
        {
          id: 2,
          author: 'CogMaster',
          avatar: 'C',
          timestamp: '22 hours ago',
          content: 'Count me in! Should I bring anything?',
        },
        {
          id: 3,
          author: 'VortexVoyager',
          avatar: 'V',
          timestamp: '18 hours ago',
          content: 'I will be there. Looking forward to it!',
        },
      ],
    },
    {
      id: 3,
      title: 'Best Steampunk Fashion Ideas',
      author: 'StyleExpert',
      category: 'general',
      date: '3 hours ago',
      replies: 24,
      views: 312,
      posts: [
        {
          id: 1,
          author: 'StyleExpert',
          avatar: 'S',
          timestamp: '3 hours ago',
          content: 'Let us share our favorite steampunk outfit ideas! I just got some amazing brass goggles.',
        },
        {
          id: 2,
          author: 'VintageCollector',
          avatar: 'V',
          timestamp: '2 hours ago',
          content: 'Love this thread! Here are my latest finds...',
        },
      ],
    },
    {
      id: 4,
      title: 'Workshop: Advanced Gear Crafting',
      author: 'CraftMaster',
      category: 'tutorials',
      date: 'Yesterday',
      replies: 15,
      views: 203,
      posts: [
        {
          id: 1,
          author: 'CraftMaster',
          avatar: 'C',
          timestamp: 'Yesterday',
          content: 'I am organizing a workshop on advanced gear crafting. Learn techniques from experienced crafters!',
        },
      ],
    },
    {
      id: 5,
      title: 'Member Introductions',
      author: 'NewMember42',
      category: 'introductions',
      date: '4 hours ago',
      replies: 6,
      views: 74,
      posts: [
        {
          id: 1,
          author: 'NewMember42',
          avatar: 'N',
          timestamp: '4 hours ago',
          content: 'Hi everyone! Just joined the guild. I am excited to meet you all and learn more about the Planescape universe!',
        },
      ],
    },
  ],
  fr: [
    {
      id: 1,
      title: 'Bienvenue sur le forum de la Guilde !',
      author: 'MaîtreGuild',
      category: 'general',
      date: 'il y a 2 jours',
      replies: 12,
      views: 156,
      badge: 'Épinglé',
      posts: [
        {
          id: 1,
          author: 'MaîtreGuild',
          avatar: 'M',
          timestamp: 'il y a 2 jours',
          content: 'Bienvenue dans notre communauté ! C’est le forum officiel de la Guilde d’Arraches. N’hésitez pas à vous présenter, partager des idées et discuter.',
        },
        {
          id: 2,
          author: 'IngénieurVapeur',
          avatar: 'I',
          timestamp: 'il y a 1 jour',
          content: 'Merci d’avoir mis cela en place ! Je suis ravi d’être ici.',
        },
        {
          id: 3,
          author: 'ScribeArcane',
          avatar: 'S',
          timestamp: 'il y a 1 jour',
          content: 'C’est super d’avoir un lieu central pour communiquer.',
        },
      ],
    },
    {
      id: 2,
      title: 'Prochain rassemblement de la guilde - 15 juin',
      author: 'Organisateur',
      category: 'events',
      date: 'il y a 1 jour',
      replies: 8,
      views: 89,
      posts: [
        {
          id: 1,
          author: 'Organisateur',
          avatar: 'O',
          timestamp: 'il y a 1 jour',
          content: 'Nous préparons notre rassemblement mensuel ! Qui est intéressé ? Nous nous retrouverons au lieu habituel.',
        },
        {
          id: 2,
          author: 'MaîtreRouage',
          avatar: 'M',
          timestamp: 'il y a 22 heures',
          content: 'Je suis partant ! Dois-je apporter quelque chose ?',
        },
        {
          id: 3,
          author: 'VoyageurVortex',
          avatar: 'V',
          timestamp: 'il y a 18 heures',
          content: 'Je serai là. J’ai hâte !',
        },
      ],
    },
    {
      id: 3,
      title: 'Meilleures idées de mode steampunk',
      author: 'Styliste',
      category: 'general',
      date: 'il y a 3 heures',
      replies: 24,
      views: 312,
      posts: [
        {
          id: 1,
          author: 'Styliste',
          avatar: 'S',
          timestamp: 'il y a 3 heures',
          content: 'Partageons nos idées de tenues steampunk préférées ! Je viens d’obtenir des lunettes en laiton incroyables.',
        },
        {
          id: 2,
          author: 'CollectionneurVintage',
          avatar: 'C',
          timestamp: 'il y a 2 heures',
          content: 'J’adore ce fil ! Voici mes dernières trouvailles...',
        },
      ],
    },
    {
      id: 4,
      title: 'Atelier : Fabrication avancée de rouages',
      author: 'MaîtreArtisan',
      category: 'tutorials',
      date: 'Hier',
      replies: 15,
      views: 203,
      posts: [
        {
          id: 1,
          author: 'MaîtreArtisan',
          avatar: 'A',
          timestamp: 'Hier',
          content: 'J’organise un atelier sur la fabrication avancée de rouages. Apprenez des techniques des artisans expérimentés !',
        },
      ],
    },
    {
      id: 5,
      title: 'Présentations des membres',
      author: 'NouveauMembre42',
      category: 'introductions',
      date: 'il y a 4 heures',
      replies: 6,
      views: 74,
      posts: [
        {
          id: 1,
          author: 'NouveauMembre42',
          avatar: 'N',
          timestamp: 'il y a 4 heures',
          content: 'Bonjour à tous ! Je viens de rejoindre la guilde. Je suis impatient de vous rencontrer et d’en apprendre plus sur l’univers Planescape !',
        },
      ],
    },
  ],
}

export default function Forum() {
  const { locale } = useRouter()
  const t = locale === 'fr' ? fr : en
  const [selectedThread, setSelectedThread] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [replyText, setReplyText] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const initialThreads = useMemo(
    () => JSON.parse(JSON.stringify(forumData[locale === 'fr' ? 'fr' : 'en'])),
    [locale]
  )
  const [threads, setThreads] = useState(initialThreads)

  useEffect(() => {
    setThreads(initialThreads)
    setSelectedThread(null)
    setSelectedCategory('general')
    setReplyText('')
  }, [initialThreads])

  const categories = [
    { id: 'general', name: t.category_general, icon: '💬' },
    { id: 'events', name: t.category_events, icon: '📅' },
    { id: 'tutorials', name: t.category_tutorials, icon: '📚' },
    { id: 'introductions', name: t.category_introductions, icon: '👋' },
    { id: 'media', name: t.category_media, icon: '📸' },
  ]

  const filteredThreads = threads.filter((thread) => !selectedCategory || thread.category === selectedCategory)
  const currentThread = selectedThread ? threads.find((thread) => thread.id === selectedThread) : null

  const handleReply = () => {
    if (!loggedIn || !replyText.trim() || !currentThread) return

    const newPost = {
      id: currentThread.posts.length + 1,
      author: locale === 'fr' ? 'Vous' : 'You',
      avatar: 'U',
      timestamp: locale === 'fr' ? 'à l’instant' : 'just now',
      content: replyText,
    }

    setThreads(
      threads.map((thread) =>
        thread.id === currentThread.id
          ? { ...thread, posts: [...thread.posts, newPost], replies: thread.replies + 1 }
          : thread
      )
    )
    setReplyText('')
  }

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero">
          <h1>{t.forum_title}</h1>
          <p>{t.forum_description}</p>
        </section>

        {!selectedThread ? (
          <section>
            <div className="forum-container">
              <aside className="forum-sidebar">
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem' }}>{t.forum_categories_title}</h4>
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`forum-category ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{cat.icon}</div>
                    <div style={{ fontWeight: '500' }}>{cat.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {threads.filter((thread) => thread.category === cat.id).length} {t.topics_label}
                    </div>
                  </div>
                ))}
              </aside>

              <div>
                <h2>{categories.find((cat) => cat.id === selectedCategory)?.name}</h2>
                <div className="forum-thread-list">
                  {filteredThreads.map((thread) => (
                    <div key={thread.id} className="forum-thread" onClick={() => setSelectedThread(thread.id)}>
                      <div className="forum-thread-info">
                        {thread.badge && <span className="forum-badge">{thread.badge}</span>}
                        <div className="forum-thread-title">{thread.title}</div>
                        <div className="forum-thread-meta">
                          {t.forum_started_by} <strong>{thread.author}</strong> • {thread.date}
                        </div>
                      </div>
                      <div className="forum-thread-stats">
                        <div style={{ fontSize: '0.9rem' }}>
                          <div style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{thread.replies}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.replies_label}</div>
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>
                          <div style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>{thread.views}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.views_label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <button
              onClick={() => setSelectedThread(null)}
              style={{ marginBottom: '2rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {t.forum_back_button}
            </button>
            <h2>{currentThread.title}</h2>
            <div style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {t.forum_started_by} <strong>{currentThread.author}</strong> {locale === 'fr' ? 'dans' : 'in'} {categories.find((cat) => cat.id === currentThread.category)?.name} • {currentThread.date}
            </div>

            <div style={{ marginBottom: '3rem' }}>
              {currentThread.posts.map((post) => (
                <div key={post.id} className="forum-post">
                  <div className="forum-post-avatar">{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div className="forum-post-header">
                      <div className="forum-post-user">
                        <div className="forum-post-username">{post.author}</div>
                        <div className="forum-post-timestamp">{post.timestamp}</div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.forum_member_label}</div>
                    </div>
                    <div className="forum-post-content">{post.content}</div>
                    <div className="forum-post-actions">
                      <span className="forum-post-action">👍 {locale === 'fr' ? 'J’aime' : 'Like'}</span>
                      <span className="forum-post-action">💬 {locale === 'fr' ? 'Répondre' : 'Reply'}</span>
                      <span className="forum-post-action">⚙️ {locale === 'fr' ? 'Signaler' : 'Report'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="forum-login-banner">
              <p>{loggedIn ? t.forum_logged_in_message : t.forum_login_prompt}</p>
              <button onClick={() => setLoggedIn((prev) => !prev)} className="login-toggle-btn">
                {loggedIn ? t.logout_button : t.login_button}
              </button>
            </div>

            <div className="forum-reply-form">
              <h4>{t.forum_reply_title}</h4>
              <textarea
                className="forum-reply-textarea"
                placeholder={t.forum_reply_placeholder}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={!loggedIn}
              />
              <button onClick={handleReply} disabled={!loggedIn}>{loggedIn ? t.forum_post_button : t.login_button}</button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
