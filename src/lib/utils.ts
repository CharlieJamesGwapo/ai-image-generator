export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const downloadImage = async (imageUrl: string, prompt: string): Promise<void> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.slice(0, 50).replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download image');
  }
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Copy failed:', error);
    throw new Error('Failed to copy to clipboard');
  }
};

export const enhancePrompt = (prompt: string): string => {
  const enhancements: Record<string, string> = {
    'simple': 'highly detailed, professional, photorealistic, 4k, cinematic',
    'landscape': 'sweeping vista, dramatic lighting, rich colors, sharp focus',
    'portrait': 'sharp focus, beautiful face, soft lighting, studio quality',
    'abstract': 'abstract expressionism, dynamic composition, vivid colors',
  };

  const lowerPrompt = prompt.toLowerCase();
  for (const [keyword, enhancement] of Object.entries(enhancements)) {
    if (lowerPrompt.includes(keyword)) {
      return `${prompt}, ${enhancement}`;
    }
  }

  return `${prompt}, highly detailed, professional quality`;
};

export const getAspectRatioDimensions = (ratio: string): { width: number; height: number } => {
  const ratios: Record<string, { width: number; height: number }> = {
    '1:1': { width: 1024, height: 1024 },
    '4:3': { width: 1024, height: 768 },
    '16:9': { width: 1024, height: 576 },
    '9:16': { width: 576, height: 1024 },
  };
  return ratios[ratio] || { width: 1024, height: 1024 };
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const calculateStorageUsage = (base64String: string): number => {
  return Math.ceil((base64String.length * 3) / 4);
};

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};
