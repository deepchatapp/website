import { existsSync } from 'node:fs';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const endpoint = 'https://api.github.com/repos/ThinkInAIXYZ/deepchat/releases?per_page=30';
const outputPath = resolve('public/download-cache.json');
const tmpOutputPath = `${outputPath}.tmp`;

const byPublishedDateDesc = (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

const pickChannelReleases = (releases) => {
  const publicReleases = releases.filter((release) => !release.draft).sort(byPublishedDateDesc);
  return {
    release: publicReleases.find((release) => !release.prerelease),
    beta: publicReleases.find((release) => release.prerelease)
  };
};

const trimRelease = (release) => {
  if (!release) return undefined;
  return {
    tag_name: release.tag_name,
    prerelease: release.prerelease,
    draft: release.draft,
    published_at: release.published_at,
    assets: release.assets.map((asset) => ({
      name: asset.name,
      size: asset.size,
      browser_download_url: asset.browser_download_url
    }))
  };
};

try {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'deepchat-website'
    }
  });

  if (!response.ok) throw new Error(`GitHub Releases API returned ${response.status}`);

  const releases = await response.json();
  const channels = pickChannelReleases(releases);
  const cache = {
    source: endpoint,
    channels: {
      release: trimRelease(channels.release),
      beta: trimRelease(channels.beta)
    }
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(tmpOutputPath, `${JSON.stringify(cache, null, 2)}\n`);
  await rename(tmpOutputPath, outputPath);
  console.log(`Updated download cache: ${outputPath}`);
} catch (error) {
  if (existsSync(outputPath)) {
    console.warn(`Keeping existing download cache: ${error.message}`);
  } else {
    throw error;
  }
}
