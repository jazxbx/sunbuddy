import { FormattedWeather, WeatherSchema } from '../types';
import Card from './Card';

type WeatherDisplayProps = {
  weatherData?: WeatherSchema;
  currentWeather: FormattedWeather | null;
};

// TODO: Add C to F converter
export function WeatherDisplay({
  weatherData,
  currentWeather,
}: WeatherDisplayProps) {
  if (!weatherData || !currentWeather) return <p>Loading...</p>;
  const { city, country } = weatherData;

  return (
    <Card>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>{city}</h2>
          <h6 className='text-gray-600 text-xs mb-2'>{country}</h6>
          <p>{currentWeather.code.label}</p>
        </div>
        <div className='text-3xl'> {currentWeather.code.icon} </div>
      </div>
      <div className='flex mt-10 justify-center'>
        <p className='text-6xl'>{currentWeather.temp}</p>
        <div className='flex items-start justify-start'>
          <button className='px-1 cursor-pointer'>ºC</button>
          {/* <p>|</p>
          <button className='px-1 cursor-pointer'>ºF</button> */}
        </div>
      </div>
    </Card>
  );
}
