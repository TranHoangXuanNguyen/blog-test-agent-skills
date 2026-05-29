/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { ArrowLeft, Calendar, Clock, User, Copy, Check, Eye, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Post } from '../data/posts';
import MarkdownRenderer from './MarkdownRenderer';
import { incrementPostViews, incrementPostLikes } from '../services/postService';
import CommentsSection from './CommentsSection';

interface BlogDetailProps {
  post: Post;
  onBack: () => void;
}

interface TOCItem {
  text: string;
  id: string;
  level: number;
}

const TwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Hàm chuyển đổi tiêu đề thành ID slug liên kết
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function BlogDetail({ post, onBack }: BlogDetailProps) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [localViews, setLocalViews] = useState(post.views_count || 0);

  useEffect(() => {
    // Tự động gọi RPC tăng lượt xem khi truy cập chi tiết
    incrementPostViews(post.id).then(() => {
      setLocalViews(prev => prev + 1);
    });
  }, [post.id]);

  const handleLike = async () => {
    try {
      await incrementPostLikes(post.id);
      setLikes(prev => prev + 1);
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  // Tự động phân tích mục lục bài viết từ content markdown (Derived state during render)
  const lines = post.content.split('\n');
  const toc: TOCItem[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3).trim();
      toc.push({ text, id: slugify(text), level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4).trim();
      toc.push({ text, id: slugify(text), level: 3 });
    }
  });

  // Lắng nghe cuộn trang để active tiêu đề mục lục tương ứng
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    const headers = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
    headers.forEach((header) => observer.observe(header));

    return () => {
      headers.forEach((header) => observer.unobserve(header));
    };
  }, [post.content]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  const schemaDate = "2026-05-28";
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.imageUrl],
    "datePublished": schemaDate,
    "dateModified": schemaDate,
    "description": post.excerpt,
    "author": [
      {
        "@type": "Person",
        "name": "Tran Hoang Xuan Nguyen",
        "url": "#"
      }
    ]
  };

  return (
    <article className="max-w-7xl mx-auto my-4 space-y-8 animate-in fade-in duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Floating back button & header category */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </button>
        <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          {post.category}
        </span>
      </div>

      {/* Banner Cover Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-gray-150/50 dark:border-slate-800/40 bg-gray-100 dark:bg-gray-800 shadow-lg">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main Grid Layout: Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Post Content (Col 1-3) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100/60 dark:border-slate-800/50 shadow-md p-6 md:p-12 text-left">
          
          {/* Metadata Banner */}
          <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 dark:border-slate-800/80 pb-6 mb-8 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <User size={16} className="text-indigo-500" />
              Tran Hoang Xuan Nguyen
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-indigo-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-500" />
              {post.readTime}
            </span>
            {localViews > 0 && (
              <span className="flex items-center gap-2">
                <Eye size={16} className="text-indigo-500" />
                {localViews} lượt xem
              </span>
            )}
            {likes > 0 && (
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-rose-500 fill-rose-500/10" />
                {likes} lượt thích
              </span>
            )}
          </div>

          {/* Render Article content */}
          <section className="prose max-w-none dark:prose-invert">
            <MarkdownRenderer content={post.content} />
          </section>
        </div>

        {/* Comments Section */}
        <CommentsSection postId={post.id} />
      </div>

        {/* Right Column: Floating Sidebar (Col 4) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Table of Contents card */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800/85 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-5 shadow-sm space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-slate-800">
                  Mục lục bài viết
                </h4>
                <nav className="space-y-2.5 text-xs text-left max-h-[300px] overflow-y-auto pr-1">
                  {toc.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScrollTo(item.id)}
                      className={`block w-full text-left font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-0.5 cursor-pointer leading-relaxed ${
                        item.level === 3 ? 'pl-4 border-l border-gray-100 dark:border-slate-800' : ''
                      } ${
                        activeId === item.id 
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold scale-[1.01]' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Share Card */}
            <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800/85 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-5 shadow-sm space-y-4 text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-slate-800">
                Chia sẻ bài viết
              </h4>
              <div className="flex gap-2.5">
                <button
                  onClick={handleCopyLink}
                  className="flex-grow flex items-center justify-center gap-2 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 py-2.5 px-3 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      Đã sao chép!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Sao chép link
                    </>
                  )}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-2.5 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                  aria-label="Share on Twitter"
                >
                  <TwitterIcon size={14} />
                </a>
              </div>
            </div>

            {/* Like & Reaction Card */}
            <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800/85 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-5 shadow-sm space-y-4 text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-slate-800">
                Yêu thích bài viết
              </h4>
              <button
                onClick={handleLike}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200/30 dark:border-rose-900/30 py-3 text-sm font-bold text-rose-600 dark:text-rose-400 hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                <Heart size={16} className="fill-rose-600 text-rose-600 dark:fill-rose-400 dark:text-rose-400 animate-pulse" />
                Thả tim ({likes})
              </button>
            </div>

            {/* Quick Profile Summary in sidebar */}
            <div className="rounded-2xl border border-gray-150/80 dark:border-slate-800/85 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-5 shadow-sm text-left space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
                    alt="Võ Đức Tài"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
                    alt="Lê Kỳ Bá"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sam"
                    alt="Trần Hoàng Xuân Nguyên"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white">Tác giả</h5>
                  <p className="text-[10px] text-gray-400 font-semibold">Tài, Bá, Nguyên</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Đội ngũ kỹ sư đam mê xây dựng web hiện đại, tối ưu SEO và tích hợp AI Agents vào lập trình thực chiến.
              </p>
            </div>

          </div>
        </div>

      </div>
    </article>
  );
}
