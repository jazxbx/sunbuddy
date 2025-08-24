export interface UVData {
  uv: number;
  uv_max: number;
  safe_exposure_time: SafeExposureTime;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: Array<{
    description: string;
  }>;

  wind: {
    speed: number;
    deg: number;
  };
}

export type SkinType = 1 | 2 | 3 | 4 | 5 | 6;

export interface SafeExposureTime {
  st1: number;
  st2: number;
  st3: number;
  st4: number;
  st5: number;
  st6: number;
}

export interface APIResponse {
  city: string;
  uv: { result: UVData; error: string };
  weather: WeatherData;
}
