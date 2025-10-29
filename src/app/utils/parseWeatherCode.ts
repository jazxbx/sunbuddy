export function parseWeatherCode(code: number) {
  const map = new Map<number, { label: string; icon: string }>([
    [0, { label: 'clear sky', icon: '☀️' }],
    [1, { label: 'mainly clear', icon: '🌤️' }],
    [2, { label: 'partly cloudy', icon: '⛅' }],
    [3, { label: 'overcast', icon: '☁️' }],
    [45, { label: 'fog', icon: '🌫️' }],
    [48, { label: 'rime fog', icon: '🌫️' }],
    [51, { label: 'light drizzle', icon: '🌦️' }],
    [53, { label: 'moderate drizzle', icon: '🌦️' }],
    [55, { label: 'dense drizzle', icon: '🌧️' }],
    [61, { label: 'light rain', icon: '🌦️' }],
    [63, { label: 'moderate rain', icon: '🌧️' }],
    [65, { label: 'heavy rain', icon: '🌧️' }],
    [95, { label: 'thunderstorm', icon: '⛈️' }],
    [96, { label: 'thunderstorm w/ hail', icon: '🌩️' }],
    [99, { label: 'heavy hailstorm', icon: '🌩️' }],
  ]);

  return map.get(code) ?? { label: 'Unknown', icon: '❓' };
}
