/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { Post } from '../data/posts';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogDetailProps {
  post: Post;
  onBack: () => void;
}

export default function BlogDetail({ post, onBack }: BlogDetailProps) {
  // Convert date format for Schema (e.g. "28 Th5, 2026" -> "2026-05-28")
  // For a fallback, use "2026-05-28" as standard
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
    <article className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden my-8">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Image Container */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="eager" // Hero image above the fold
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/90 dark:bg-gray-900/90 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-md hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>

        {/* Category Badge on image */}
        <div className="absolute bottom-6 left-6">
          <span className="inline-block rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-8 md:px-12 md:py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-6 mb-8 text-sm text-gray-500 dark:text-gray-400">
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
        </div>

        {/* Markdown Content Section */}
        <section className="prose max-w-none dark:prose-invert">
          <MarkdownRenderer content={post.content} />
        </section>
      </div>
    </article>
  );
}
