export interface UVData {
  uv: number;
  uv_max: number;
  ozone: number;
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

export interface APIResponse {
  city: string;
  uv: { result: UVData };
  weather: WeatherData;
}
