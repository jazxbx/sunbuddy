'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';

import { APIResponse } from './types';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<APIResponse | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect for fetching data?
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError(null);
    setData(null);
    setCity('');

    try {
      const res = await fetch(`/api/uv?city=${city}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch data');
      }
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='p-6'>
      <div>sunbuddy</div>
      <SearchBar
        placeholder='Enter city...'
        city={city}
        onChange={(e) => setCity(e.target.value)}
        onSubmit={handleSearch}
      />

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {data && (
        <div className='mt-6 p-4 border rounded-lg'>
          <div className='flex gap-2 content-center'>
            <div className='text-xl font-semibold'>{data.city}</div>
            <div className='font-semibold'>{data.weather.sys.country}</div>
          </div>
          <p className='text-4xl font-extrabold'>
            UV Index: {data.uv?.result?.uv.toFixed(1)}
          </p>
          <p>Max UV: {data.uv.result.uv_max.toFixed(1)}</p>
          <div>
            {' '}
            <p>Temperature: {data.weather?.main?.temp} °C</p>
            <p>{data.weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
