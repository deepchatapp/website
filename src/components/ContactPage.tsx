import React from 'react';
import { MessageCircle, Send, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
          {t('contact.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{t('contact.subtitle')}</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 社区频道区域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <a
            href={t('contact.community.telegram.link')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.community.telegram.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.community.telegram.description')}</p>
              </div>
            </div>
          </a>

          <a
            href={t('contact.community.discord.link')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.community.discord.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.community.discord.description')}</p>
              </div>
            </div>
          </a>
        </div>

        {/* 微信社区区域 */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('contact.wechat.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('contact.wechat.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-4">
                <img src="/wechat-group-qr.png" alt="WeChat Group QR Code" className="w-64 h-64 mx-auto object-contain" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('contact.wechat.group.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.wechat.group.description')}</p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-4">
                <img src="/wechat-assistant-qr.jpg" alt="WeChat Official Account QR Code" className="w-64 h-64 mx-auto object-contain" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('contact.wechat.official.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.wechat.official.description')}</p>
            </div>
          </div>
        </div>

        {/* 邮件支持区域 */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.email.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.email.subtitle')}</p>
            </div>
          </div>
          <a
            href={`mailto:${t('contact.email.address')}`}
            className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <span>{t('contact.email.address')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 