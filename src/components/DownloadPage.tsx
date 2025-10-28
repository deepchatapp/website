import React from 'react';
import { Download, MonitorSmartphone, Apple, MonitorDown, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CURRENT_VERSION = 'v0.4.2';
const CDN_RELEASE_BASE = `https://cdn.deepchatai.cn/download/${CURRENT_VERSION}`;

const getDownloadUrl = (platform: string) => `${CDN_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-${platform}`;

const DOWNLOADS = {
  windows: {
    versions: [
      {
        name: 'x64',
        size: '156 MB',
        url: getDownloadUrl('windows-x64.exe')
      },
      {
        name: 'ARM64',
        size: '148 MB',
        url: undefined
      }
    ]
  },
  macos: {
    versions: [
      {
        name: 'Intel',
        size: '165 MB',
        url: getDownloadUrl('mac-x64.dmg')
      },
      {
        name: 'Apple Silicon',
        size: '158 MB',
        url: getDownloadUrl('mac-arm64.dmg')
      }
    ]
  },
  linux: {
    versions: [
      {
        name: 'x64',
        size: '162 MB',
        url: getDownloadUrl('linux-x64.tar.gz')
      },
      {
        name: 'x86_64 (AppImage)',
        size: '155 MB',
        url: getDownloadUrl('linux-x86_64.AppImage')
      }
    ]
  }
};

function DownloadPage() {
  const { t } = useTranslation();

  const handleSystemDownload = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        {/* 标题区域 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            {t('download.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{t('download.subtitle')}</p>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            <span className="text-sm font-medium">{t('download.version', { version: CURRENT_VERSION })}</span>
          </div>
        </div>

        {/* 系统下载区域 */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Windows */}
          <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MonitorSmartphone className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('download.systems.windows.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('download.systems.windows.subtitle')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {DOWNLOADS.windows.versions.map((version, index) => (
                <button
                  key={index}
                  onClick={() => handleSystemDownload(version.url)}
                  className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                    version.url 
                      ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  } transition-all duration-300`}
                  disabled={!version.url}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('download.systems.windows.version', { arch: version.name })}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </button>
              ))}
            </div>
          </div>

          {/* macOS */}
          <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Apple className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('download.systems.macos.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('download.systems.macos.subtitle')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {DOWNLOADS.macos.versions.map((version, index) => (
                <button
                  key={index}
                  onClick={() => handleSystemDownload(version.url)}
                  className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                    version.url 
                      ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  } transition-all duration-300`}
                  disabled={!version.url}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('download.systems.macos.version', { arch: version.name })}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Linux */}
          <div className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-500/40 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-600/20 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MonitorDown className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('download.systems.linux.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('download.systems.linux.subtitle')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {DOWNLOADS.linux.versions.map((version, index) => (
                <button
                  key={index}
                  onClick={() => handleSystemDownload(version.url)}
                  className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                    version.url 
                      ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  } transition-all duration-300`}
                  disabled={!version.url}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('download.systems.linux.version', { arch: version.name })}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                  </div>
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub 链接 */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/thinkinaixyz/deepchat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">{t('download.github')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage; 