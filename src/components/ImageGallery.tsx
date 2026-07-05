'use client';

import { GeneratedImage } from '@/lib/types';
import { ImageCard } from './ImageCard';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onPreview: (image: GeneratedImage) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isLoading?: boolean;
}

export function ImageGallery({
  images,
  onPreview,
  onDelete,
  onToggleFavorite,
  isLoading,
}: ImageGalleryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">🖼️</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No images yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Generate your first image to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onPreview={onPreview}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
