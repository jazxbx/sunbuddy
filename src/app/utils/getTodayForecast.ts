import { UVApiResponse } from '../types';

export function getTodayUVData(uvData: UVApiResponse) {
  if (!uvData) return [];

  const { history = [], forecast = [], now } = uvData;

  //local midnight to next midnight
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // combine past + now + future forecasts
  const all = [...history, now, ...forecast].filter(Boolean);

  // filter only today's 24 hours
  return all.filter((item) => {
    const local = new Date(item.time);
    return local >= startOfDay && local <= endOfDay;
  });
}
