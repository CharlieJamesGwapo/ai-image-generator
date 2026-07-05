'use client';

import { API_LIMITS } from '@/lib/constants';
import { ImageModel } from '@/lib/types';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  model: ImageModel;
  disabled?: boolean;
  onEnter?: () => void;
}

export function PromptInput({ value, onChange, model, disabled, onEnter }: PromptInputProps) {
  const maxLength = API_LIMITS[model].maxPromptLength;
  const remaining = maxLength - value.length;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Image Prompt
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey && !disabled) {
            onEnter?.();
          }
        }}
        placeholder="Describe the image you want to generate..."
        maxLength={maxLength}
        disabled={disabled}
        className="w-full px-4 py-3 min-h-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
      />
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{value.length} / {maxLength} characters</span>
        <span className={remaining < 100 ? 'text-orange-600 dark:text-orange-400' : ''}>
          {remaining} remaining
        </span>
      </div>
    </div>
  );
}
