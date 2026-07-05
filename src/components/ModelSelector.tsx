'use client';

import { ImageModel } from '@/lib/types';

interface ModelSelectorProps {
  value: ImageModel;
  onChange: (model: ImageModel) => void;
  disabled?: boolean;
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        AI Model
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange('dalle-3')}
          disabled={disabled}
          className={`p-4 rounded-lg border-2 transition-all font-medium ${
            value === 'dalle-3'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="font-semibold text-gray-900 dark:text-white">DALL-E 3</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">OpenAI</div>
        </button>
        <button
          onClick={() => onChange('stability-ai')}
          disabled={disabled}
          className={`p-4 rounded-lg border-2 transition-all font-medium ${
            value === 'stability-ai'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="font-semibold text-gray-900 dark:text-white">Stability AI</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Stable Diffusion</div>
        </button>
      </div>
    </div>
  );
}
