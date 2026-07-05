'use client';

import { Header } from '@/components/Header';
import { SettingsPanel } from '@/components/SettingsPanel';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your API keys, preferences, and more
          </p>
        </div>

        <SettingsPanel />
      </main>
    </div>
  );
}
