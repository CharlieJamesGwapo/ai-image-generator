export const ASPECT_RATIOS = {
  '1:1': { label: '1:1 (Square)', width: 1024, height: 1024 },
  '4:3': { label: '4:3 (Landscape)', width: 1024, height: 768 },
  '16:9': { label: '16:9 (Widescreen)', width: 1024, height: 576 },
  '9:16': { label: '9:16 (Portrait)', width: 576, height: 1024 },
  'custom': { label: 'Custom', width: 1024, height: 1024 },
} as const;

export const API_LIMITS = {
  'dalle-3': {
    maxPromptLength: 4000,
    maxImagesPerMinute: 3,
  },
  'stability-ai': {
    maxPromptLength: 2000,
    maxImagesPerMinute: 15,
  },
} as const;

export const STORAGE_KEYS = {
  IMAGES: 'ai-images',
  SETTINGS: 'ai-settings',
  PROMPT_HISTORY: 'ai-prompts',
} as const;

export const DEFAULT_SETTINGS = {
  openaiApiKey: '',
  stabilityApiKey: '',
  defaultModel: 'dalle-3' as const,
  theme: 'system' as const,
  autoEnhancePrompts: false,
};

export const TOAST_DURATION = 3000;
export const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB localStorage limit
