'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptInput } from '@/components/PromptInput';
import { AspectRatioSelector } from '@/components/AspectRatioSelector';
import { ModelSelector } from '@/components/ModelSelector';
import { GenerateButton } from '@/components/GenerateButton';
import { PromptSuggestions } from '@/components/PromptSuggestions';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ImagePreview } from '@/components/ImagePreview';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { useImageHistory } from '@/hooks/useImageHistory';
import { useSettings } from '@/hooks/useSettings';
import { StorageManager } from '@/lib/storage/localStorage';
import { generateId, copyToClipboard } from '@/lib/utils';
import { AspectRatio, GeneratedImage } from '@/lib/types';

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [previewImage, setPreviewImage] = useState<GeneratedImage | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const { settings, getActiveApiKey, hasActiveApiKey } = useSettings();
  const { mutate: generateImage, isPending } = useImageGeneration();
  const { addImage, toggleFavorite } = useImageHistory();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setToastMessage('Please enter a prompt');
      return;
    }

    if (!hasActiveApiKey()) {
      setToastMessage('Please add an API key in settings');
      return;
    }

    generateImage(
      {
        prompt,
        model: settings.defaultModel,
        aspectRatio,
        apiKey: getActiveApiKey(),
      },
      {
        onSuccess: (result) => {
          const image: GeneratedImage = {
            id: generateId(),
            prompt,
            imageUrl: result.imageUrl,
            model: settings.defaultModel,
            aspectRatio,
            isFavorite: false,
            generatedAt: Date.now(),
            revisedPrompt: result.revisedPrompt || undefined,
          };

          addImage(image);
          StorageManager.addPromptToHistory(prompt);
          setToastMessage('Image generated successfully!');
          setPreviewImage(image);
          setPrompt('');
        },
        onError: (error) => {
          const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
          setToastMessage(errorMessage);
        },
      }
    );
  };

  const handleCopyPrompt = async (text: string) => {
    try {
      await copyToClipboard(text);
      setToastMessage('Copied to clipboard!');
    } catch {
      setToastMessage('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6 sticky top-20">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Generate Images
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Create stunning AI images with your text prompts
                </p>
              </div>

              <PromptInput
                value={prompt}
                onChange={setPrompt}
                model={settings.defaultModel}
                disabled={isPending}
                onEnter={handleGenerate}
              />

              <PromptSuggestions
                currentPrompt={prompt}
                onApply={setPrompt}
              />

              <ModelSelector
                value={settings.defaultModel}
                onChange={() => {}}
                disabled={isPending}
              />

              <AspectRatioSelector
                value={aspectRatio}
                onChange={setAspectRatio}
                disabled={isPending}
              />

              {!hasActiveApiKey() && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Add an API key in <a href="/settings" className="font-semibold underline">settings</a> to generate images.
                  </p>
                </div>
              )}

              <GenerateButton
                onClick={handleGenerate}
                isLoading={isPending}
                disabled={!hasActiveApiKey()}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 min-h-[400px] flex items-center justify-center">
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <div className="text-6xl mb-4">🎨</div>
                  <p>Your generated images will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {previewImage && (
        <ImagePreview
          image={previewImage}
          onClose={() => setPreviewImage(null)}
          onToggleFavorite={toggleFavorite}
          onCopyPrompt={handleCopyPrompt}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-lg shadow-lg animation-fade-out">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
