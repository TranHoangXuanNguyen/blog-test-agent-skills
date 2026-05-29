import { useState, useEffect } from 'react';
import { 
  Lock, Mail, Link, ArrowRight, LogOut, Trash2, 
  CheckCircle, AlertCircle, Loader2, Globe, FileText, Calendar,
  Edit3, Eye, Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { 
  crawlDevToPost, 
  savePostToSupabase, 
  deletePostFromSupabase,
  type CrawledPostData, 
  type Post 
} from '../services/postService';
import MarkdownRenderer from './MarkdownRenderer';

export default function AdminPanel() {
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Crawl & Editor State
  const [devToUrl, setDevToUrl] = useState('');
  const [crawlLoading, setCrawlLoading] = useState(false);
  const [crawlError, setCrawlError] = useState('');
  const [crawledData, setCrawledData] = useState<CrawledPostData | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // DB Posts State
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [dbPostsLoading, setDbPostsLoading] = useState(false);

  // Check current session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
      if (session) {
        fetchDbPosts();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchDbPosts();
      } else {
        setDbPosts([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchDbPosts = async () => {
    setDbPostsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setDbPosts((data || []).map((p: any) => ({
        id: Number(p.id),
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        imageUrl: p.imageUrl,
        category: p.category,
        content: p.content,
        views_count: Number(p.views_count || 0),
        likes_count: Number(p.likes_count || 0),
      })));
    } catch (err: any) {
      console.error('Error fetching DB posts:', err.message);
    } finally {
      setDbPostsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: any) {
      setLoginError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devToUrl.trim()) return;

    setCrawlLoading(true);
    setCrawlError('');
    setCrawledData(null);
    setSaveSuccess(false);

    try {
      const parsedData = await crawlDevToPost(devToUrl);
      setCrawledData(parsedData);
      setActiveTab('edit');
    } catch (err: any) {
      setCrawlError(err.message || 'Crawl bài viết thất bại. Vui lòng kiểm tra lại cấu hình hoặc link.');
    } finally {
      setCrawlLoading(false);
    }
  };

  const handleEditField = (field: keyof CrawledPostData, value: string) => {
    if (!crawledData) return;
    setCrawledData({
      ...crawledData,
      [field]: value
    });
  };

  const handleSaveToDb = async () => {
    if (!crawledData) return;
    setSaveLoading(true);
    setCrawlError('');
    try {
      await savePostToSupabase(crawledData);
      setSaveSuccess(true);
      setCrawledData(null);
      setDevToUrl('');
      fetchDbPosts();
    } catch (err: any) {
      setCrawlError(err.message || 'Không thể lưu bài viết vào cơ sở dữ liệu.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeletePost = async (id: number, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" khỏi Database?`)) {
      return;
    }

    try {
      await deletePostFromSupabase(id);
      setDbPosts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Xóa thất bại: ${err.message}`);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px]">
        <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" size={40} />
        <p className="mt-4 text-gray-500 dark:text-gray-400 font-semibold">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!session) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-3xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom duration-300">
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Đăng nhập Admin</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hãy nhập tài khoản quản trị Supabase để tiếp tục
          </p>
        </div>

        {loginError && (
          <div className="flex items-center gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100/10 p-4 text-xs font-semibold text-rose-600 dark:text-rose-500 mb-6">
            <AlertCircle size={16} />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 dark:text-gray-500" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 dark:text-gray-500" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/10 hover:bg-indigo-700 transition-all cursor-pointer disabled:opacity-50 active:scale-98"
          >
            {loginLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang đăng nhập...
              </>
            ) : (
              <>
                Đăng nhập
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-7xl mx-auto">
      {/* Header Admin Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-850">
        <div className="text-left space-y-1.5">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Trang quản trị Blog</h2>
          <p className="text-gray-500 dark:text-gray-400">Đăng nhập với tư cách: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{session.user.email}</span></p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-850 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer self-start sm:self-center"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>

      {/* Crawl URL Tool Area */}
      <div className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-md text-left space-y-5">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="text-indigo-500" size={18} />
            Crawl từ liên kết bất kỳ (Dev.to, Medium, Website...)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Dán đường dẫn bài viết từ bất kỳ trang blog công nghệ nào. Hệ thống sẽ tự động bóc tách tiêu đề, hình ảnh và chuyển đổi nội dung HTML sang định dạng Markdown chuẩn.
          </p>
        </div>

        {crawlError && (
          <div className="flex items-start gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100/10 p-4 text-xs font-semibold text-rose-600 dark:text-rose-500">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{crawlError}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/10 p-4 text-xs font-semibold text-emerald-600 dark:text-emerald-500">
            <CheckCircle size={16} className="mt-0.5 shrink-0" />
            <span>Đã lưu và tích hợp bài viết mới vào Database thành công!</span>
          </div>
        )}

        <form onSubmit={handleCrawl} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 dark:text-gray-500" size={16} />
            <input
              type="url"
              required
              value={devToUrl}
              onChange={(e) => setDevToUrl(e.target.value)}
              placeholder="https://example.com/blog-post-url-crawl"
              className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={crawlLoading || !devToUrl.trim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-650 dark:bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-550 transition-all cursor-pointer disabled:opacity-50 active:scale-98 whitespace-nowrap"
          >
            {crawlLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang cào dữ liệu...
              </>
            ) : (
              <>
                Phân tích URL (Crawl)
                <Sparkles size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Editor & Live Preview Panel once crawled */}
      {crawledData && (
        <div className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-md text-left space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-850">
            <span className="text-base font-extrabold text-indigo-650 dark:text-indigo-400 flex items-center gap-2">
              <Edit3 size={18} />
              Trình chỉnh sửa & Xem trước bài viết trước khi xuất bản
            </span>

            {/* Mobile/Tablet tab switcher */}
            <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-gray-200/50 dark:border-slate-850 self-start md:self-center">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'edit'
                    ? 'bg-white dark:bg-slate-850 text-indigo-650 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Edit3 size={14} />
                Biên soạn
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-slate-850 text-indigo-650 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Eye size={14} />
                Xem trước nội dung
              </button>
            </div>
          </div>

          {/* Split Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Edit Fields (Visible when activeTab is edit on mobile, always visible on large screen) */}
            <div className={`${activeTab === 'edit' ? 'block' : 'hidden lg:block'} space-y-4`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-2 border-b border-gray-50/50">Thông tin bài viết</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Chuyên mục (Category)</label>
                  <input
                    type="text"
                    value={crawledData.category}
                    onChange={(e) => handleEditField('category', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Thời gian đọc</label>
                  <input
                    type="text"
                    value={crawledData.readTime}
                    onChange={(e) => handleEditField('readTime', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Tiêu đề bài viết</label>
                <input
                  type="text"
                  value={crawledData.title}
                  onChange={(e) => handleEditField('title', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">URL ảnh bìa (Cover Image)</label>
                <input
                  type="text"
                  value={crawledData.imageUrl}
                  onChange={(e) => handleEditField('imageUrl', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Mô tả tóm tắt (Excerpt)</label>
                <textarea
                  value={crawledData.excerpt}
                  onChange={(e) => handleEditField('excerpt', e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nội dung bài viết (Định dạng Markdown)</label>
                <textarea
                  value={crawledData.content}
                  onChange={(e) => handleEditField('content', e.target.value)}
                  rows={12}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-gray-900 dark:text-white font-mono focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all leading-relaxed"
                />
              </div>
            </div>

            {/* Column 2: Live HTML Preview (Visible when activeTab is preview on mobile, always visible on large screen) */}
            <div className={`${activeTab === 'preview' ? 'block' : 'hidden lg:block'} space-y-4`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-2 border-b border-gray-50/50">Xem trước hiển thị</h4>
              
              {/* Cover image preview card */}
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="aspect-[21/9] w-full bg-gray-100 dark:bg-slate-900 overflow-hidden relative border-b border-gray-200/50 dark:border-slate-850">
                  <img
                    src={crawledData.imageUrl}
                    alt={crawledData.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded px-2 py-0.5 text-[9px] font-bold bg-indigo-600 text-white uppercase">
                      {crawledData.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 space-y-3">
                  <h3 className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight">
                    {crawledData.title || 'Tiêu đề trống'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {crawledData.excerpt || 'Mô tả bài viết chưa được cung cấp.'}
                  </p>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Calendar size={12} className="text-indigo-500" />
                    <span>Hôm nay</span>
                    <span className="mx-2">•</span>
                    <span>{crawledData.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Markdown Article Preview */}
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-5 max-h-[360px] overflow-y-auto text-left prose dark:prose-invert max-w-none">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-4 pb-1.5 border-b border-indigo-100/10">Bản xem trước chi tiết bài viết</h5>
                <MarkdownRenderer content={crawledData.content || '*Chưa có nội dung bài viết.*'} />
              </div>
            </div>
          </div>

          {/* Action Button at bottom */}
          <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-850">
            <button
              onClick={handleSaveToDb}
              disabled={saveLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {saveLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Đang xuất bản...
                </>
              ) : (
                <>
                  Xuất bản & Lưu vào DB
                  <CheckCircle size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Database Posts Management List */}
      <div className="bg-white dark:bg-slate-900 border border-gray-150/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-md text-left space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-indigo-500" size={18} />
            Quản lý bài viết động ({dbPosts.length})
          </h3>
          {dbPostsLoading && (
            <Loader2 className="animate-spin text-gray-400" size={18} />
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Dưới đây là các bài viết được lưu trữ trong cơ sở dữ liệu Supabase của bạn. Các bài viết này sẽ tự động hiển thị song song với các bài viết tĩnh bên ngoài trang chủ Blog.
        </p>

        {dbPostsLoading && dbPosts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 dark:text-gray-500">
            Đang tải danh sách bài viết từ DB...
          </div>
        ) : dbPosts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-100 dark:border-slate-800/80 rounded-2xl">
            Chưa có bài viết động nào được lưu trong Database. Hãy dùng công cụ bên trên để cào bài viết mới!
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {dbPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-slate-850 hover:border-gray-200 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950 transition-all group"
              >
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover border border-gray-200/50 dark:border-slate-800"
                />
                <div className="flex-grow min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 uppercase">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-450 dark:text-gray-500 flex items-center gap-1">
                      <Calendar size={10} />
                      {post.date}
                    </span>
                    <span className="text-[10px] text-gray-450 dark:text-gray-500">
                      • {post.views_count || 0} lượt xem
                    </span>
                    <span className="text-[10px] text-gray-450 dark:text-gray-500">
                      • {post.likes_count || 0} lượt thích
                    </span>
                  </div>
                  <h4 className="font-bold text-sm md:text-base text-gray-900 dark:text-white truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id, post.title)}
                  className="self-center p-2 rounded-xl text-gray-450 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                  title="Xóa bài viết"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
