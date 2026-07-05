'use client';

import Image from 'next/image';
import { GeneratedImage } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { FavoritesToggle } from './FavoritesToggle';
import { DownloadButton } from './DownloadButton';

interface ImagePreviewProps {
  image: GeneratedImage;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onCopyPrompt?: (prompt: string) => void;
}

export function ImagePreview({ image, onClose, onToggleFavorite, onCopyPrompt }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Image Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative w-full">
            {image.imageUrl.startsWith('data:') ? (
              <img src={image.imageUrl} alt={image.prompt} className="w-full rounded-lg" />
            ) : (
              <Image
                src={image.imageUrl}
                alt={image.prompt}
                width={1024}
                height={1024}
                className="w-full rounded-lg"
                unoptimized
              />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt:</h3>
              <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                {image.prompt}
              </p>
              {image.revisedPrompt && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Revised Prompt (by AI):</p>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm">
                    {image.revisedPrompt}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400">Model</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {image.model === 'dalle-3' ? 'DALL-E 3' : 'Stability AI'}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400">Aspect Ratio</div>
                <div className="font-semibold text-gray-900 dark:text-white">{image.aspectRatio}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400">Generated</div>
                <div className="font-semibold text-gray-900 dark:text-white text-xs">
                  {formatDate(image.generatedAt)}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-600 dark:text-gray-400">Status</div>
                <div className="font-semibold text-green-600 dark:text-green-400">✓ Success</div>
              </div>
            </div>

            <div className="flex gap-3">
              <DownloadButton imageUrl={image.imageUrl} prompt={image.prompt} size="lg" />
              <FavoritesToggle
                isFavorite={image.isFavorite}
                onClick={() => onToggleFavorite(image.id)}
                size="lg"
              />
              <button
                onClick={() => onCopyPrompt?.(image.prompt)}
                className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-2xl"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
