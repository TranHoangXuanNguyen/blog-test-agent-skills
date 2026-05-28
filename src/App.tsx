import { useState, lazy, Suspense } from 'react'
import Header from './components/Header'
import BlogCard from './components/BlogCard'
import Footer from './components/Footer'
import { posts } from './data/posts'

const BlogDetail = lazy(() => import('./components/BlogDetail'))

function App() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  
  const selectedPost = posts.find((p) => p.id === selectedPostId)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="w-full">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {selectedPost ? (
            <Suspense
              fallback={
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
              }
            >
              <BlogDetail post={selectedPost} onBack={() => setSelectedPostId(null)} />
            </Suspense>
          ) : (
            /* Blog Posts Grid */
            <div className="mb-12">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">Bài viết mới nhất</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} onSelectPost={setSelectedPostId} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App

