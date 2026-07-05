import { useLocalStorage } from './useLocalStorage';
import { UserSettings } from '@/lib/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/lib/constants';

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings({ ...settings, ...updates });
  };

  const setApiKey = (model: 'openai' | 'stability', key: string) => {
    if (model === 'openai') {
      setSettings({ ...settings, openaiApiKey: key });
    } else {
      setSettings({ ...settings, stabilityApiKey: key });
    }
  };

  const getActiveApiKey = (): string => {
    if (settings.defaultModel === 'dalle-3') {
      return settings.openaiApiKey;
    }
    return settings.stabilityApiKey;
  };

  const hasActiveApiKey = (): boolean => {
    return getActiveApiKey().length > 0;
  };

  return {
    settings,
    updateSettings,
    setApiKey,
    getActiveApiKey,
    hasActiveApiKey,
  };
}
