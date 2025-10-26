'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoords, fetchUV, fetchWeather } from './lib/api/api';
import {
  CoordsSchema,
  FormattedWeather,
  UVApiResponse,
  WeatherSchema,
} from './types';
import { formatWeatherData } from './utils/formatWeather';
import { match } from './utils/timeMatcher';
import { WeatherDisplay } from './components/WeatherDisplay';

export default function HomePage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const [formattedWeatherData, setFormattedWeatherData] = useState<
    FormattedWeather[] | null
  >(null);
  const [currentWeather, setCurrentWeather] = useState<FormattedWeather | null>(
    null
  );

  //get user coords
  useEffect(() => {
    if (!navigator?.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.error('Geolocation error:', err)
    );
  }, []);

  //fetch coords
  const {
    data: locationData,
    isLoading: locationLoading,
    isError: locationError,
  } = useQuery<CoordsSchema>({
    queryKey: ['reverseGeocode', coords],
    queryFn: () => fetchCoords(coords!.lat, coords!.lon),
    enabled: !!coords, // only run when coords exist
  });

  const city = locationData?.city || '';

  //weather data
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery<WeatherSchema>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: !!city, // run only once city exists
  });

  //uv data

  const {
    data: uvData,
    isLoading: uvLoading,
    isError: uvError,
  } = useQuery<UVApiResponse>({
    queryKey: ['uv', coords],
    queryFn: () => fetchUV(coords!.lat, coords!.lon),
    enabled: !!coords,
  });

  console.log({ locationData, weatherData, uvData });

  //cleaned up data

  useEffect(() => {
    if (!weatherData) return;
    setFormattedWeatherData(formatWeatherData(weatherData));
  }, [weatherData]);

  useEffect(() => {
    if (!formattedWeatherData) return;
    setCurrentWeather(match(formattedWeatherData));
  }, [formattedWeatherData]);

  console.log({ currentWeather });

  return (
    <main className='h-screen w-full flex flex-col justify-center items-center'>
      {locationLoading && <p>Detecting your location...</p>}
      {locationError && <p>Unable to detect location.</p>}
      {weatherLoading && <p>Fetching weather data...</p>}
      {weatherError && <p>Failed to load weather.</p>}
      <p>{locationData?.city}</p>
      <p>{locationData?.country}</p>
      <WeatherDisplay city={city} currentWeather={currentWeather} />
    </main>
  );
}
