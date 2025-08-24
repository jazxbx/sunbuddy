interface WeatherDisplayProps {
  city: string;
  country: string;
  temperature: number;
  description: string;
}

export function WeatherDisplay({
  city,
  country,
  temperature,
  description,
}: WeatherDisplayProps) {
  return (
    <div className=' flex items-center gap-3 p-4 rounded-2xl'>
      <div>
        <div className='flex gap-3 text-lg font-semibold'>
          <h2>{city}</h2>
          <h2>{country}</h2>
        </div>
        <p className='text-2xl font-bold'>{Math.round(temperature)}°C</p>
        <p className='text-sm capitalize text-gray-600'>{description}</p>
      </div>
    </div>
  );
}
