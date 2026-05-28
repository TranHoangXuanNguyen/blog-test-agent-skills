import { ArrowRight, BookOpen, Cpu, Sparkles } from 'lucide-react';
import { posts } from '../data/posts';
import BlogCard from './BlogCard';
import DevDashboard from './DevDashboard';

interface HomeProps {
  onNavigate: (view: 'home' | 'posts' | 'about' | 'contact') => void;
  onSelectPost: (id: number) => void;
}

export default function Home({ onNavigate, onSelectPost }: HomeProps) {
  // Lấy 3 bài viết mới nhất
  const recentPosts = posts.slice(0, 3);

  const handleSelectRecentPost = (id: number) => {
    onSelectPost(id);
    onNavigate('posts');
  };

  return (
    <div className="space-y-24 pb-12 text-left relative">
      {/* Decorative Blur Background Blobs for Page Body */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-indigo-200/25 dark:bg-indigo-900/10 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute top-[50%] right-[2%] w-96 h-96 rounded-full bg-purple-200/20 dark:bg-purple-900/10 blur-3xl pointer-events-none animate-float-delayed"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-100/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md py-16 md:py-24 shadow-xl px-6 md:px-12 transition-all duration-300">
        {/* Decorative Grid inside card */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        {/* Animated Background Blobs Inside Hero Card */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-400/20 dark:from-indigo-950/20 dark:to-purple-950/10 blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-300/10 to-pink-300/20 dark:from-violet-950/10 dark:to-pink-950/10 blur-3xl animate-float-delayed pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3.5 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Sparkles size={14} className="animate-pulse text-indigo-500" />
            <span>Kỷ nguyên lập trình mới cùng AI Agents</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl leading-none">
            Sáng tạo &amp; Lập trình cùng <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">AI Agents</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-650 dark:text-gray-400 leading-relaxed max-w-2xl">
            Chào mừng bạn đến với blog cá nhân của tôi. Nơi chia sẻ các bài viết chuyên sâu về phát triển ứng dụng Web hiện đại (React, TypeScript, Next.js) và các giải pháp đột phá trong tích hợp tác nhân thông minh (Agentic AI, Model Context Protocol) vào quy trình coding hàng ngày.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigate('posts')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer active:scale-98"
            >
              Khám phá bài viết
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-98"
            >
              Tìm hiểu về tôi
            </button>
          </div>
        </div>
      </section>

      {/* Interactive AI Agent Playground Section */}
      <section className="relative z-10">
        <DevDashboard />
      </section>

      {/* Why This Blog Section */}
      <section className="space-y-12 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Tại sao Blog này ra đời?</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sự phát triển vượt bậc của các mô hình ngôn ngữ lớn (LLMs) đang tái định nghĩa lại cách chúng ta viết code. Blog này được xây dựng với mục tiêu bắc cầu nối giữa lập trình truyền thống và lập trình tự động hóa bằng AI.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-100 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-8 space-y-4 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 transition-all duration-300 group hover:-translate-y-1 glow-border">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Kiến thức Web Hiện đại</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Các bài viết chuyên sâu về kỹ thuật tối ưu hóa SEO, tăng tốc hiệu suất ứng dụng Vite/React, cấu trúc thư mục sạch và tư duy viết code bền vững.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-100 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-8 space-y-4 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 transition-all duration-300 group hover:-translate-y-1 glow-border">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tích hợp AI Agents</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Cách áp dụng Model Context Protocol (MCP), viết prompts tối ưu, và lập trình cặp (Pair-Programming) với các AI Agents để nâng cao 300% hiệu suất làm việc.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-gray-100 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm p-8 space-y-4 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/20 transition-all duration-300 group hover:-translate-y-1 glow-border">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Thực chiến &amp; Deploy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Tài liệu hướng dẫn từng bước từ việc khởi tạo dự án thực tế cho đến quy trình đóng gói và deploy tự động qua GitHub Actions và GitHub Pages.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts Preview */}
      <section className="space-y-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Bài viết mới nhất</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Cập nhật những chia sẻ công nghệ mới nhất mỗi ngày</p>
          </div>
          <button
            onClick={() => onNavigate('posts')}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors self-start sm:self-auto cursor-pointer group"
          >
            Xem tất cả bài viết
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onSelectPost={handleSelectRecentPost} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
