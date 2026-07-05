'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ImageGallery } from '@/components/ImageGallery';
import { ImagePreview } from '@/components/ImagePreview';
import { useFavorites } from '@/hooks/useFavorites';
import { useImageHistory } from '@/hooks/useImageHistory';
import { GeneratedImage } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

export default function FavoritesPage() {
  const [previewImage, setPreviewImage] = useState<GeneratedImage | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const { favorites } = useFavorites();
  const { deleteImage, toggleFavorite } = useImageHistory();

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await copyToClipboard(prompt);
      setToastMessage('Copied to clipboard!');
    } catch (error) {
      setToastMessage('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Favorite Images
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {favorites.length} favorite {favorites.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        <ImageGallery
          images={favorites}
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
