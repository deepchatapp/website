import React from 'react';
import { MessageCircle, Send, Mail } from 'lucide-react';

interface ContactPageProps {
  lang: 'en' | 'zh';
}

const contacts = {
  en: {
    title: 'Contact Us',
    subtitle: 'Join our community or contact us directly',
    community: {
      title: 'Join Our Community',
      subtitle: 'Connect with other users and get help',
      telegram: {
        title: 'Telegram Channel',
        description: 'Join our Telegram channel for latest updates and discussions',
        link: 'https://t.me/deepchatAI'
      },
      discord: {
        title: 'Discord Server',
        description: 'Join our Discord server for real-time chat and support',
        link: 'https://discord.gg/deepchat'
      }
    },
    wechat: {
      title: 'WeChat Community',
      subtitle: 'Scan QR code to join our WeChat community',
      group: {
        title: 'WeChat Group',
        description: 'Join our WeChat group for Chinese users'
      },
      official: {
        title: 'Official Account',
        description: 'Follow our WeChat official account for news and updates'
      }
    },
    email: {
      title: 'Email Support',
      subtitle: 'For business cooperation and technical support',
      address: 'support@deepchat.ai'
    }
  },
  zh: {
    title: '联系我们',
    subtitle: '加入我们的社区或直接联系我们',
    community: {
      title: '加入社区',
      subtitle: '与其他用户交流获取帮助',
      telegram: {
        title: 'Telegram 频道',
        description: '加入我们的 Telegram 频道获取最新动态和讨论',
        link: 'https://t.me/deepchatAI'
      },
      discord: {
        title: 'Discord 服务器',
        description: '加入我们的 Discord 服务器获取实时聊天和支持',
        link: 'https://discord.gg/deepchat'
      }
    },
    wechat: {
      title: '微信社区',
      subtitle: '扫描二维码加入我们的微信社区',
      group: {
        title: '微信群',
        description: '加入我们的微信群获取中文支持'
      },
      official: {
        title: '官方小助手',
        description: '关注我们的官方小助手获取最新资讯'
      }
    },
    email: {
      title: '电子邮件',
      subtitle: '商务合作或技术支持',
      address: 'support@deepchat.ai'
    }
  }
};

function ContactPage({ lang }: ContactPageProps) {
  const t = contacts[lang];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
          {t.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{t.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 社区频道区域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <a
            href={t.community.telegram.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.community.telegram.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.community.telegram.description}</p>
              </div>
            </div>
          </a>

          <a
            href={t.community.discord.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.community.discord.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.community.discord.description}</p>
              </div>
            </div>
          </a>
        </div>

        {/* 微信社区区域 */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t.wechat.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t.wechat.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-4">
                <img src="/wechat-group-qr.jpg" alt="WeChat Group QR Code" className="w-64 h-64 mx-auto object-contain" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t.wechat.group.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.wechat.group.description}</p>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-slate-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-4">
                <img src="/wechat-assistant-qr.jpg" alt="WeChat Official Account QR Code" className="w-64 h-64 mx-auto object-contain" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t.wechat.official.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.wechat.official.description}</p>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.email.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.email.subtitle}</p>
            </div>
          </div>
          <a
            href={`mailto:${t.email.address}`}
            className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <span>{t.email.address}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 