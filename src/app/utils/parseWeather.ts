export function parseWeather(code: number) {
  const map = new Map<number, { label: string; icon: string }>([
    [0, { label: 'Clear sky', icon: '☀️' }],
    [1, { label: 'Mainly clear', icon: '🌤️' }],
    [2, { label: 'Partly cloudy', icon: '⛅' }],
    [3, { label: 'Overcast', icon: '☁️' }],
    [45, { label: 'Fog', icon: '🌫️' }],
    [48, { label: 'Rime fog', icon: '🌫️' }],
    [51, { label: 'Light drizzle', icon: '🌦️' }],
    [53, { label: 'Moderate drizzle', icon: '🌦️' }],
    [55, { label: 'Dense drizzle', icon: '🌧️' }],
    [61, { label: 'Light rain', icon: '🌦️' }],
    [63, { label: 'Moderate rain', icon: '🌧️' }],
    [65, { label: 'Heavy rain', icon: '🌧️' }],
    [95, { label: 'Thunderstorm', icon: '⛈️' }],
    [96, { label: 'Thunderstorm w/ hail', icon: '🌩️' }],
    [99, { label: 'Heavy hailstorm', icon: '🌩️' }],
  ]);

  return map.get(code) ?? { label: 'Unknown', icon: '❓' };
}
