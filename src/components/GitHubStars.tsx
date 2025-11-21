import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface GitHubStarsProps {
  repo?: string;
}

function GitHubStars({ repo = "thinkinaixyz/deepchat" }: GitHubStarsProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStars() {
      const CACHE_KEY = `github_stars_${repo}`;
      const CACHE_DURATION = 3600 * 1000; // 1 hour
      const FALLBACK_STARS = 4900;

      try {
        setLoading(true);
        setError(false);

        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { count, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStars(count);
            setLoading(false);
            return;
          }
        }

        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };

        // 如果有设置 GITHUB_TOKEN 环境变量，则使用它
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) {
          headers.Authorization = `token ${token}`;
        }

        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers
        });

        if (!response.ok) {
          throw new Error('Failed to fetch repository data');
        }

        const data = await response.json();
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
          // Update cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            count: data.stargazers_count,
            timestamp: Date.now()
          }));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
        // Try to use cached value even if expired
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { count } = JSON.parse(cached);
          setStars(count);
        } else {
          // Fallback to hardcoded value
          setStars(FALLBACK_STARS);
        }
        // Don't show error state in UI, just show fallback/cached
        setError(false);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
  }, [repo]);

  if (error) {
    return (
      <div className="flex items-center opacity-75">
        <Star className="w-4 h-4 text-gray-400" />
        <span className="text-sm ml-1">-</span>
      </div>
    );
  }

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <span>GitHub</span>
      {loading ? (
        <div className="flex items-center opacity-75">
          <Star className="w-4 h-4 text-white" />
          <span className="text-sm ml-1">...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-white" />
          <span className="text-sm ml-1">{stars !== null ? stars.toLocaleString() : '0'}</span>
        </div>
      )}
    </a>
  );
}

export default GitHubStars; 