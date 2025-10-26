import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/api';
import { WeatherSchema } from '@/app/types';

export function useWeather(city: string) {
  return useQuery<WeatherSchema>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
}
