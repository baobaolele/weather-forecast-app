<script setup lang="ts">
import type { DailyWeather } from '../types/weather';
import { formatNumber } from '../utils/format';
import { getWeatherInfo } from '../utils/weatherCode';

defineProps<{
  daily: DailyWeather[];
}>();
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">未来 7 天</p>
        <h2>每日天气</h2>
      </div>
    </div>

    <div class="daily-grid">
      <article v-for="item in daily" :key="item.date" class="daily-card">
        <div>
          <strong>{{ item.weekLabel }}</strong>
          <time>{{ item.dateLabel }}</time>
        </div>
        <div class="daily-weather">
          <span>{{ getWeatherInfo(item.weatherCode).emoji }}</span>
          <p>{{ getWeatherInfo(item.weatherCode).text }}</p>
        </div>
        <div class="daily-temp">
          <strong>{{ formatNumber(item.maxTemperature) }}℃</strong>
          <span>{{ formatNumber(item.minTemperature) }}℃</span>
        </div>
        <p>降雨 {{ formatNumber(item.precipitationProbabilityMax) }}%</p>
        <p>风速 {{ formatNumber(item.windSpeedMax) }} km/h</p>
        <p>UV {{ formatNumber(item.uvIndexMax, 1) }}</p>
      </article>
    </div>
  </section>
</template>
