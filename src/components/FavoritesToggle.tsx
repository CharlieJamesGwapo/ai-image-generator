'use client';

interface FavoritesToggleProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoritesToggle({ isFavorite, onClick, size = 'md' }: FavoritesToggleProps) {
  const sizeClasses = {
    sm: 'p-2 text-lg',
    md: 'p-3 text-2xl',
    lg: 'p-4 text-3xl',
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-110`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '⭐' : '☆'}
    </button>
  );
}
