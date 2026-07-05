import { useMutation } from '@tanstack/react-query';
import { dalleApi } from '@/lib/api/dalle';
import { stabilityApi } from '@/lib/api/stability';
import { getAspectRatioDimensions } from '@/lib/utils';
import { ImageModel, AspectRatio } from '@/lib/types';

interface GenerationParams {
  prompt: string;
  model: ImageModel;
  aspectRatio: AspectRatio;
  apiKey: string;
  enhancePrompt?: boolean;
}

export function useImageGeneration() {
  return useMutation({
    mutationFn: async (params: GenerationParams) => {
      const { prompt, model, aspectRatio, apiKey } = params;

      if (model === 'dalle-3') {
        const dimensions = getAspectRatioDimensions(aspectRatio);
        const size = `${dimensions.width}x${dimensions.height}` as '1024x1024' | '1792x1024' | '1024x1792';

        return dalleApi.generateImage(
          {
            prompt,
            size,
            quality: 'standard',
          },
          apiKey
        );
      } else {
        const dimensions = getAspectRatioDimensions(aspectRatio);
        return stabilityApi.generateImage(
          {
            prompt,
            height: dimensions.height,
            width: dimensions.width,
          },
          apiKey
        );
      }
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
