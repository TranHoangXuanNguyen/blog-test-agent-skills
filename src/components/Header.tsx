/**
 * Copyright (c) 2026 MyBlog. All rights reserved.
 * Bản quyền thuộc về dự án MyBlog. Vui lòng không sao chép trái phép.
 */

import { useState } from 'react';
import { Menu, Search, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'posts' | 'about' | 'contact';
  onNavigate: (view: 'home' | 'posts' | 'about' | 'contact') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSearchOpen: () => void;
}

const Header = ({ currentView, onNavigate, theme, onToggleTheme, onSearchOpen }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Trang chủ', view: 'home' as const },
    { name: 'Bài viết', view: 'posts' as const },
    { name: 'Về tôi', view: 'about' as const },
    { name: 'Liên hệ', view: 'contact' as const },
  ];

  const handleLinkClick = (e: React.MouseEvent, view: 'home' | 'posts' | 'about' | 'contact') => {
    e.preventDefault();
    onNavigate(view);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md dark:border-gray-900/50 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, 'home')} 
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity group"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">MB</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">MyBlog</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = currentView === link.view;
            return (
              <a
                key={link.name}
                href="#"
                onClick={(e) => handleLinkClick(e, link.view)}
                className={`text-sm font-semibold transition-all relative py-1.5 ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button 
            onClick={onSearchOpen}
            className="rounded-xl p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer relative group"
            aria-label="Search posts"
          >
            <Search size={18} className="group-hover:scale-105 transition-transform" />
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={onToggleTheme}
            className="rounded-xl p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer relative group overflow-hidden"
            aria-label="Toggle theme"
          >
            <div className="transition-transform duration-500 ease-out group-hover:rotate-45">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden rounded-xl p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-4 shadow-lg animate-in slide-in-from-top duration-300 dark:border-gray-900/50">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = currentView === link.view;
              return (
                <a
                  key={link.name}
                  href="#"
                  className={`text-sm font-semibold py-2 px-3 rounded-lg transition-all ${
                    active
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-900/50'
                  }`}
                  onClick={(e) => {
                    handleLinkClick(e, link.view);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
