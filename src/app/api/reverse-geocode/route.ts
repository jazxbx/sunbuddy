import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );

    if (!res.ok) throw new Error('Failed to fetch from OpenWeather');
    const data = await res.json();

    const city = data[0]?.name || 'Unknown';
    const state = data[0]?.state || '';
    const country = data[0]?.country || '';

    return NextResponse.json({ city, state, country });
  } catch (error) {
    if (error instanceof ReferenceError)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
