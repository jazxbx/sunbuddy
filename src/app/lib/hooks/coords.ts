import { useQuery } from '@tanstack/react-query';
import { fetchCoords } from '../api/api';
import { CoordsSchema } from '@/app/types';

export function useCityFromCoords(coords: { lat: number; lon: number } | null) {
  return useQuery<CoordsSchema>({
    queryKey: ['reverseGeocode', coords],
    queryFn: () => fetchCoords(coords!.lat, coords!.lon),
    enabled: !!coords,
  });
}
