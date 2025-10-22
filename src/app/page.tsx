'use client';

import Header from './components/Header';
import { APIResponse } from './types';
import { WeatherDisplay } from './components/WeatherDisplay';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const [city, setCity] = useState('');

  console.log({ city });

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
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  async function fetchWeather() {
    // use current city state
    const weatherRes = await fetch(
      `/api/weather?city=${encodeURIComponent(city)}`
    );
    if (!weatherRes.ok) {
      throw new Error('Failed to fetch weather');
    }
    console.log('Running fetchWeather for:', city);
    return await weatherRes.json();
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: fetchWeather,
    enabled: !!city, // prevent useQuery from firing before city state is set
  });

  //handleSearch

  const handleSearch = (city: string) => {
    setCity(city);
  };

  console.log(data);

  return (
    <>
      {/* bento grid container */}
      <main className='h-screen w-full justify-center items-center '>
        {/* header- top left */}
        <Header onSubmit={handleSearch} />
        <div className='flex flex-col gap-2'></div>
      </main>
    </>
  );
}
