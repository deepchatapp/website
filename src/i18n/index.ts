import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译资源
import en from './locales/en.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import ru from './locales/ru.json';

// 支持的语言
export type LanguageType = 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'es' | 'fr' | 'it' | 'ru';
export const supportedLanguages: LanguageType[] = ['en', 'zh', 'ja', 'ko', 'de', 'es', 'fr', 'it', 'ru'];

// 初始化i18n
i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化
  .init({
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      },
      ja: {
        translation: ja
      },
      ko: {
        translation: ko
      },
      de: {
        translation: de
      },
      es: {
        translation: es
      },
      fr: {
        translation: fr
      },
      it: {
        translation: it
      },
      ru: {
        translation: ru
      }
    },
    // 默认语言
    fallbackLng: 'en',
    // 是否启用调试
    debug: false,
    // 检测语言选项
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // 不转义HTML
    }
  });

export default i18n; 