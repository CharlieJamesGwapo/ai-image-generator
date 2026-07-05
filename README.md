# AI Image Generator

A client-side web app for generating AI images using DALL-E 3 or Stability AI.

## Features

- Generate images from text prompts
- Support for DALL-E 3 and Stability AI
- Multiple aspect ratios (1:1, 4:3, 16:9, 9:16, custom)
- Image history with search
- Favorite images
- Download as PNG
- Dark mode
- All data stored locally

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and add your API keys
4. Run dev server: `npm run dev`
5. Open http://localhost:3000

## Environment Variables

- `NEXT_PUBLIC_OPENAI_API_KEY` - Your OpenAI API key for DALL-E 3
- `NEXT_PUBLIC_STABILITY_API_KEY` - Your Stability AI API key

## Pages

- `/` - Main image generator
- `/gallery` - View all generated images
- `/favorites` - View favorite images only
- `/settings` - Manage API keys and preferences

## Tech Stack

- Next.js 14
- TypeScript
- React 18
- Tailwind CSS
- TanStack Query
- localStorage for persistence
