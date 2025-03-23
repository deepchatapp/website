import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface GitHubStarsProps {
  repo: string;
}

function GitHubStars({ repo }: GitHubStarsProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStars() {
      try {
        setLoading(true);
        setError(false);
        
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
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
        setError(true);
        setStars(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
  }, [repo]);

  if (error) {
    return (
      <div className="flex items-center opacity-75">
        <Star className="w-4 h-4 text-white" />
        <span className="text-sm ml-1">-</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
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
    </div>
  );
}

export default GitHubStars; 