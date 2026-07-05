'use client';

import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { StorageManager } from '@/lib/storage/localStorage';
import { ImageModel, Theme } from '@/lib/types';

export function SettingsPanel() {
  const { settings, updateSettings, setApiKey } = useSettings();
  const [openaiKey, setOpenaiKey] = useState(settings.openaiApiKey);
  const [stabilityKey, setStabilityKey] = useState(settings.stabilityApiKey);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showStabilityKey, setShowStabilityKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSaveApiKeys = () => {
    try {
      setApiKey('openai', openaiKey);
      setApiKey('stability', stabilityKey);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleModelChange = (model: ImageModel) => {
    updateSettings({ defaultModel: model });
  };

  const handleThemeChange = (theme: Theme) => {
    updateSettings({ theme });
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure? This will delete all generated images and history.')) {
      StorageManager.clearAllData();
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* API Keys Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 API Keys</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OpenAI API Key (DALL-E 3)
            </label>
            <div className="relative">
              <input
                type={showOpenaiKey ? 'text' : 'password'}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-400"
              >
                {showOpenaiKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                platform.openai.com/api-keys
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stability AI API Key
            </label>
            <div className="relative">
              <input
                type={showStabilityKey ? 'text' : 'password'}
                value={stabilityKey}
                onChange={(e) => setStabilityKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                onClick={() => setShowStabilityKey(!showStabilityKey)}
                className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-400"
              >
                {showStabilityKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Get your key from <a href="https://platform.stability.ai/account/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                platform.stability.ai/account/keys
              </a>
            </p>
          </div>

          <button
            onClick={handleSaveApiKeys}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Save API Keys
          </button>
        </div>
      </section>

      {/* Model Selection */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🤖 Default Model</h2>

        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors" style={{
            borderColor: settings.defaultModel === 'dalle-3' ? '#3b82f6' : '#e5e7eb',
            backgroundColor: settings.defaultModel === 'dalle-3' ? '#eff6ff' : 'transparent'
          }}>
            <input
              type="radio"
              checked={settings.defaultModel === 'dalle-3'}
              onChange={() => handleModelChange('dalle-3')}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">DALL-E 3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">High quality, slower</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors" style={{
            borderColor: settings.defaultModel === 'stability-ai' ? '#3b82f6' : '#e5e7eb',
            backgroundColor: settings.defaultModel === 'stability-ai' ? '#eff6ff' : 'transparent'
          }}>
            <input
              type="radio"
              checked={settings.defaultModel === 'stability-ai'}
              onChange={() => handleModelChange('stability-ai')}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Stability AI</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fast, very versatile</div>
            </div>
          </label>
        </div>
      </section>

      {/* Theme Selection */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎨 Theme</h2>

        <div className="grid grid-cols-3 gap-3">
          {(['light', 'dark', 'system'] as const).map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`p-3 rounded-lg border-2 font-medium capitalize transition-all ${
                settings.theme === theme
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'} {theme}
            </button>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold text-red-900 dark:text-red-200 mb-4">⚠️ Danger Zone</h2>

        <button
          onClick={handleClearAllData}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Clear All Data
        </button>
        <p className="text-sm text-red-800 dark:text-red-300 mt-2">
          This will permanently delete all generated images, favorites, and history.
        </p>
      </section>

      {/* Status Message */}
      {saveStatus !== 'idle' && (
        <div className={`p-4 rounded-lg text-center font-medium ${
          saveStatus === 'success'
            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          {saveStatus === 'success' ? '✓ Saved successfully' : '✗ Error saving'}
        </div>
      )}
    </div>
  );
}
