import { useState, useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import BlogCard from './components/BlogCard'
import Footer from './components/Footer'
import SearchPalette from './components/SearchPalette'
import { posts as staticPosts, type Post } from './data/posts'
import { getAllPosts } from './services/postService'

const BlogDetail = lazy(() => import('./components/BlogDetail'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Home = lazy(() => import('./components/Home'))
const AdminPanel = lazy(() => import('./components/AdminPanel'))

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'posts' | 'about' | 'contact' | 'admin'>('home')
  const [allPosts, setAllPosts] = useState<Post[]>(staticPosts)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả')
  
  // Load posts dynamically
  useEffect(() => {
    getAllPosts().then(data => {
      setAllPosts(data)
    })
  }, [currentView])

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark'
      if (saved) return saved
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      if (media.matches) return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const selectedPost = allPosts.find((p) => p.id === selectedPostId)

  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!selectedPost) {
      return
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      setScrollProgress(0)
    }
  }, [selectedPost])

  // Lắng nghe phím tắt Cmd+K hoặc Ctrl+K để mở tìm kiếm nhanh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavigate = (view: 'home' | 'posts' | 'about' | 'contact' | 'admin') => {
    setCurrentView(view)
    setSelectedPostId(null)
  }

  const categories = ['Tất cả', ...Array.from(new Set(allPosts.map(p => p.category)))]

  const filteredPosts = activeCategory === 'Tất cả'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  const renderContent = () => {
    const loadingSpinner = (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    )

    if (currentView === 'home') {
      return (
        <Suspense fallback={loadingSpinner}>
          <Home 
            onNavigate={handleNavigate} 
            onSelectPost={(id) => {
              setSelectedPostId(id)
              setCurrentView('posts')
            }} 
          />
        </Suspense>
      )
    }

    if (currentView === 'about') {
      return (
        <Suspense fallback={loadingSpinner}>
          <About />
        </Suspense>
      )
    }

    if (currentView === 'contact') {
      return (
        <Suspense fallback={loadingSpinner}>
          <Contact />
        </Suspense>
      )
    }

    if (currentView === 'admin') {
      return (
        <Suspense fallback={loadingSpinner}>
          <AdminPanel />
        </Suspense>
      )
    }

    // Default 'posts' view containing grid and details
    if (selectedPost) {
      return (
        <Suspense fallback={loadingSpinner}>
          <BlogDetail post={selectedPost} onBack={() => setSelectedPostId(null)} />
        </Suspense>
      )
    }

    return (
      /* Blog Posts Grid */
      <div className="mb-12 space-y-10">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">Bài viết chia sẻ</h2>
          <p className="text-gray-600 dark:text-gray-400">Khám phá các bài viết chuyên sâu về lập trình, công nghệ AI Agents, tối ưu hóa hiệu năng và trải nghiệm phát triển phần mềm thực chiến.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-gray-900">
          {categories.map((cat) => {
            const count = cat === 'Tất cả' ? allPosts.length : allPosts.filter(p => p.category === cat).length
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer border transition-all ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/10'
                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs rounded-full px-1.5 py-0.5 ${
                  active ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} onSelectPost={setSelectedPostId} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 dark:text-gray-500">
            Không có bài viết nào thuộc danh mục này.
          </div>
        )}
      </div>
    )
  }

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col justify-between transition-colors duration-300">
      <div className="w-full">
        <Header 
          currentView={currentView} 
          onNavigate={handleNavigate} 
          theme={theme} 
          onToggleTheme={handleToggleTheme} 
          onSearchOpen={() => setIsSearchOpen(true)}
        />
        
        {selectedPost && (
          <div 
            className="fixed top-16 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        )}
        
        <main className="container mx-auto px-4 py-12 max-w-7xl text-left">
          {renderContent()}
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />

      {/* Global Command Palette Search */}
      <SearchPalette 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPost={(id) => {
          setSelectedPostId(id)
          setCurrentView('posts')
        }}
        posts={allPosts}
      />
    </div>
  )
}

export default App

