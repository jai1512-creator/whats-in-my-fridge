/**
 * Safe fallback image SVG data URI if external image fails to load or offline
 */
export const DEFAULT_FOOD_IMAGE_FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#F5EFE6"/>
  <circle cx="400" cy="240" r="140" fill="#EADFD2"/>
  <circle cx="400" cy="240" r="120" fill="#FAF8F5"/>
  <text x="400" y="250" font-family="system-ui, sans-serif" font-size="48" text-anchor="middle" fill="#A27F5F">🍳</text>
  <text x="400" y="320" font-family="Georgia, serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#674B34">Delicious Home Recipe</text>
</svg>
`);

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src !== DEFAULT_FOOD_IMAGE_FALLBACK) {
    target.src = DEFAULT_FOOD_IMAGE_FALLBACK;
  }
}
