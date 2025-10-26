import { FormattedWeather } from '../types';
import Card from './Card';

type WeatherDisplayProps = {
  city: string;
  currentWeather: FormattedWeather | null;
};

export function WeatherDisplay({ city, currentWeather }: WeatherDisplayProps) {
  if (!currentWeather) return <p>Loading...</p>;
  return (
    <Card>
      <div className='flex justify-between '>
        <div>
          {' '}
          <h2 className='text-base md:text-2xl'>{city}</h2>
          <h4 className='text-xs'>{currentWeather.hour24}</h4>
          <p>
            {currentWeather.code.icon} {currentWeather.code.label}
          </p>
        </div>
        <div>image here</div>
      </div>
      <div className='flex mt-10 justify-center'>
        <p className='text-6xl'>{currentWeather.temp}</p>
        <div className='flex items-start justify-start'>
          <button className='px-1 cursor-pointer'>ºC</button>
          <p>|</p>
          <button className='px-1 cursor-pointer'>ºF</button>
        </div>
      </div>
    </Card>
  );
}
