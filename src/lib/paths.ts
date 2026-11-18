export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/Portfolio_Website';

/**
 * Prefix a static path with the GitHub Pages basePath (/Portfolio_Website).
 * Always returns a clean, correctly prefixed path for images, fonts, and assets.
 */
export function assetPath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}

// Alias for backwards compatibility
export const getAssetPath = assetPath;
