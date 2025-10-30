'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCoords,
  fetchCoordsByCity,
  fetchUV,
  fetchWeather,
} from './lib/api/api';
import {
  CoordsSchema,
  FormattedWeather,
  UVApiResponse,
  WeatherSchema,
} from './types';
import { formatWeatherData } from './utils/formatWeather';
import { match } from './utils/timeMatcher';
import { WeatherDisplay } from './components/WeatherDisplay';
import UVDisplay from './components/UVDisplay';
import SkinTypeSelector from './components/SkinTypeSelector';
import Header from './components/Header';
import SafetyTips from './components/SafetyTips';

export default function HomePage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const [formattedWeatherData, setFormattedWeatherData] = useState<
    FormattedWeather[] | null
  >(null);
  const [currentWeather, setCurrentWeather] = useState<FormattedWeather | null>(
    null
  );
  // handle manual city search
  const handleSearch = (cityName: string) => {
    setSearchCity(cityName);
    setCoords(null); //disable geoloc when searching
  };

  // get user's coordinates on mount
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

  // reverse geocode (lat/lon -> city)
  const {
    data: locationData,
    isLoading: locationLoading,
    isError: locationError,
  } = useQuery<CoordsSchema>({
    queryKey: ['reverseGeocode', coords],
    queryFn: () => fetchCoords(coords!.lat, coords!.lon),
    enabled: !!coords,
  });

  const detectedCity = locationData?.city || '';
  const activeCity = searchCity || detectedCity;

  // weather data
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery<WeatherSchema>({
    queryKey: ['weather', activeCity],
    queryFn: () => fetchWeather(activeCity),
    enabled: !!activeCity,
  });

  // uv data
  const {
    data: uvData,
    isLoading: uvLoading,
    isError: uvError,
  } = useQuery<UVApiResponse>({
    queryKey: ['uv', searchCity || coords],
    queryFn: async () => {
      if (searchCity) {
        const { lat, lon } = await fetchCoordsByCity(searchCity);
        return fetchUV(lat, lon);
      }
      return fetchUV(coords!.lat, coords!.lon);
    },
    enabled: !!(coords || searchCity),
  });

  // format + match weather data
  useEffect(() => {
    if (!weatherData) return;
    setFormattedWeatherData(formatWeatherData(weatherData));
  }, [weatherData]);

  useEffect(() => {
    if (!formattedWeatherData) return;
    setCurrentWeather(match(formattedWeatherData));
  }, [formattedWeatherData]);

  // console.log({ weatherData, currentWeather, locationData, uvData });
  // console.log('curr uv:', uvData?.now.uvi);

  return (
    <>
      <Header onSubmit={handleSearch} />
      <main className='flex flex-col gap-2 md:gap-3 pt-3 md:grid md:grid-cols-[1fr_1fr_1.5fr] md:grid-rows-[1fr_1fr]'>
        {locationLoading && <p>Detecting your location...</p>}
        {locationError && <p>Unable to detect location.</p>}
        {weatherLoading && <p>Fetching weather data...</p>}
        {weatherError && <p>Failed to load weather.</p>}
        {uvLoading && <p>Fetching UV data...</p>}
        {uvError && <p>Failed to load UV index.</p>}
        <div>
          {weatherData && (
            <WeatherDisplay
              weatherData={weatherData}
              currentWeather={currentWeather}
            />
          )}
        </div>

        <div>
          <SafetyTips />
        </div>

        <div className='row-span-2'>
          {uvData && <UVDisplay uvData={uvData} />}
        </div>
        <div className='col-span-2'>
          {uvData && <SkinTypeSelector currentUVI={uvData.now.uvi} />}
        </div>
      </main>
    </>
  );
}
