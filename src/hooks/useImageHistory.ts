import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { StorageManager } from '@/lib/storage/localStorage';
import { GeneratedImage } from '@/lib/types';

export function useImageHistory(searchQuery?: string) {
  const { data: images = [], refetch } = useQuery({
    queryKey: ['images', searchQuery],
    queryFn: () => {
      if (searchQuery && searchQuery.trim()) {
        return StorageManager.searchImages(searchQuery);
      }
      return StorageManager.getAllImages().sort((a, b) => b.generatedAt - a.generatedAt);
    },
    staleTime: 0,
  });

  const addImage = useCallback((image: GeneratedImage) => {
    StorageManager.saveImage(image);
    refetch();
  }, [refetch]);

  const deleteImage = useCallback((id: string) => {
    StorageManager.deleteImage(id);
    refetch();
  }, [refetch]);

  const toggleFavorite = useCallback((id: string) => {
    StorageManager.toggleFavorite(id);
    refetch();
  }, [refetch]);

  return { images, addImage, deleteImage, toggleFavorite, refetch };
}
