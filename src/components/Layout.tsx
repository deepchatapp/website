import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Globe, ChevronDown, Menu, X, Sun, Moon, Twitter, MessageCircle, Rss } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import GitHubStars from './GitHubStars.js';

interface LayoutProps {
  children: React.ReactNode;
  lang: 'en' | 'zh';
  setLang: (lang: 'en' | 'zh') => void;
  t: {
    nav: {
      home: string;
      download: string;
      contact: string;
      docs: {
        title: string;
        items: Array<{
          title: string;
          href: string;
        }>;
      };
      demos: string;
    };
  };
}

function NavDropdown({ title, items }: { title: string; items: { title: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 hover:text-indigo-400 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-500/10 hover:text-indigo-400"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const footerTranslations = {
  en: {
    description: 'DeepChat is a multi-platform AI client. We are committed to making AI technology accessible to more people.',
    sections: {
      deepchat: {
        title: 'DeepChat',
        links: [
          { name: 'Github', href: 'https://github.com/thinkinaixyz/deepchat' },
          { name: 'Documentation', href: '/docs/guide' },
          { name: 'Feedback', href: '/docs/faq' },
          { name: 'Contribute', href: 'https://github.com/thinkinaixyz/deepchat' }
        ]
      },
      links: {
        title: 'Links',
        items: [
          { name: 'ThinkInAI Community', href: 'https://thinkinai.xyz' },
          { name: 'AGIA Community', href: 'https://github.com/TGO-AGIA/AGIA' }
        ]
      },
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions, please check the documentation or ask in our community. You can also email us at support@deepchat.ai'
      }
    },
    copyright: 'Copyright © 2024 DeepChat. All rights reserved.',
    icp: '沪ICP备20019669号-4'
  },
  zh: {
    description: 'DeepChat 是一个支持多平台的 AI 客户端，我们致力于让更多人能享受到 AI 带来的便利。',
    sections: {
      deepchat: {
        title: 'DeepChat',
        links: [
          { name: 'Github', href: 'https://github.com/thinkinaixyz/deepchat' },
          { name: '使用文档', href: '/docs/guide' },
          { name: '问题反馈', href: '/docs/faq' },
          { name: '贡献代码', href: 'https://github.com/thinkinaixyz/deepchat' }
        ]
      },
      links: {
        title: '友情链接',
        items: [
          { name: 'ThinkInAI 社区', href: 'https://thinkinai.xyz' },
          { name: 'AGIA 社区', href: 'https://github.com/TGO-AGIA/AGIA' },
          { name: 'DeepSeek资源导航站', href: 'https://www.deepseeklian.com/' }
        ]
      },
      contact: {
        title: '联系我们',
        content: '如果您有使用上的问题可以先查看文档或社群中提问，或邮件联系我们 support@deepchat.ai'
      }
    },
    copyright: '版权所有 © 2024 DeepChat. 保留所有权利。',
    icp: '沪ICP备20019669号-4'
  }
};

function Layout({ children, lang, setLang, t }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const footer = footerTranslations[lang as keyof typeof footerTranslations];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="DeepChat Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">DeepChat</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t.nav.home}
              </Link>
              <Link to="/download" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t.nav.download}
              </Link>
              <Link to="/demos" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t.nav.demos}
              </Link>
              <NavDropdown 
                title={t.nav.docs.title} 
                items={t.nav.docs.items}
              />
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t.nav.contact}
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? '中文' : 'English'}</span>
              </button>
              <a
                href="https://github.com/thinkinaixyz/deepchat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <GitHubStars repo="thinkinaixyz/deepchat" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.home}
              </Link>
              <Link to="/download" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.download}
              </Link>
              <Link to="/demos" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.demos}
              </Link>
              <Link to="/docs/intro" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.docs.title}
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t.nav.contact}
              </Link>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}</span>
              </button>
              <button
                onClick={() => {
                  setLang(lang === 'en' ? 'zh' : 'en');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? '中文' : 'English'}</span>
              </button>
              <a
                href="https://github.com/thinkinaixyz/deepchat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="DeepChat Logo" className="w-8 h-8" />
                <span className="font-semibold">DeepChat</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {footer.description}
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/DeepChatForAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://t.me/deepchatAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="https://github.com/thinkinaixyz/deepchat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Rss className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* DeepChat */}
            <div>
              <h3 className="font-semibold mb-4">{footer.sections.deepchat.title}</h3>
              <ul className="space-y-2">
                {footer.sections.deepchat.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 友情链接 */}
            <div>
              <h3 className="font-semibold mb-4">{footer.sections.links.title}</h3>
              <ul className="space-y-2">
                {footer.sections.links.items.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 联系我们 */}
            <div>
              <h3 className="font-semibold mb-4">{footer.sections.contact.title}</h3>
              <p className="text-sm text-gray-400">
                {footer.sections.contact.content}
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400 mt-8">
            <p>{footer.copyright}</p>
            <p>{footer.icp}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 