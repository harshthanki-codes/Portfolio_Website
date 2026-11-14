export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/Portfolio_Website';

export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
