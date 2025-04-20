import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, LanguageType } from '../i18n';
import { ChevronDown, Globe } from 'lucide-react';

const languageNames: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
  ja: '日本語',
  ko: '한국어',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ru: 'Русский'
};

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
  ru: '🇷🇺'
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const changeLanguage = (lng: LanguageType) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {languageFlags[i18n.language]} {languageNames[i18n.language]}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang as LanguageType)}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
                i18n.language === lang ? 'bg-gray-50 dark:bg-gray-700/50' : ''
              }`}
            >
              <span className="text-lg">{languageFlags[lang]}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {languageNames[lang]}
              </span>
              {i18n.language === lang && (
                <span className="ml-auto text-primary dark:text-primary-dark">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 