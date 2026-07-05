'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search by prompt...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400">🔍</span>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
