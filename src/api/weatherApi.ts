import type { GeocodingResponse, GeoLocation, WeatherApiResponse } from '../types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('接口请求失败');
  }
  return response.json() as Promise<T>;
}

export async function searchCity(city: string): Promise<GeoLocation> {
  const params = new URLSearchParams({
    name: city.trim(),
    count: '1',
    language: 'zh',
    format: 'json'
  });
  const data = await fetchJson<GeocodingResponse>(`${GEOCODING_URL}?${params.toString()}`);
  const result = data.results?.[0];
  if (!result) {
    throw new Error('未找到该城市，请检查名称后重试');
  }
  return result;
}

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: 'auto',
    forecast_days: '7',
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max'
    ].join(',')
  });

  const data = await fetchJson<WeatherApiResponse>(`${FORECAST_URL}?${params.toString()}`);
  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('天气数据暂时不完整，请稍后重试');
  }
  return data;
}
