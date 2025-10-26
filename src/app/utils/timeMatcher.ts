import { FormattedWeather } from '../types';

export function match(
  formattedWeatherData: FormattedWeather[] | null
): FormattedWeather | null {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const currHour = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    formattedWeatherData?.find(
      (data: FormattedWeather) => data.hour24 === currHour
    ) ?? null
  );
}
