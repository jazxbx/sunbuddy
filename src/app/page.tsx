'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';

import { APIResponse } from './types';
import UVDisplay from './components/UVDisplay';

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

      {loading ? (
        <div className='p-4 rounded-xl shadow-md bg-gray-200 text-gray-500 text-center'>
          Loading...
        </div>
      ) : data ? (
        <UVDisplay
          uv={data?.uv.result?.uv}
          uv_max={data?.uv.result.uv_max}
          safe_exposure_time={data?.uv.result.safe_exposure_time}
        />
      ) : (
        <div className='p-4 rounded-xl shadow-md bg-gray-200 text-gray-500 text-center'>
          Search for a city
        </div>
      )}
    </main>
  );
}
