import { useState } from 'react';
import { FormattedWeather, WeatherSchema } from '../types';
import { convertToFahrenheit } from '../utils/tempConverter';
import Card from './Card';

type WeatherDisplayProps = {
  weatherData?: WeatherSchema;
  currentWeather: FormattedWeather | null;
};

export function WeatherDisplay({
  weatherData,
  currentWeather,
}: WeatherDisplayProps) {
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weatherData || !currentWeather) return <p>Loading...</p>;
  const { city, country } = weatherData;

  const displayedTemp = isCelsius
    ? currentWeather.temp
    : convertToFahrenheit(currentWeather.temp);

  return (
    <Card>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-xl font-semibold mb-1'>{city}</h2>
          <p className='text-gray-700 text-xs md:text-sm mb-4'>{country}</p>
          <p>{currentWeather.code.label}</p>
        </div>
        <div className='text-4xl'> {currentWeather.code.icon} </div>
      </div>
      <div className='flex mt-10 justify-center'>
        <p className='text-6xl font-medium'>{displayedTemp}</p>
        <div className='flex items-start justify-start text-gray-400 gap-2'>
          <button
            className={`${
              isCelsius ? 'font-bold text-black' : 'text-gray-400'
            }`}
            onClick={() => setIsCelsius(true)}
          >
            ºC
          </button>
          <p>|</p>
          <div className='flex items-start justify-start'>
            <button
              className={`${
                !isCelsius ? 'font-bold text-black' : 'text-grey-400'
              }`}
              onClick={() => setIsCelsius(false)}
            >
              ºF
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
