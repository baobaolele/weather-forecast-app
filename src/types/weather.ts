export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface GeocodingResponse {
  results?: GeoLocation[];
}

export interface WeatherApiResponse {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    weather_code?: number;
    pressure_msl?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    apparent_temperature?: number[];
    relative_humidity_2m?: number[];
    precipitation_probability?: number[];
    precipitation?: number[];
    weather_code?: number[];
    pressure_msl?: number[];
    cloud_cover?: number[];
    visibility?: number[];
    wind_speed_10m?: number[];
    wind_direction_10m?: number[];
    uv_index?: number[];
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
    wind_speed_10m_max?: number[];
    uv_index_max?: number[];
  };
  timezone?: string;
}

export interface CurrentWeather {
  cityName: string;
  locationLabel: string;
  time: string;
  temperature: number | null;
  apparentTemperature: number | null;
  humidity: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  pressure: number | null;
  windSpeed: number | null;
  windDirection: number | null;
}

export interface HourlyWeather {
  time: string;
  hourLabel: string;
  temperature: number | null;
  apparentTemperature: number | null;
  humidity: number | null;
  precipitationProbability: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  pressure: number | null;
  cloudCover: number | null;
  visibility: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  uvIndex: number | null;
  isCurrent: boolean;
}

export interface DailyWeather {
  date: string;
  dateLabel: string;
  weekLabel: string;
  weatherCode: number | null;
  maxTemperature: number | null;
  minTemperature: number | null;
  precipitationProbabilityMax: number | null;
  windSpeedMax: number | null;
  uvIndexMax: number | null;
}

export interface WeatherViewData {
  location: GeoLocation;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface TrendAnalysisResult {
  temperatureText: string;
  rainText: string;
  windText: string;
  uvText: string;
  suggestions: string[];
  level: 'good' | 'notice' | 'warning';
}

export interface WeatherIndicator {
  label: string;
  value: string;
  unit?: string;
  description: string;
}
