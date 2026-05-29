import { Calendar, Clock, ArrowRight, Eye, Heart } from 'lucide-react';
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
    <article 
      onClick={handleClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100/85 dark:border-slate-850/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm transition-all duration-350 hover:shadow-xl dark:hover:shadow-indigo-950/10 hover:-translate-y-1.5 cursor-pointer glow-border"
    >
      {/* Image Container */}
      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800 relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 text-left">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
            {post.category}
          </span>
        </div>

        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          <a href="#" onClick={handleClick}>{post.title}</a>
        </h3>

        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-slate-800/80 pt-4 text-xs text-gray-400 dark:text-gray-500">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {post.readTime}
            </span>
            {post.views_count !== undefined && post.views_count > 0 ? (
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {post.views_count}
              </span>
            ) : null}
            {post.likes_count !== undefined && post.likes_count > 0 ? (
              <span className="flex items-center gap-1">
                <Heart size={13} className="fill-rose-500/10 text-rose-500" />
                {post.likes_count}
              </span>
            ) : null}
          </div>
          
          <span className="flex items-center gap-1 font-bold text-indigo-650 dark:text-indigo-400 group-hover:text-indigo-755 dark:group-hover:text-indigo-300 transition-colors">
            Đọc tiếp
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
