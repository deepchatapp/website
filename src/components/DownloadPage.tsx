import React, { useEffect, useState } from 'react';
import { Download, MonitorSmartphone, Apple, MonitorDown, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VERSION_ENDPOINT = 'https://cdn.deepchatai.cn/download/version.json';
const CDN_BASE = 'https://cdn.deepchatai.cn/download';
const CHANNELS = ['release', 'canary'] as const;

type Channel = (typeof CHANNELS)[number];

type DownloadConfig = {
  name: string;
  size: string;
  file?: string;
};

const DOWNLOADS: Record<'windows' | 'macos' | 'linux', { versions: DownloadConfig[] }> = {
  windows: {
    versions: [
      {
        name: 'x64',
        size: '156 MB',
        file: 'windows-x64.exe'
      },
      {
        name: 'ARM64',
        size: '148 MB'
      }
    ]
  },
  macos: {
    versions: [
      {
        name: 'Intel',
        size: '165 MB',
        file: 'mac-x64.dmg'
      },
      {
        name: 'Apple Silicon',
        size: '158 MB',
        file: 'mac-arm64.dmg'
      }
    ]
  },
  linux: {
    versions: [
      {
        name: 'x64',
        size: '162 MB',
        file: 'linux-x64.tar.gz'
      },
      {
        name: 'x86_64 (AppImage)',
        size: '155 MB',
        file: 'linux-x86_64.AppImage'
      }
    ]
  }
};

const buildDownloadUrl = (version: string, platform: string) => {
  const hasPrefix = version.startsWith('v');
  const normalizedVersion = hasPrefix ? version.slice(1) : version;
  const folder = hasPrefix ? version : `v${version}`;
  return `${CDN_BASE}/${folder}/DeepChat-${normalizedVersion}-${platform}`;
};

const formatVersionLabel = (version?: string) => {
  if (!version) return '--';
  return version.startsWith('v') ? version : `v${version}`;
};

function DownloadPage() {
  const { t } = useTranslation();
  const [versions, setVersions] = useState<Partial<Record<Channel, string>>>({});
  const [selectedChannel, setSelectedChannel] = useState<Channel>('release');

  useEffect(() => {
    let isMounted = true;

    const fetchVersions = async () => {
      try {
        const response = await fetch(VERSION_ENDPOINT);
        if (!response.ok) throw new Error(`Failed to load versions: ${response.status}`);
        const data: Partial<Record<Channel, string>> = await response.json();
        if (isMounted) {
          setVersions(data);
        }
      } catch (error) {
        console.error('Failed to fetch download versions', error);
      }
    };

    fetchVersions();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentVersion = versions[selectedChannel];
  const versionLabel = formatVersionLabel(currentVersion);
  const currentChannelLabel = t(`download.channels.${selectedChannel}`);

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
            <span className="text-sm font-medium">
              {t('download.version', { version: versionLabel, channel: currentChannelLabel })}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-12">
          {CHANNELS.map((channel) => {
            const isActive = selectedChannel === channel;
            const channelVersion = formatVersionLabel(versions[channel]);
            return (
              <button
                key={channel}
                type="button"
                onClick={() => setSelectedChannel(channel)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30'
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{t(`download.channels.${channel}`)}</span>
                  <span className="text-xs opacity-80">{channelVersion}</span>
                </div>
              </button>
            );
          })}
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
              {DOWNLOADS.windows.versions.map((version, index) => {
                const downloadUrl =
                  currentVersion && version.file ? buildDownloadUrl(currentVersion, version.file) : undefined;
                return (
                  <button
                    key={index}
                    onClick={() => handleSystemDownload(downloadUrl)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      downloadUrl
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!downloadUrl}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.windows.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                );
              })}
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
              {DOWNLOADS.macos.versions.map((version, index) => {
                const downloadUrl =
                  currentVersion && version.file ? buildDownloadUrl(currentVersion, version.file) : undefined;
                return (
                  <button
                    key={index}
                    onClick={() => handleSystemDownload(downloadUrl)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      downloadUrl
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!downloadUrl}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.macos.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                );
              })}
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
              {DOWNLOADS.linux.versions.map((version, index) => {
                const downloadUrl =
                  currentVersion && version.file ? buildDownloadUrl(currentVersion, version.file) : undefined;
                return (
                  <button
                    key={index}
                    onClick={() => handleSystemDownload(downloadUrl)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      downloadUrl
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!downloadUrl}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.linux.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{version.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                );
              })}
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
