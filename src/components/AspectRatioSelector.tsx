'use client';

import { ASPECT_RATIOS } from '@/lib/constants';
import { AspectRatio } from '@/lib/types';

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
  disabled?: boolean;
}

export function AspectRatioSelector({ value, onChange, disabled }: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Aspect Ratio
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(ASPECT_RATIOS).map(([key, ratio]) => (
          <button
            key={key}
            onClick={() => onChange(key as AspectRatio)}
            disabled={disabled}
            className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
              value === key
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {ratio.label}
          </button>
        ))}
      </div>
    </div>
  );
}
