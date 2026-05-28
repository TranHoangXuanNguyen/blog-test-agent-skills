/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { Mail } from 'lucide-react';

const Github = ({ size = 20 }: { size?: number }) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = ({ size = 20 }: { size?: number }) => (
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

const Linkedin = ({ size = 20 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Về chúng tôi',
      links: [
        { name: 'Giới thiệu', href: '#' },
        { name: 'Tuyển dụng', href: '#' },
        { name: 'Liên hệ', href: '#' },
        { name: 'Chính sách bảo mật', href: '#' },
      ],
    },
    {
      title: 'Chủ đề nổi bật',
      links: [
        { name: 'Frontend Development', href: '#' },
        { name: 'Backend Services', href: '#' },
        { name: 'DevOps & Cloud', href: '#' },
        { name: 'AI & Machine Learning', href: '#' },
      ],
    },
    {
      title: 'Tài nguyên',
      links: [
        { name: 'Tài liệu hướng dẫn', href: '#' },
        { name: 'Cộng đồng', href: '#' },
        { name: 'Hỏi đáp (Q&A)', href: '#' },
        { name: 'Bản tin tháng', href: '#' },
      ],
    },
  ];

  return (
    <footer className="w-full border-t bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600"></div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MyBlog</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Nơi chia sẻ kiến thức công nghệ, lập trình frontend, backend và những trải nghiệm thực tế trong ngành phát triển phần mềm.
            </p>
            <div className="flex gap-4">
              <a href="#" className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800 transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="max-w-md space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Đăng ký nhận bài viết mới
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhận thông báo về các bài viết công nghệ mới nhất hàng tuần trực tiếp trong hộp thư của bạn.
            </p>
          </div>
          <form className="mt-4 md:mt-0 flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                placeholder="Email của bạn..."
                className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all cursor-pointer"
            >
              Đăng ký
            </button>
          </form>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} MyBlog. Tất cả các quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Chính sách Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
