<script setup lang="ts">
import type { HourlyWeather } from '../types/weather';
import { formatNumber } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCode';

defineProps<{
  hourly: HourlyWeather[];
}>();
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">未来 24 小时</p>
        <h2>小时级天气</h2>
      </div>
    </div>

    <div class="hourly-scroller" aria-label="未来 24 小时天气">
      <article v-for="item in hourly" :key="item.time" class="hour-card" :class="{ active: item.isCurrent }">
        <time>{{ item.hourLabel }}</time>
        <div class="hour-icon">{{ getWeatherInfo(item.weatherCode).emoji }}</div>
        <strong>{{ formatNumber(item.temperature) }}℃</strong>
        <span>体感 {{ formatNumber(item.apparentTemperature) }}℃</span>
        <span>降雨 {{ formatNumber(item.precipitationProbability) }}%</span>
        <span>雨量 {{ formatNumber(item.precipitation, 1) }}mm</span>
        <span>风 {{ formatNumber(item.windSpeed) }}km/h</span>
        <span>湿度 {{ formatNumber(item.humidity) }}%</span>
      </article>
    </div>
  </section>
</template>
