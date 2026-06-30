import { useEffect, useState } from 'react';
import { Download, MonitorSmartphone, Apple, MonitorDown, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GITHUB_RELEASES_ENDPOINT = 'https://api.github.com/repos/ThinkInAIXYZ/deepchat/releases?per_page=30';
const GITHUB_RELEASES_URL = 'https://github.com/ThinkInAIXYZ/deepchat/releases';
const DOWNLOAD_CACHE_URL = '/download-cache.json';
const CHANNELS = ['release', 'beta'] as const;

type Channel = (typeof CHANNELS)[number];

type DownloadConfig = {
  name: string;
  assetPattern: RegExp;
};

type GithubReleaseAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

type GithubRelease = {
  tag_name: string;
  prerelease: boolean;
  draft: boolean;
  published_at: string;
  assets: GithubReleaseAsset[];
};

type DownloadCache = {
  channels?: Partial<Record<Channel, GithubRelease>>;
};

const DOWNLOADS: Record<'windows' | 'macos' | 'linux', { versions: DownloadConfig[] }> = {
  windows: {
    versions: [
      {
        name: 'x64',
        assetPattern: /windows-x64\.exe$/i
      },
      {
        name: 'ARM64',
        assetPattern: /windows-arm64\.exe$/i
      }
    ]
  },
  macos: {
    versions: [
      {
        name: 'Intel',
        assetPattern: /mac-x64\.dmg$/i
      },
      {
        name: 'Apple Silicon',
        assetPattern: /mac-arm64\.dmg$/i
      }
    ]
  },
  linux: {
    versions: [
      {
        name: 'x64',
        assetPattern: /linux-x64\.tar\.gz$/i
      },
      {
        name: 'x86_64 (AppImage)',
        assetPattern: /linux-x86_64\.AppImage$/i
      }
    ]
  }
};

const formatVersionLabel = (version?: string) => {
  if (!version) return '--';
  return version.startsWith('v') ? version : `v${version}`;
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return '--';
  const mb = bytes / 1024 / 1024;
  if (mb < 1024) return `${mb >= 100 ? Math.round(mb) : mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(1)} GB`;
};

const byPublishedDateDesc = (a: GithubRelease, b: GithubRelease) =>
  new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

const pickChannelReleases = (releases: GithubRelease[]) => {
  const publicReleases = releases.filter((release) => !release.draft).sort(byPublishedDateDesc);
  return {
    release: publicReleases.find((release) => !release.prerelease),
    beta: publicReleases.find((release) => release.prerelease)
  };
};

function DownloadPage() {
  const { t } = useTranslation();
  const [releases, setReleases] = useState<Partial<Record<Channel, GithubRelease>>>({});
  const [selectedChannel, setSelectedChannel] = useState<Channel>('release');

  useEffect(() => {
    let isMounted = true;

    const fetchReleases = async () => {
      try {
        const cacheResponse = await fetch(DOWNLOAD_CACHE_URL, { cache: 'no-cache' });
        if (cacheResponse.ok) {
          const cache: DownloadCache = await cacheResponse.json();
          if (isMounted && cache.channels) setReleases(cache.channels);
        }
      } catch (error) {
        console.warn('Failed to fetch cached download releases', error);
      }

      try {
        const response = await fetch(GITHUB_RELEASES_ENDPOINT, {
          headers: { Accept: 'application/vnd.github+json' }
        });
        if (!response.ok) throw new Error(`Failed to load releases: ${response.status}`);
        const data: GithubRelease[] = await response.json();
        if (isMounted) {
          setReleases(pickChannelReleases(data));
        }
      } catch (error) {
        console.error('Failed to fetch download releases', error);
      }
    };

    fetchReleases();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentRelease = releases[selectedChannel];
  const versionLabel = formatVersionLabel(currentRelease?.tag_name);
  const currentChannelLabel = t(`download.channels.${selectedChannel}`);

  const getDownloadAsset = (config: DownloadConfig) =>
    currentRelease?.assets.find((asset) => config.assetPattern.test(asset.name));

  const handleSystemDownload = (asset?: GithubReleaseAsset) => {
    if (asset) {
      window.open(asset.browser_download_url, '_blank', 'noopener,noreferrer');
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
            const channelVersion = formatVersionLabel(releases[channel]?.tag_name);
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
              {DOWNLOADS.windows.versions.map((version) => {
                const asset = getDownloadAsset(version);
                return (
                  <button
                    key={version.name}
                    onClick={() => handleSystemDownload(asset)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      asset
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!asset}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.windows.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(asset?.size)}</span>
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
              {DOWNLOADS.macos.versions.map((version) => {
                const asset = getDownloadAsset(version);
                return (
                  <button
                    key={version.name}
                    onClick={() => handleSystemDownload(asset)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      asset
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!asset}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.macos.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(asset?.size)}</span>
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
              {DOWNLOADS.linux.versions.map((version) => {
                const asset = getDownloadAsset(version);
                return (
                  <button
                    key={version.name}
                    onClick={() => handleSystemDownload(asset)}
                    className={`w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-gray-600 ${
                      asset
                        ? 'hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    } transition-all duration-300`}
                    disabled={!asset}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {t('download.systems.linux.version', { arch: version.name })}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(asset?.size)}</span>
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
            href={GITHUB_RELEASES_URL}
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
