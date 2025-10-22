import Card from './Card';

export function WeatherDisplay({ city }) {
  return (
    <Card>
      <div className='flex justify-between '>
        <div>
          {' '}
          <h2 className='text-base md:text-2xl'>{city}</h2>
          <h4 className='text-xs'>9:00 pm</h4>
          <h4 className='text-xs'>partly cloudy</h4>
        </div>
        <div>image here</div>
      </div>
      <div className='flex mt-10 justify-center'>
        <p className='text-6xl'>18</p>
        <div className='flex items-start justify-start'>
          <button className='px-1 cursor-pointer'>ºC</button>
          <p>|</p>
          <button className='px-1 cursor-pointer'>ºF</button>
        </div>
      </div>
    </Card>
  );
}
