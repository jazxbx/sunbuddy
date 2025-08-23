'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import UVDisplay from './components/UVDisplay';

import { APIResponse } from './types';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<APIResponse | null>();
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // get users location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        //open weather to get city
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const data = await res.json();

        console.log({ data });

        const cityName = data[0].name;
        setCity(cityName);
        setError('Could not find city from your location');
      } catch (err) {
        console.error(err);
        setError('Failed to get city from coordinates');
      }
    });
  }, []);

  useEffect(() => {
    if (!city) return;

    async function fetchUV() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(`/api/uv?city=${city}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch UV data');
        }
        const uvData = await res.json();
        setData(uvData);
        console.log({ uvData });
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUV();
  }, [city]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;

    setLoading(true);
    setError(null);
    setData(null);
    setCity(searchInput);
    setSearchInput('');

    try {
      const res = await fetch(`/api/uv?city=${city}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch UV data');
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
        searchInput={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSubmit={handleSearch}
      />

      {loading ? (
        <div className='p-4 rounded-xl shadow-md bg-gray-200 text-gray-500 text-center'>
          Loading...
        </div>
      ) : error ? (
        <div className='p-4 rounded-xl shadow-md bg-red-100 text-red-600 text-center'>
          {error}
        </div>
      ) : data ? (
        <div>
          <div>
            <div>{city}</div>
            <div>{data.weather.sys.country}</div>
          </div>
          <UVDisplay
            uv={data.uv.result.uv}
            uv_max={data.uv.result.uv_max}
            safe_exposure_time={data.uv.result.safe_exposure_time}
          />
        </div>
      ) : (
        <div className='p-4 rounded-xl shadow-md bg-gray-200 text-gray-500 text-center'>
          Detecting location or enter a city above
        </div>
      )}
    </main>
  );
}
