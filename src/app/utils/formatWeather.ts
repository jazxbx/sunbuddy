import { WeatherSchema, FormattedWeather } from '../types';
import { parseWeatherCode } from './parseWeatherCode';

export function formatWeatherData(
  weatherData: WeatherSchema,
  maxHours = 24
): FormattedWeather[] {
  if (!weatherData) return [];

  return weatherData?.temperature.hourly_time
    .slice(0, maxHours)
    .map((time: string, index: number) => ({
      hour12: new Date(time).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      hour24: new Date(time).toLocaleString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
      temp: Math.round(weatherData.temperature.hourly_temp[index]),
      code: parseWeatherCode(weatherData.temperature.hourly_code[index]),
    }));
}
