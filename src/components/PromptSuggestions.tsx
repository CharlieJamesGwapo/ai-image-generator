'use client';

import { enhancePrompt } from '@/lib/utils';

interface PromptSuggestionsProps {
  currentPrompt: string;
  onApply: (prompt: string) => void;
}

export function PromptSuggestions({ currentPrompt, onApply }: PromptSuggestionsProps) {
  if (!currentPrompt.trim()) {
    return null;
  }

  const enhanced = enhancePrompt(currentPrompt);

  if (enhanced === currentPrompt) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
      <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
        💡 Suggested Enhancement:
      </div>
      <p className="text-sm text-blue-800 dark:text-blue-300">{enhanced}</p>
      <button
        onClick={() => onApply(enhanced)}
        className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
      >
        Apply Suggestion
      </button>
    </div>
  );
}
