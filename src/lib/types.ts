export type ImageModel = 'dalle-3' | 'stability-ai';
export type AspectRatio = '1:1' | '4:3' | '16:9' | '9:16' | 'custom';
export type Theme = 'light' | 'dark' | 'system';

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string; // data URI or remote URL
  model: ImageModel;
  aspectRatio: AspectRatio;
  isFavorite: boolean;
  generatedAt: number; // timestamp
  revisedPrompt?: string; // from DALL-E 3
}

export interface UserSettings {
  openaiApiKey: string;
  stabilityApiKey: string;
  defaultModel: ImageModel;
  theme: Theme;
  autoEnhancePrompts: boolean;
}

export interface PromptHistoryItem {
  prompt: string;
  count: number;
  lastUsed: number;
}

export interface GenerationError {
  code: string;
  message: string;
  timestamp: number;
}
