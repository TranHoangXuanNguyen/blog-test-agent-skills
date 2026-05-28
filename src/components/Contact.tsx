import { useState } from 'react';
import { Mail, Send, CheckCircle2, User, FileText, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      // Simulate API send delay
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1200);
    }
  };

  return (
    <article className="max-w-xl mx-auto bg-white/70 dark:bg-slate-900/40 rounded-3xl border border-gray-150/80 dark:border-slate-800/80 shadow-xl overflow-hidden my-8 p-6 md:p-10 text-left backdrop-blur-md animate-in fade-in duration-300">
      <div className="text-center md:text-left space-y-3.5 mb-8">
        <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100/10 px-3 py-1 text-xs font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">
          Liên hệ
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Gửi lời nhắn
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400">
          Hãy điền vào biểu mẫu bên dưới và tôi sẽ phản hồi lại bạn trong vòng 24 giờ làm việc.
        </p>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in zoom-in-95 duration-400">
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10 animate-bounce">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gửi thành công!</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
            Cảm ơn bạn đã liên hệ. Tôi đã nhận được lời nhắn và sẽ liên lạc lại qua địa chỉ email của bạn trong thời gian sớm nhất.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-905 px-5 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-98"
          >
            Gửi thêm tin nhắn
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wide">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 dark:text-gray-500" />
              <input
                type="text"
                id="name"
                required
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wide">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-455 dark:text-gray-500" />
              <input
                type="email"
                id="email"
                required
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wide">
              Tiêu đề
            </label>
            <div className="relative">
              <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-455 dark:text-gray-500" />
              <input
                type="text"
                id="subject"
                placeholder="Hợp tác công việc, góp ý..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wide">
              Nội dung lời nhắn <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-3.5 top-4 text-gray-455 dark:text-gray-500" />
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Nội dung lời nhắn của bạn gửi tới tôi..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-650 dark:bg-indigo-550 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/10 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all cursor-pointer disabled:opacity-70 active:scale-99"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send size={15} />
            )}
            Gửi liên hệ
          </button>
        </form>
      )}
    </article>
  );
}
