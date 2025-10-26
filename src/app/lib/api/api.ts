import { CoordsSchema, WeatherSchema } from '@/app/types';

export async function fetchCoords(
  lat: number,
  lon: number
): Promise<CoordsSchema> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error('Failed to fetch location');
  return res.json();
}

export async function fetchWeather(city: string): Promise<WeatherSchema> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  console.log('Fetching weather for:', city);
  return res.json();
}

export async function fetchUV(lat: number, lon: number) {
  const res = await fetch(
    `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
  );
  if (!res.ok) throw new Error('Failed to fetch UV');
  return res.json();
}
