import type { GeoLocation, HourlyWeather, WeatherApiResponse, WeatherViewData } from '../types/weather';
import { formatDate, formatHour, formatWeekday } from './format';

function valueAt(values: number[] | undefined, index: number): number | null {
  const value = values?.[index];
  return value === undefined || value === null || Number.isNaN(value) ? null : value;
}

function findStartIndex(times: string[] | undefined, currentTime?: string): number {
  if (!times?.length) {
    return 0;
  }
  const nowTime = currentTime ? new Date(currentTime).getTime() : Date.now();
  const index = times.findIndex((time) => new Date(time).getTime() >= nowTime - 30 * 60 * 1000);
  return index >= 0 ? index : 0;
}

export function transformWeather(data: WeatherApiResponse, location: GeoLocation): WeatherViewData {
  const current = data.current ?? {};
  const hourly = data.hourly ?? {};
  const daily = data.daily ?? {};
  const startIndex = findStartIndex(hourly.time, current.time);

  const hourlyItems: HourlyWeather[] = (hourly.time ?? []).slice(startIndex, startIndex + 24).map((time, offset) => {
    const index = startIndex + offset;
    return {
      time,
      hourLabel: offset === 0 ? '现在' : formatHour(time),
      temperature: valueAt(hourly.temperature_2m, index),
      apparentTemperature: valueAt(hourly.apparent_temperature, index),
      humidity: valueAt(hourly.relative_humidity_2m, index),
      precipitationProbability: valueAt(hourly.precipitation_probability, index),
      precipitation: valueAt(hourly.precipitation, index),
      weatherCode: valueAt(hourly.weather_code, index),
      pressure: valueAt(hourly.pressure_msl, index),
      cloudCover: valueAt(hourly.cloud_cover, index),
      visibility: valueAt(hourly.visibility, index),
      windSpeed: valueAt(hourly.wind_speed_10m, index),
      windDirection: valueAt(hourly.wind_direction_10m, index),
      uvIndex: valueAt(hourly.uv_index, index),
      isCurrent: offset === 0
    };
  });

  return {
    location,
    current: {
      cityName: location.name || '当前位置',
      locationLabel: [location.admin1, location.country].filter(Boolean).join(' · ') || '当前位置',
      time: current.time ?? '',
      temperature: current.temperature_2m ?? null,
      apparentTemperature: current.apparent_temperature ?? null,
      humidity: current.relative_humidity_2m ?? null,
      precipitation: current.precipitation ?? null,
      weatherCode: current.weather_code ?? null,
      pressure: current.pressure_msl ?? null,
      windSpeed: current.wind_speed_10m ?? null,
      windDirection: current.wind_direction_10m ?? null
    },
    hourly: hourlyItems,
    daily: (daily.time ?? []).slice(0, 7).map((date, index) => ({
      date,
      dateLabel: formatDate(date),
      weekLabel: index === 0 ? '今天' : formatWeekday(date),
      weatherCode: valueAt(daily.weather_code, index),
      maxTemperature: valueAt(daily.temperature_2m_max, index),
      minTemperature: valueAt(daily.temperature_2m_min, index),
      precipitationProbabilityMax: valueAt(daily.precipitation_probability_max, index),
      windSpeedMax: valueAt(daily.wind_speed_10m_max, index),
      uvIndexMax: valueAt(daily.uv_index_max, index)
    }))
  };
}
