export function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatFraction(val: number): string {
  if (val === 0.25) return '1/4';
  if (val === 0.33) return '1/3';
  if (val === 0.5) return '1/2';
  if (val === 0.66) return '2/3';
  if (val === 0.75) return '3/4';
  if (val === 1.5) return '1 1/2';
  if (val === 2.5) return '2 1/2';
  
  if (Number.isInteger(val)) return val.toString();
  return (Math.round(val * 10) / 10).toString();
}
