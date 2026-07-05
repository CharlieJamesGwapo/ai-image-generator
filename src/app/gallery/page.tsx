'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ImageGallery } from '@/components/ImageGallery';
import { ImagePreview } from '@/components/ImagePreview';
import { useImageHistory } from '@/hooks/useImageHistory';
import { GeneratedImage } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState<GeneratedImage | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const { images, deleteImage, toggleFavorite } = useImageHistory(searchQuery);

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await copyToClipboard(prompt);
      setToastMessage('Copied to clipboard!');
    } catch {
      setToastMessage('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Image Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {images.length} images generated
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <ImageGallery
          images={images}
          onPreview={setPreviewImage}
          onDelete={deleteImage}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      {previewImage && (
        <ImagePreview
          image={previewImage}
          onClose={() => setPreviewImage(null)}
          onToggleFavorite={toggleFavorite}
          onCopyPrompt={handleCopyPrompt}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
