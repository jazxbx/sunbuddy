import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon' }, { status: 500 });
  }

  try {
    const uvRes = await fetch(
      `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
    );
    if (!uvRes.ok) throw new Error('Failed to fetch uv data');

    const uvData = await uvRes.json();
    return NextResponse.json(uvData);
  } catch (error) {
    if (error instanceof ReferenceError)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
