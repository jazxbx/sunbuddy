'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import UVDisplay from './components/UVDisplay';

import { APIResponse } from './types';
import { WeatherDisplay } from './components/WeatherDisplay';

export default function HomePage() {
  const [city, setCity] = useState('');
  const [data, setData] = useState<APIResponse | null>(null);
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

        // console.log({ data });

        const cityName = data[0].name;
        setCity(cityName);
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

        if (uvData.uv.error) {
          setError(uvData.uv.error);
        }
        // console.log({ uvData });
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
      setData(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // console.log(error || (data && data.uv.error));

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

        {/*weather card below header left  */}
        <section className='border-2 md:col-start-1 bg-blue-200 rounded-2xl p-6 flex justify-center items-center'>
          {loading ? (
            <p className='text-center text-gray-500'>Loading weather...</p>
          ) : error ? (
            <p className='text-center text-red-600'>{error}</p>
          ) : data ? (
            <WeatherDisplay
              city={data.city}
              country={data.weather.sys.country}
              temperature={data.weather.main.temp}
              description={data.weather.weather[0].description}
            />
          ) : null}
        </section>

        {/* uv right  */}
        <section className='md:col-start-2 md:row-start-1 md:row-end-3 md:col-end-4 rounded-2xl'>
          {loading ? (
            <p className='text-center text-gray-500'>Loading uv data...</p>
          ) : error ? (
            <p className='text-center text-gray-500'>{error}</p>
          ) : (
            data && (
              <UVDisplay
                uv={data.uv.result.uv}
                uv_max={data.uv.result.uv_max}
                safe_exposure_time={data.uv.result.safe_exposure_time}
              />
            )
          )}
        </section>
      </main>
    </>
  );
}
