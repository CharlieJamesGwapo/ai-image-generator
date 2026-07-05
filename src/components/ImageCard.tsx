'use client';

import Image from 'next/image';
import { GeneratedImage } from '@/lib/types';
import { formatDate, truncateText } from '@/lib/utils';
import { FavoritesToggle } from './FavoritesToggle';
import { DownloadButton } from './DownloadButton';

interface ImageCardProps {
  image: GeneratedImage;
  onPreview: (image: GeneratedImage) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function ImageCard({ image, onPreview, onDelete, onToggleFavorite }: ImageCardProps) {
  return (
    <div className="group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative aspect-square cursor-pointer" onClick={() => onPreview(image)}>
        {image.imageUrl.startsWith('data:') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.imageUrl}
            alt={image.prompt}
            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
          />
        ) : (
          <Image
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover group-hover:opacity-75 transition-opacity"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <span className="text-white text-lg">👁️ Preview</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {truncateText(image.prompt, 50)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {formatDate(image.generatedAt)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
              {image.model === 'dalle-3' ? 'DALL-E 3' : 'Stability AI'}
            </span>
            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
              {image.aspectRatio}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FavoritesToggle
              isFavorite={image.isFavorite}
              onClick={() => onToggleFavorite(image.id)}
              size="sm"
            />
            <DownloadButton imageUrl={image.imageUrl} prompt={image.prompt} size="sm" />
          </div>
          <button
            onClick={() => onDelete(image.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
