import { NextResponse } from 'next/server';

const getCoords = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
  );
  const data = await res.json();
  console.log(data);
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City Required' }, { status: 400 });
  }
}
