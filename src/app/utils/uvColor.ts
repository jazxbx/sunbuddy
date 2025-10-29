export function getUVColor(uvi: number): string {
  if (uvi < 3) return '#4CAF50'; // green
  if (uvi < 6) return '#FFCC00'; // yellow
  if (uvi < 8) return '#FF9800'; // orange
  if (uvi < 11) return '#F44336'; // red
  return '#9C27B0'; // purple
}
