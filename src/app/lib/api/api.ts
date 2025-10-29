import { CoordsSchema, WeatherSchema, UVApiResponse } from '@/app/types';

/**
 * Reverse geocoding: get city name from coordinates
 */
export async function fetchCoords(
  lat: number,
  lon: number
): Promise<CoordsSchema> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error('Failed to fetch location');
  return res.json();
}

/**
 * Weather: get forecast by city name
 */
export async function fetchWeather(city: string): Promise<WeatherSchema> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  console.log('Fetching weather for:', city);
  return res.json();
}

/**
 * UV: fetch by coordinates only
 */
export async function fetchUV(
  lat: number,
  lon: number
): Promise<UVApiResponse> {
  const res = await fetch(
    `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
  );
  if (!res.ok) throw new Error('Failed to fetch UV');
  return res.json();
}

/**
 * Convert city name → lat/lon
 */
export async function fetchCoordsByCity(
  city: string
): Promise<{ lat: number; lon: number }> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );
  if (!res.ok) throw new Error('Failed to fetch coordinates for city');

  const data = await res.json();
  if (!data.results?.length) throw new Error('City not found');

  const { latitude, longitude } = data.results[0];
  return { lat: latitude, lon: longitude };
}
