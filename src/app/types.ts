export interface CoordsSchema {
  city: string;
  country: string;
}

export interface WeatherSchema {
  city: string;
  region: string;
  country: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  temperature: {
    hourly_time: string[];
    hourly_temp: number[];
    hourly_code: number[];
  };
  uv: {
    days: string[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
  };
}

export interface FormattedWeather {
  hour24: string;
  hour12: string;
  temp: number;
  code: {
    label: string;
    icon: string;
  };
}

export interface UVPoint {
  time: string;
  uvi: number;
}

export interface UVApiResponse {
  ok: boolean;
  latitude: number;
  longitude: number;
  now: UVPoint;
  history?: UVPoint[];
  forecast?: UVPoint[];
}

export interface UVDayData {
  date: string;
  points: UVPoint[];
  peakUV: number;
  peakTime: string;
}

export type UVCategory = 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
