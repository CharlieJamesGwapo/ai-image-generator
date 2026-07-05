import axios from 'axios';

export interface StabilityGenerationParams {
  prompt: string;
  height: number;
  width: number;
  steps?: number;
  samples?: number;
  cfg_scale?: number;
}

export interface StabilityResponse {
  artifacts: Array<{
    base64: string;
    finish_reason: string;
  }>;
}

export const stabilityApi = {
  generateImage: async (
    params: StabilityGenerationParams,
    apiKey: string
  ): Promise<{ imageUrl: string }> => {
    if (!apiKey) {
      throw new Error('Stability AI API key not configured');
    }

    try {
      const formData = new FormData();
      formData.append('prompt', params.prompt);
      formData.append('height', params.height.toString());
      formData.append('width', params.width.toString());
      formData.append('steps', (params.steps || 30).toString());
      formData.append('samples', (params.samples || 1).toString());
      formData.append('cfg_scale', (params.cfg_scale || 7).toString());

      const response = await axios.post<StabilityResponse>(
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
          },
        }
      );

      const base64 = response.data.artifacts[0].base64;
      const imageUrl = `data:image/png;base64,${base64}`;

      return { imageUrl };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid Stability AI API key');
      }
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before generating again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to generate image with Stability AI');
    }
  },
};
