import Header from '../components/Header'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import en from '../public/locales/en/common.json'
import fr from '../public/locales/fr/common.json'
import { useAuth } from '../contexts/AuthContext'

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
        { id: 1, author: 'GuildMaster', avatar: 'G', timestamp: '2 days ago', likes: 8,
          content: 'Welcome to our community! This is the official forum for the Arraches Guild. Feel free to introduce yourself, share ideas, and discuss guild matters.' },
        { id: 2, author: 'SteamEngineer', avatar: 'S', timestamp: '1 day ago', likes: 3,
          content: 'Thanks for setting this up! Excited to be here.' },
        { id: 3, author: 'ArcaneScribe', avatar: 'A', timestamp: '1 day ago', likes: 2,
          content: 'Great to have a central place to communicate.' },
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
        { id: 1, author: 'EventPlanner', avatar: 'E', timestamp: '1 day ago', likes: 5,
          content: 'Planning our monthly gathering! Who is interested in attending? We will be meeting at the usual location.' },
        { id: 2, author: 'CogMaster', avatar: 'C', timestamp: '22 hours ago', likes: 1,
          content: 'Count me in! Should I bring anything?' },
        { id: 3, author: 'VortexVoyager', avatar: 'V', timestamp: '18 hours ago', likes: 2,
          content: 'I will be there. Looking forward to it!' },
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
        { id: 1, author: 'StyleExpert', avatar: 'S', timestamp: '3 hours ago', likes: 14,
          content: 'Let us share our favorite steampunk outfit ideas! I just got some amazing brass goggles.' },
        { id: 2, author: 'VintageCollector', avatar: 'V', timestamp: '2 hours ago', likes: 6,
          content: 'Love this thread! Here are my latest finds...' },
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
        { id: 1, author: 'CraftMaster', avatar: 'C', timestamp: 'Yesterday', likes: 9,
          content: 'I am organizing a workshop on advanced gear crafting. Learn techniques from experienced crafters!' },
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
        { id: 1, author: 'NewMember42', avatar: 'N', timestamp: '4 hours ago', likes: 4,
          content: 'Hi everyone! Just joined the guild. I am excited to meet you all and learn more about the Planescape universe!' },
      ],
    },
  ],
  fr: [
    {
      id: 1,
      title: "Bienvenue sur le forum de la Guilde !",
      author: "MaitreGuild",
      category: "general",
      date: "il y a 2 jours",
      replies: 12,
      views: 156,
      badge: "Epingle",
      posts: [
        { id: 1, author: "MaitreGuild", avatar: "M", timestamp: "il y a 2 jours", likes: 8,
          content: "Bienvenue dans notre communaute ! C'est le forum officiel de la Guilde d'Arraches. N'hesitez pas a vous presenter, partager des idees et discuter." },
        { id: 2, author: "IngenieurVapeur", avatar: "I", timestamp: "il y a 1 jour", likes: 3,
          content: "Merci d'avoir mis cela en place ! Je suis ravi d'etre ici." },
        { id: 3, author: "ScribeArcane", avatar: "S", timestamp: "il y a 1 jour", likes: 2,
          content: "C'est super d'avoir un lieu central pour communiquer." },
      ],
    },
    {
      id: 2,
      title: "Prochain rassemblement de la guilde - 15 juin",
      author: "Organisateur",
      category: "events",
      date: "il y a 1 jour",
      replies: 8,
      views: 89,
      posts: [
        { id: 1, author: "Organisateur", avatar: "O", timestamp: "il y a 1 jour", likes: 5,
          content: "Nous preparons notre rassemblement mensuel ! Qui est interesse ? Nous nous retrouverons au lieu habituel." },
        { id: 2, author: "MaitreRouage", avatar: "M", timestamp: "il y a 22 heures", likes: 1,
          content: "Je suis partant ! Dois-je apporter quelque chose ?" },
        { id: 3, author: "VoyageurVortex", avatar: "V", timestamp: "il y a 18 heures", likes: 2,
          content: "Je serai la. J'ai hate !" },
      ],
    },
    {
      id: 3,
      title: "Meilleures idees de mode steampunk",
      author: "Styliste",
      category: "general",
      date: "il y a 3 heures",
      replies: 24,
      views: 312,
      posts: [
        { id: 1, author: "Styliste", avatar: "S", timestamp: "il y a 3 heures", likes: 14,
          content: "Partageons nos idees de tenues steampunk preferees ! Je viens d'obtenir des lunettes en laiton incroyables." },
        { id: 2, author: "CollectionneurVintage", avatar: "C", timestamp: "il y a 2 heures", likes: 6,
          content: "J'adore ce fil ! Voici mes dernieres trouvailles..." },
      ],
    },
    {
      id: 4,
      title: "Atelier : Fabrication avancee de rouages",
      author: "MaitreArtisan",
      category: "tutorials",
      date: "Hier",
      replies: 15,
      views: 203,
      posts: [
        { id: 1, author: "MaitreArtisan", avatar: "A", timestamp: "Hier", likes: 9,
          content: "J'organise un atelier sur la fabrication avancee de rouages. Apprenez des techniques des artisans experimentes !" },
      ],
    },
    {
      id: 5,
      title: "Presentations des membres",
      author: "NouveauMembre42",
      category: "introductions",
      date: "il y a 4 heures",
      replies: 6,
      views: 74,
      posts: [
        { id: 1, author: "NouveauMembre42", avatar: "N", timestamp: "il y a 4 heures", likes: 4,
          content: "Bonjour a tous ! Je viens de rejoindre la guilde. Je suis impatient de vous rencontrer et d'en apprendre plus sur l'univers Planescape !" },
      ],
    },
  ],
}

export default function Forum() {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'fr' ? fr : en
  const { user } = useAuth()

  const [selectedThread, setSelectedThread] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [replyText, setReplyText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [loginPrompt, setLoginPrompt] = useState(false)
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [reportedPosts, setReportedPosts] = useState(new Set())
  const [showNewThread, setShowNewThread] = useState(false)
  const [newThreadTitle, setNewThreadTitle] = useState('')
  const [newThreadContent, setNewThreadContent] = useState('')
  const replyRef = useRef(null)

  const [threads, setThreads] = useState(() =>
    JSON.parse(JSON.stringify(forumData[locale === 'fr' ? 'fr' : 'en']))
  )
  const [currentPage, setCurrentPage] = useState(1)
  const THREADS_PER_PAGE = 10

  // Load persisted threads from localStorage when locale changes
  useEffect(() => {
    const key = `arraches_threads_${locale === 'fr' ? 'fr' : 'en'}`
    try {
      const stored = localStorage.getItem(key)
      setThreads(stored
        ? JSON.parse(stored)
        : JSON.parse(JSON.stringify(forumData[locale === 'fr' ? 'fr' : 'en']))
      )
    } catch {
      setThreads(JSON.parse(JSON.stringify(forumData[locale === 'fr' ? 'fr' : 'en'])))
    }
    setSelectedThread(null)
    setSelectedCategory('general')
    setCurrentPage(1)
    setReplyText('')
    setReplyingTo(null)
    setShowNewThread(false)
  }, [locale])

  // Persist threads to localStorage whenever they change
  useEffect(() => {
    const key = `arraches_threads_${locale === 'fr' ? 'fr' : 'en'}`
    try {
      localStorage.setItem(key, JSON.stringify(threads))
    } catch {}
  }, [threads, locale])

  const categories = [
    { id: 'general', name: t.category_general, icon: '💬' },
    { id: 'events', name: t.category_events, icon: '📅' },
    { id: 'tutorials', name: t.category_tutorials, icon: '📚' },
    { id: 'introductions', name: t.category_introductions, icon: '👋' },
    { id: 'media', name: t.category_media, icon: '📸' },
  ]

  const filteredThreads = threads.filter((thread) => !selectedCategory || thread.category === selectedCategory)
  const totalPages = Math.ceil(filteredThreads.length / THREADS_PER_PAGE)
  const pagedThreads = filteredThreads.slice((currentPage - 1) * THREADS_PER_PAGE, currentPage * THREADS_PER_PAGE)
  const currentThread = selectedThread ? threads.find((thread) => thread.id === selectedThread) : null

  const handleThreadClick = (threadId) => {
    if (!user) {
      setLoginPrompt(true)
      return
    }
    setLoginPrompt(false)
    setReplyText('')
    setReplyingTo(null)
    setThreads(prev => prev.map(thread =>
      thread.id === threadId ? { ...thread, views: thread.views + 1 } : thread
    ))
    setSelectedThread(threadId)
  }

  const handleLike = (threadId, postId) => {
    if (!user) return
    const key = `${threadId}-${postId}`
    const isLiked = likedPosts.has(key)
    setLikedPosts(prev => {
      const next = new Set(prev)
      isLiked ? next.delete(key) : next.add(key)
      return next
    })
    setThreads(prev => prev.map(thread =>
      thread.id === threadId
        ? { ...thread, posts: thread.posts.map(post =>
            post.id === postId
              ? { ...post, likes: (post.likes || 0) + (isLiked ? -1 : 1) }
              : post
          )}
        : thread
    ))
  }

  const handleReplyTo = (author) => {
    if (!user) return
    setReplyingTo(author)
    setReplyText(`@${author} `)
    setTimeout(() => replyRef.current?.focus(), 50)
  }

  const handleReport = (threadId, postId) => {
    if (!user) return
    setReportedPosts(prev => new Set([...prev, `${threadId}-${postId}`]))
  }

  const handleReply = () => {
    if (!user || !replyText.trim() || !currentThread) return
    const newPost = {
      id: currentThread.posts.length + 1,
      author: user.username,
      avatar: user.username[0].toUpperCase(),
      timestamp: t.just_now,
      content: replyText.trim(),
      likes: 0,
    }
    setThreads(prev => prev.map(thread =>
      thread.id === currentThread.id
        ? { ...thread, posts: [...thread.posts, newPost], replies: thread.replies + 1 }
        : thread
    ))
    setReplyText('')
    setReplyingTo(null)
  }

  const handleNewThread = () => {
    if (!user || !newThreadTitle.trim() || !newThreadContent.trim()) return
    const newThread = {
      id: Date.now(),
      title: newThreadTitle.trim(),
      author: user.username,
      category: selectedCategory,
      date: t.just_now,
      replies: 0,
      views: 0,
      posts: [{
        id: 1,
        author: user.username,
        avatar: user.username[0].toUpperCase(),
        timestamp: t.just_now,
        content: newThreadContent.trim(),
        likes: 0,
      }],
    }
    setThreads(prev => [newThread, ...prev])
    setNewThreadTitle('')
    setNewThreadContent('')
    setShowNewThread(false)
    setSelectedThread(newThread.id)
  }

  return (
    <main>
      <Header />
      <div className="container">
        <section className="hero hero-compact">
          <h1>{t.forum_title}</h1>
          <p>{t.forum_description}</p>
        </section>

        {!selectedThread ? (
          <section>
            <div className="forum-container">
              <aside className="forum-sidebar">
                <h4 style={{ marginBottom: '1rem' }}>{t.forum_categories_title}</h4>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`forum-category ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => { setSelectedCategory(cat.id); setShowNewThread(false); setCurrentPage(1) }}
                  >
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{cat.icon}</div>
                    <div style={{ fontWeight: '500' }}>{cat.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {threads.filter((th) => th.category === cat.id).length} {t.topics_label}
                    </div>
                  </div>
                ))}
              </aside>

              <div className="forum-main">
                <div className="forum-list-header">
                  <h2 style={{ margin: 0 }}>{categories.find((c) => c.id === selectedCategory)?.name}</h2>
                  {user && (
                    <button className="forum-new-thread-btn" onClick={() => setShowNewThread(v => !v)}>
                      + {t.forum_new_thread}
                    </button>
                  )}
                </div>

                {loginPrompt && (
                  <div className="forum-login-gate">
                    <p>{t.forum_login_gate_msg}</p>
                    <div className="forum-login-gate-actions">
                      <a href="/login?redirect=/forum" className="header-auth-btn header-auth-btn--primary">{t.sign_in}</a>
                      <a href="/register?redirect=/forum" className="header-auth-btn header-auth-btn--ghost">{t.create_account}</a>
                    </div>
                  </div>
                )}

                {showNewThread && (
                  <div className="forum-new-thread-form">
                    <input
                      className="forum-new-thread-input"
                      placeholder={t.forum_new_thread_title_placeholder}
                      value={newThreadTitle}
                      onChange={e => setNewThreadTitle(e.target.value)}
                      maxLength={120}
                    />
                    <textarea
                      className="forum-reply-textarea"
                      placeholder={t.forum_new_thread_content_placeholder}
                      value={newThreadContent}
                      onChange={e => setNewThreadContent(e.target.value)}
                      rows={5}
                    />
                    <div className="forum-new-thread-actions">
                      <button onClick={handleNewThread} disabled={!newThreadTitle.trim() || !newThreadContent.trim()}>
                        {t.forum_new_thread_submit}
                      </button>
                      <button className="forum-cancel-btn" onClick={() => { setShowNewThread(false); setNewThreadTitle(''); setNewThreadContent('') }}>
                        {t.forum_cancel}
                      </button>
                    </div>
                  </div>
                )}

                <div className="forum-thread-list">
                  {filteredThreads.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>No threads yet. Be the first to post!</p>
                  )}
                  {pagedThreads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`forum-thread${!user ? ' forum-thread--locked' : ''}`}
                      onClick={() => handleThreadClick(thread.id)}
                    >
                      <div className="forum-thread-info">
                        {thread.badge && <span className="forum-badge">{thread.badge}</span>}
                        <div className="forum-thread-title">{thread.title}</div>
                        <div className="forum-thread-meta">
                          {t.forum_started_by} <strong>{thread.author}</strong> • {thread.date}
                        </div>
                      </div>
                      <div className="forum-thread-stats">
                        <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                          <div style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{thread.replies}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.replies_label}</div>
                        </div>
                        <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                          <div style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>{thread.views}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.views_label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="forum-pagination">
                    <button
                      className="forum-page-btn"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      &#8592; Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`forum-page-btn${currentPage === page ? ' forum-page-btn--active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="forum-page-btn"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next &#8594;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (

          <section>
            <button
              className="forum-back-btn"
              onClick={() => { setSelectedThread(null); setReplyText(''); setReplyingTo(null) }}
            >
              {t.forum_back_button}
            </button>
            <h2>{currentThread.title}</h2>
            <div style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
              {t.forum_started_by} <strong>{currentThread.author}</strong> {t.forum_in} {categories.find((c) => c.id === currentThread.category)?.name} • {currentThread.date}
            </div>

            <div style={{ marginBottom: '3rem' }}>
              {currentThread.posts.map((post) => {
                const likeKey = `${currentThread.id}-${post.id}`
                const isLiked = likedPosts.has(likeKey)
                const isReported = reportedPosts.has(likeKey)
                return (
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
                        <button
                          className={`forum-action-btn${isLiked ? ' forum-action-btn--liked' : ''}`}
                          onClick={() => handleLike(currentThread.id, post.id)}
                          disabled={!user}
                          title={user ? '' : t.sign_in}
                        >
                          👍 {t.action_like} {post.likes > 0 && <span className="forum-like-count">{post.likes}</span>}
                        </button>
                        <button
                          className="forum-action-btn"
                          onClick={() => handleReplyTo(post.author)}
                          disabled={!user}
                          title={user ? '' : t.sign_in}
                        >
                          💬 {t.action_reply}
                        </button>
                        <button
                          className={`forum-action-btn${isReported ? ' forum-action-btn--reported' : ''}`}
                          onClick={() => handleReport(currentThread.id, post.id)}
                          disabled={!user || isReported}
                          title={user ? '' : t.sign_in}
                        >
                          {isReported ? `✓ ${t.forum_reported}` : `⚑ ${t.action_report}`}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="forum-reply-form">
              <h4>{t.forum_reply_title}</h4>
              {replyingTo && (
                <div className="forum-replying-to">
                  Replying to <strong>@{replyingTo}</strong>
                  <button className="forum-replying-to-clear" onClick={() => { setReplyingTo(null); setReplyText('') }}>✕</button>
                </div>
              )}
              <textarea
                ref={replyRef}
                className="forum-reply-textarea"
                placeholder={user ? t.forum_reply_placeholder : t.forum_reply_disabled}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={!user}
                rows={4}
              />
              <button onClick={handleReply} disabled={!user || !replyText.trim()}>
                {t.forum_post_button}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
