/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { Calendar, Clock, ChevronRight } from 'lucide-react';
import type { Post } from '../data/posts';

interface BlogCardProps {
  post: Post;
  onSelectPost?: (id: number) => void;
}

const BlogCard = ({ post, onSelectPost }: BlogCardProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectPost) {
      onSelectPost(post.id);
    }
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-xl">
      {/* Image Container */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {post.category}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <a href="#" onClick={handleClick}>{post.title}</a>
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
          
          <a href="#" onClick={handleClick} className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700">
            Đọc tiếp
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
