import React from 'react';
import { Download, MonitorSmartphone, Apple, MonitorDown } from 'lucide-react';

interface DownloadPageProps {
  lang: 'en' | 'zh';
}

interface Version {
  name: string;
  size: string;
  url?: string;
}

const CURRENT_VERSION = 'v0.0.10';
const GITHUB_RELEASE_BASE = `https://github.com/ThinkInAIXYZ/deepchat/releases/download/${CURRENT_VERSION}`;

const downloads = {
  en: {
    title: 'Download DeepChat',
    subtitle: 'Choose your operating system to get started',
    version: `Current Version: ${CURRENT_VERSION}`,
    netdisk: {
      title: 'Cloud Download',
      subtitle: 'Choose your preferred cloud storage service',
      baidu: {
        title: 'Baidu Netdisk',
        code: 'qku1',
        url: 'https://pan.baidu.com/s/1P0ZMGG-m7cMijqVPhIjrJg?pwd=qku1'
      },
      aliyun: {
        title: 'Aliyun Drive',
        code: 'ksFj',
        url: 'https://pan.quark.cn/s/5a0679a7043c'
      }
    },
    systems: {
      windows: {
        title: 'Windows',
        subtitle: 'Support Windows 10 and above',
        versions: [
          {
            name: 'Windows x64',
            size: '156 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-setup-windows-x64.exe`
          },
          {
            name: 'Windows ARM64',
            size: '148 MB'
          }
        ]
      },
      macos: {
        title: 'macOS',
        subtitle: 'Support macOS 10.13 and above',
        versions: [
          {
            name: 'macOS Intel',
            size: '165 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-mac-x64.dmg`
          },
          {
            name: 'macOS Apple Silicon',
            size: '158 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-mac-arm64.dmg`
          }
        ]
      },
      linux: {
        title: 'Linux',
        subtitle: 'Support major Linux distributions',
        versions: [
          {
            name: 'Linux x64 (AppImage)',
            size: '162 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-linux-x64.tar.gz`
          },
          {
            name: 'Linux ARM64 (AppImage)',
            size: '155 MB'
          }
        ]
      }
    }
  },
  zh: {
    title: '下载 DeepChat',
    subtitle: '选择您的操作系统开始使用',
    version: `当前版本：${CURRENT_VERSION}`,
    netdisk: {
      title: '网盘下载',
      subtitle: '从您熟悉的网盘下载更快速',
      baidu: {
        title: '百度网盘',
        code: 'qku1',
        url: 'https://pan.baidu.com/s/1P0ZMGG-m7cMijqVPhIjrJg?pwd=qku1'
      },
      aliyun: {
        title: '夸克网盘',
        code: 'ksFj',
        url: 'https://pan.quark.cn/s/5a0679a7043c'
      }
    },
    systems: {
      windows: {
        title: 'Windows',
        subtitle: '支持 Windows 10 及以上版本',
        versions: [
          {
            name: 'Windows x64 版本',
            size: '156 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-setup-windows-x64.exe`
          },
          {
            name: 'Windows ARM64 版本',
            size: '148 MB'
          }
        ]
      },
      macos: {
        title: 'macOS',
        subtitle: '支持 macOS 10.13 及以上版本',
        versions: [
          {
            name: 'macOS Intel 版本',
            size: '165 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-mac-x64.dmg`
          },
          {
            name: 'macOS Apple Silicon 版本',
            size: '158 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-mac-arm64.dmg`
          }
        ]
      },
      linux: {
        title: 'Linux',
        subtitle: '支持主流 Linux 发行版',
        versions: [
          {
            name: 'Linux x64 版本 (AppImage)',
            size: '162 MB',
            url: `${GITHUB_RELEASE_BASE}/DeepChat-${CURRENT_VERSION.substring(1)}-linux-x64.tar.gz`
          },
          {
            name: 'Linux ARM64 版本 (AppImage)',
            size: '155 MB'
          }
        ]
      }
    }
  }
};

function DownloadPage({ lang }: DownloadPageProps) {
  const t = downloads[lang];

  const handleNetDiskClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSystemDownload = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 标题区域 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-transparent bg-clip-text">
          {t.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{t.subtitle}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{t.version}</p>
      </div>

      {/* 网盘下载区域 */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-600/20 w-10 h-10 rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t.netdisk.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.netdisk.subtitle}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleNetDiskClick(t.netdisk.baidu.url)}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-indigo-500/40 hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-all cursor-pointer"
            >
              <span className="text-gray-900 dark:text-white font-medium">{t.netdisk.baidu.title}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">提取码：{t.netdisk.baidu.code}</span>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </button>
            <button 
              onClick={() => handleNetDiskClick(t.netdisk.aliyun.url)}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-indigo-500/40 hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-all cursor-pointer"
            >
              <span className="text-gray-900 dark:text-white font-medium">{t.netdisk.aliyun.title}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">提取码：{t.netdisk.aliyun.code}</span>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 系统下载区域 */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Windows */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
              <MonitorSmartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.systems.windows.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.systems.windows.subtitle}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {t.systems.windows.versions.map((version, index) => (
              <button
                key={index}
                onClick={() => handleSystemDownload(version.url)}
                className={`w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-gray-600 ${version.url ? 'hover:border-indigo-500/40 cursor-pointer' : 'opacity-50 cursor-not-allowed'} transition-all`}
                disabled={!version.url}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{version.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                </div>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>

        {/* macOS */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
              <Apple className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.systems.macos.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.systems.macos.subtitle}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {t.systems.macos.versions.map((version, index) => (
              <button
                key={index}
                onClick={() => handleSystemDownload(version.url)}
                className={`w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-gray-600 ${version.url ? 'hover:border-indigo-500/40 cursor-pointer' : 'opacity-50 cursor-not-allowed'} transition-all`}
                disabled={!version.url}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{version.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                </div>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Linux */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-600/20 w-12 h-12 rounded-full flex items-center justify-center">
              <MonitorDown className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.systems.linux.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.systems.linux.subtitle}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {t.systems.linux.versions.map((version, index) => (
              <button
                key={index}
                onClick={() => handleSystemDownload(version.url)}
                className={`w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-gray-600 ${version.url ? 'hover:border-indigo-500/40 cursor-pointer' : 'opacity-50 cursor-not-allowed'} transition-all`}
                disabled={!version.url}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{version.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                </div>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub 链接 */}
      <div className="text-center mt-12">
        <a
          href="https://github.com/thinkinaixyz/deepchat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <span>在 GitHub 上查看所有版本</span>
          <Download className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default DownloadPage; 