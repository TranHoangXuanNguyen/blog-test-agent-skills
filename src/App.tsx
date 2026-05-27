import Header from './components/Header'
import BlogCard, { mockPosts } from './components/BlogCard'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="w-full">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {/* Blog Posts Grid */}
          <div className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Bài viết mới nhất</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {mockPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App

