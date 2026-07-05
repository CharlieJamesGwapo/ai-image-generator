import { useQuery } from '@tanstack/react-query';
import { StorageManager } from '@/lib/storage/localStorage';

export function useFavorites() {
  const { data: favorites = [], refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => StorageManager.getFavorites().sort((a, b) => b.generatedAt - a.generatedAt),
    staleTime: 0,
  });

  return { favorites, refetch };
}
