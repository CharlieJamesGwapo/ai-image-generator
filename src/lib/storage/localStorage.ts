import { GeneratedImage, UserSettings, PromptHistoryItem } from '../types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants';

export const StorageManager = {
  // Images
  saveImage: (image: GeneratedImage): void => {
    const existing = StorageManager.getAllImages();
    existing.push(image);
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(existing));
  },

  getAllImages: (): GeneratedImage[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IMAGES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getImage: (id: string): GeneratedImage | null => {
    const images = StorageManager.getAllImages();
    return images.find(img => img.id === id) || null;
  },

  deleteImage: (id: string): void => {
    const images = StorageManager.getAllImages();
    const filtered = images.filter(img => img.id !== id);
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(filtered));
  },

  toggleFavorite: (id: string): void => {
    const images = StorageManager.getAllImages();
    const image = images.find(img => img.id === id);
    if (image) {
      image.isFavorite = !image.isFavorite;
      localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
    }
  },

  getFavorites: (): GeneratedImage[] => {
    return StorageManager.getAllImages().filter(img => img.isFavorite);
  },

  searchImages: (query: string): GeneratedImage[] => {
    const images = StorageManager.getAllImages();
    const lowerQuery = query.toLowerCase();
    return images.filter(img =>
      img.prompt.toLowerCase().includes(lowerQuery) ||
      img.revisedPrompt?.toLowerCase().includes(lowerQuery)
    );
  },

  // Settings
  saveSettings: (settings: UserSettings): void => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getSettings: (): UserSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  // Prompt history
  addPromptToHistory: (prompt: string): void => {
    const history = StorageManager.getPromptHistory();
    const existing = history.find(p => p.prompt === prompt);
    if (existing) {
      existing.count += 1;
      existing.lastUsed = Date.now();
    } else {
      history.push({ prompt, count: 1, lastUsed: Date.now() });
    }
    localStorage.setItem(STORAGE_KEYS.PROMPT_HISTORY, JSON.stringify(history));
  },

  getPromptHistory: (): PromptHistoryItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROMPT_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getTopPrompts: (limit: number = 10): PromptHistoryItem[] => {
    const history = StorageManager.getPromptHistory();
    return history.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, limit);
  },

  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.IMAGES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PROMPT_HISTORY);
  },
};
