<script setup lang="ts">
import type { CurrentWeather } from '../types/weather';
import { formatDateTime, formatNumber } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCode';
import { getWindDirectionText } from '../utils/windDirection';

defineProps<{
  weather: CurrentWeather;
}>();
</script>

<template>
  <section class="current-card">
    <div class="current-main">
      <div>
        <p class="eyebrow">{{ weather.locationLabel }}</p>
        <h2>{{ weather.cityName }}</h2>
        <p class="muted">{{ formatDateTime(weather.time) }} 更新</p>
      </div>
      <div class="weather-icon" aria-hidden="true">{{ getWeatherInfo(weather.weatherCode).emoji }}</div>
    </div>

    <div class="temperature-row">
      <strong>{{ formatNumber(weather.temperature) }}<span>℃</span></strong>
      <div>
        <p>{{ getWeatherInfo(weather.weatherCode).text }}</p>
        <p class="muted">体感 {{ formatNumber(weather.apparentTemperature) }}℃</p>
      </div>
    </div>

    <div class="current-grid">
      <div>
        <span>湿度</span>
        <strong>{{ formatNumber(weather.humidity) }}%</strong>
      </div>
      <div>
        <span>风速</span>
        <strong>{{ formatNumber(weather.windSpeed) }} km/h</strong>
      </div>
      <div>
        <span>风向</span>
        <strong>{{ getWindDirectionText(weather.windDirection) }}</strong>
      </div>
      <div>
        <span>气压</span>
        <strong>{{ formatNumber(weather.pressure) }} hPa</strong>
      </div>
      <div>
        <span>降雨量</span>
        <strong>{{ formatNumber(weather.precipitation, 1) }} mm</strong>
      </div>
    </div>
  </section>
</template>
