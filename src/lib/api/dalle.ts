import axios from 'axios';

export interface DalleGenerationParams {
  prompt: string;
  size: '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  n?: number;
}

export interface DalleResponse {
  data: Array<{
    url: string;
    revised_prompt: string;
  }>;
}

export const dalleApi = {
  generateImage: async (
    params: DalleGenerationParams,
    apiKey: string
  ): Promise<{ imageUrl: string; revisedPrompt?: string }> => {
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await axios.post<DalleResponse>(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt: params.prompt,
          size: params.size,
          quality: params.quality || 'standard',
          n: 1,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        imageUrl: response.data.data[0].url,
        revisedPrompt: response.data.data[0].revised_prompt,
      };
    } catch (error) {
      const err = error as { response?: { status: number; data?: { error?: { message: string } } } };
      if (err.response?.status === 401) {
        throw new Error('Invalid OpenAI API key');
      }
      if (err.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before generating again.');
      }
      throw new Error(err.response?.data?.error?.message || 'Failed to generate image with DALL-E 3');
    }
  },
};
