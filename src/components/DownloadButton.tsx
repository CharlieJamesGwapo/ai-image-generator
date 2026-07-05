'use client';

import { useState } from 'react';
import { downloadImage } from '@/lib/utils';

interface DownloadButtonProps {
  imageUrl: string;
  prompt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DownloadButton({ imageUrl, prompt, size = 'md' }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null);
      await downloadImage(imageUrl, prompt);
    } catch {
      setError('Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  const sizeClasses = {
    sm: 'p-2 text-lg',
    md: 'p-3 text-2xl',
    lg: 'p-4 text-3xl',
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Download image"
      >
        {isDownloading ? '⏳' : '⬇️'}
      </button>
      {error && (
        <div className="absolute bottom-full right-0 mb-2 text-xs bg-red-500 text-white px-2 py-1 rounded whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
