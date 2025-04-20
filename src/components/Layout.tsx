import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, MessageCircle, Twitter, Github, Rss } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import GitHubStars from './GitHubStars.js';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
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
                {t('nav.home')}
              </Link>
              <Link to="/download" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t('nav.download')}
              </Link>
              <Link to="/demos" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t('nav.demos')}
              </Link>
              <a href="/docs" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t('nav.docs.title')}
              </a>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {t('nav.contact')}
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <LanguageSwitcher />
              <div className="pl-2">
                <GitHubStars />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-slate-800">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  to="/download" 
                  className="block px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.download')}
                </Link>
                <Link 
                  to="/demos" 
                  className="block px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.demos')}
                </Link>
                <a 
                  href="/docs" 
                  target="_blank"
                  className="block px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.docs.title')}
                </a>
                <Link 
                  to="/contact" 
                  className="block px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
                <div className="flex items-center space-x-4 px-4 py-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <LanguageSwitcher />
                </div>
                <div className="px-4">
                  <GitHubStars />
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="DeepChat Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">DeepChat</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/thinkinaixyz/deepchat" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/deepchat_ai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://discord.gg/deepchat" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="https://deepchat.ai/blog/rss.xml" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Rss className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">DeepChat</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/thinkinaixyz/deepchat" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {t('footer.links.github')}
                  </a>
                </li>
                <li>
                  <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {t('footer.links.documentation')}
                  </Link>
                </li>
                <li>
                  <Link to="/docs/faq" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {t('footer.links.feedback')}
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/thinkinaixyz/deepchat" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {t('footer.links.contribute')}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {t('footer.contact.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('footer.contact.description')}
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>{t('footer.rights')}</p>
            <p className="mt-2">
              <a 
                href={t('footer.icp.link')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {t('footer.icp.text')}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 