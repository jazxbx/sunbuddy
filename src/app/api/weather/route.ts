import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter required' },
      { status: 400 }
    );
  }

  try {
    // get latitude & longitude from Open-Meteo Geocoding API
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!geoRes.ok) throw new Error('Failed to fetch city coordinates');
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const { latitude, longitude, name, country, admin1 } = geoData.results[0];

    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      daily: 'uv_index_max,uv_index_clear_sky_max',
      hourly: 'temperature_2m,weather_code',
      timezone: 'auto',
    });

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`
    );
    if (!weatherRes.ok) throw new Error('Failed to fetch weather data');

    const weatherData = await weatherRes.json();

    // Combine geocode data + weather data
    return NextResponse.json({
      city: name,
      region: admin1,
      country: country,
      coordinates: { longitude, latitude },
      uv: {
        days: weatherData.daily.time,
        uv_index_max: weatherData.daily.uv_index_max,
        uv_index_clear_sky_max: weatherData.daily.uv_index_clear_sky_max,
      },
      temperature: {
        hourly_time: weatherData.hourly.time.slice(0, 24),
        hourly_temp: weatherData.hourly.temperature_2m.slice(0, 24),
        hourly_code: weatherData.hourly.weather_code.slice(0, 24),
      },
    });
  } catch (error) {
    if (error instanceof ReferenceError)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
