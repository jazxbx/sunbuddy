import { NextResponse } from 'next/server';

const getCoords = async (
  city: string
): Promise<{ lat: number; lon: number } | null> => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  const data = await res.json();
  //   console.log(data);
  if (data && data.length > 0) {
    return { lat: data[0].lat, lon: data[0].lon };
  }
  return null;
};

// fetching from openweather
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    const coords = await getCoords(city);
    if (!coords) {
      return NextResponse.json(
        {
          error: 'Could not find coordinates for location',
        },
        { status: 404 }
      );
    }

    const { lat, lon } = coords;

    const uvRes = await fetch(
      `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
      {
        headers: { 'x-access-token': process.env.NEXT_PUBLIC_OPENUV_API_KEY! },
      }
    );
    const uvData = await uvRes.json();

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();

    return NextResponse.json({
      city,
      uv: uvData,
      weather: weatherData,
    });
  } catch (error) {
    if (error instanceof ReferenceError)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
