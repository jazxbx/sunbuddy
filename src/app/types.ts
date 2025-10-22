export interface APIResponse {
  city: string;
  region: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  uv: {
    days: string[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
  };
  temperature: {
    hourly_time: string[];
    hourly_temp: number[];
    hourly_code: number[];
  };
}
