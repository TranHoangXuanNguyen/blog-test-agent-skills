/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Post } from '../data/posts';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPost: (id: number) => void;
  posts: Post[];
}

export default function SearchPalette({ isOpen, onClose, onSelectPost, posts }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived state: Tính toán danh sách kết quả trực tiếp khi render (không dùng state và effect đồng bộ)
  const results = (() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(/\s+/);
    return posts.filter((post) => {
      const matchTitle = post.title.toLowerCase();
      const matchExcerpt = post.excerpt.toLowerCase();
      const matchCategory = post.category.toLowerCase();
      const matchContent = post.content.toLowerCase();
      
      return searchTerms.every(term => 
        matchTitle.includes(term) || 
        matchExcerpt.includes(term) || 
        matchCategory.includes(term) ||
        matchContent.includes(term)
      );
    }).slice(0, 5); // Giới hạn 5 kết quả
  })();

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback((postId: number) => {
    onSelectPost(postId);
    handleClose();
  }, [onSelectPost, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, handleClose, handleSelect]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 z-100 flex items-start justify-center bg-gray-950/70 dark:bg-black/80 backdrop-blur-md pt-[10vh] px-4 animate-in fade-in duration-200"
    >
      <div 
        ref={containerRef}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 duration-300"
      >
        {/* Search Input Area */}
        <div className="relative flex items-center border-b border-gray-100 dark:border-slate-800/80 p-4">
          <Search size={22} className="text-gray-400 dark:text-gray-550 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm bài viết (Gõ để bắt đầu...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pr-8 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          <button 
            onClick={handleClose}
            className="absolute right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-gray-205 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
              Nhập từ khóa để tìm kiếm bài viết nhanh chóng...
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
              Không tìm thấy kết quả nào cho "<span className="font-semibold text-gray-600 dark:text-gray-300">{query}</span>"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-500">
                Bài viết tìm thấy ({results.length})
              </div>
              {results.map((post, idx) => {
                const active = idx === selectedIndex;
                return (
                  <div
                    key={post.id}
                    onClick={() => handleSelect(post.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start gap-4 rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                      active 
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100/20 shadow-sm' 
                        : 'border border-transparent'
                    }`}
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-14 w-24 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-slate-800"
                    />
                    <div className="flex-grow space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                          {post.category}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold truncate ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    {active && (
                      <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 self-center animate-in slide-in-from-left duration-200" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/50 px-4 py-3 text-xs text-gray-450">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans font-semibold text-gray-500 shadow-sm">↓↑</kbd> để di chuyển
            </span>
            <span>
              <kbd className="rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans font-semibold text-gray-500 shadow-sm">Enter</kbd> để chọn
            </span>
          </div>
          <span>
            <kbd className="rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.5 font-sans font-semibold text-gray-500 shadow-sm">ESC</kbd> để thoát
          </span>
        </div>
      </div>
    </div>
  );
}
