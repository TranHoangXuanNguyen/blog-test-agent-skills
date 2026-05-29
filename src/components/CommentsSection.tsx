/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { useState, useEffect } from 'react';
import { 
  MessageSquare, User, Send, Trash2, Loader2, AlertCircle, Calendar 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { 
  getCommentsForPost, 
  insertComment, 
  deleteComment, 
  type BlogComment 
} from '../services/postService';

interface CommentsSectionProps {
  postId: number;
  className?: string;
}

const PRESET_AVATARS = [
  { name: 'Mèo', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix' },
  { name: 'Cún', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Buddy' },
  { name: 'Cáo', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Buster' },
  { name: 'Gấu', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lily' },
  { name: 'Khỉ', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Milo' },
  { name: 'Thỏ', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy' },
];

export default function CommentsSection({ postId, className = '' }: CommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form input states (Prepopulate from localStorage if exists)
  const [authorName, setAuthorName] = useState(() => {
    return localStorage.getItem('comment_author_name') || '';
  });
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('comment_author_avatar') || PRESET_AVATARS[0].url;
  });
  const [content, setContent] = useState('');
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin session and fetch comments
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError('');
      try {
        // 1. Check if admin
        const { data: { session } } = await supabase.auth.getSession();
        setIsAdmin(!!session);

        // 2. Fetch comments
        const list = await getCommentsForPost(postId);
        setComments(list);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bình luận.');
      } finally {
        setLoading(false);
      }
    };

    init();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setSubmitLoading(true);
    setError('');

    try {
      const newComment = await insertComment(postId, authorName.trim(), selectedAvatar, content.trim());
      setComments(prev => [...prev, newComment]);
      setContent('');

      // Save user info to localStorage
      localStorage.setItem('comment_author_name', authorName.trim());
      localStorage.setItem('comment_author_avatar', selectedAvatar);
    } catch (err: any) {
      setError(err.message || 'Không thể gửi bình luận.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err: any) {
      alert(`Lỗi khi xóa bình luận: ${err.message}`);
    }
  };

  const formatCommentDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      // Trả về định dạng thời gian Việt Nam (Ví dụ: 14:32, 29/05/2026)
      return `${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}, ${date.toLocaleDateString('vi-VN')}`;
    } catch (e) {
      return 'Vừa xong';
    }
  };

  return (
    <div className={`space-y-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 p-6 md:p-8 rounded-3xl shadow-sm ${className}`}>
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-gray-55/60 dark:border-slate-800/80 pb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="text-indigo-500" size={20} />
          Bình luận ({comments.length})
        </h3>
        {isAdmin && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100/10">
            Chế độ Admin
          </span>
        )}
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100/10 p-4 text-xs font-semibold text-rose-600 dark:text-rose-500">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin text-indigo-500" size={24} />
            <span className="text-xs mt-2 font-medium">Đang tải bình luận...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ nhé!
          </div>
        ) : (
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className="flex gap-4 p-4 rounded-2xl border border-gray-50 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-950/20 text-left hover:bg-slate-50/80 dark:hover:bg-slate-950/40 transition-all group"
              >
                {/* Avatar */}
                <img 
                  src={comment.author_avatar} 
                  alt={comment.author_name} 
                  className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/10 object-cover"
                />
                
                {/* Content Area */}
                <div className="flex-grow space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white truncate">
                      {comment.author_name}
                    </h4>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 shrink-0 font-medium">
                      <Calendar size={10} />
                      {formatCommentDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words">
                    {comment.content}
                  </p>
                </div>

                {/* Admin delete button */}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="self-start p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Xóa bình luận này"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Comment Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-100 dark:border-slate-800/80 pt-6 space-y-5 text-left">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Viết bình luận của bạn</h4>
        
        {/* Author details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tên của bạn</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                maxLength={50}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2.5 pl-9 pr-4 text-xs md:text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Chọn Avatar hoạt hình</label>
            <div className="flex gap-2 items-center flex-wrap">
              {PRESET_AVATARS.map((avatar) => {
                const isSelected = selectedAvatar === avatar.url;
                return (
                  <button
                    key={avatar.name}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.url)}
                    className={`h-9 w-9 rounded-full overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                      isSelected ? 'border-indigo-500 bg-indigo-50/50' : 'border-transparent bg-slate-50 dark:bg-slate-950'
                    }`}
                    title={avatar.name}
                  >
                    <img src={avatar.url} alt={avatar.name} className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comment textarea */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nội dung</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chia sẻ ý kiến của bạn về bài viết này..."
            rows={4}
            maxLength={1000}
            className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-xs md:text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all leading-relaxed"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitLoading || !authorName.trim() || !content.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {submitLoading ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Đang gửi...
              </>
            ) : (
              <>
                Gửi bình luận
                <Send size={14} />
              </>
            )}
          </button>
        </div>
      </form>
      
    </div>
  );
}
