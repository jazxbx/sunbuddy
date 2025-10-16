'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';

import { APIResponse } from './types';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<APIResponse | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // get users location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;

        // Get city name from coordinates
        const res = await fetch(
          `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
        );
        const locationData = await res.json();

        const cityName = locationData.city || 'Unknown';
        setCity(cityName);

        // Immediately fetch weather for that city
        const weatherRes = await fetch(
          `/api/weather?city=${encodeURIComponent(cityName)}`
        );
        if (!weatherRes.ok) throw new Error('Failed to fetch weather');
        const data = await weatherRes.json();
        console.log(data);

        //Store weather in state
        setData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to get location or weather');
      }
    });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    // use search input directly
    try {
      //  Use searchInput directly, not city
      const res = await fetch(
        `/api/weather?city=${encodeURIComponent(searchInput)}`
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch weather data');
      }

      const data = await res.json();
      console.log(data);
      setData(data);
      setCity(data.city || searchInput);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setSearchInput('');
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar
        placeholder='Enter city...'
        searchInput={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={handleSearch}
      />
      {/* bento grid container */}
      <main className='grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-2 md:gap-4'>
        {/* header- top left */}
        <section className='bg-amber-200 border-2 flex flex-col gap-2 justify-center items-center md:col-span-1 md:row-span-1 rounded-2xl p-6'>
          <h1 className='text-4xl font-semibold'>Sunbuddy </h1>
          <p className='font-medium text-center'>
            your sunny sidekick for safe sun time
          </p>
        </section>
      </main>
    </>
  );
}
