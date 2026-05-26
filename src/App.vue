<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { fetchWeather, searchCity } from './api/weatherApi';
import CurrentWeather from './components/CurrentWeather.vue';
import DailyForecast from './components/DailyForecast.vue';
import ErrorState from './components/ErrorState.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import LoadingState from './components/LoadingState.vue';
import SearchBar from './components/SearchBar.vue';
import TrendAnalysis from './components/TrendAnalysis.vue';
import WeatherCharts from './components/WeatherCharts.vue';
import WeatherIndicators from './components/WeatherIndicators.vue';
import WeatherMap from './components/WeatherMap.vue';
import type { GeoLocation, WeatherIndicator, WeatherViewData } from './types/weather';
import { formatNumber } from './utils/format';
import { analyzeWeatherTrend } from './utils/trendAnalysis';
import { transformWeather } from './utils/transformWeather';
import { getWindDirectionText } from './utils/windDirection';

const DEFAULT_CITY = 'Dalian';

const weatherData = ref<WeatherViewData | null>(null);
const loading = ref(true);
const errorMessage = ref('');
const lastCity = ref(DEFAULT_CITY);

const analysis = computed(() => {
  if (!weatherData.value) {
    return null;
  }
  return analyzeWeatherTrend(weatherData.value.hourly, weatherData.value.daily);
});

const indicators = computed<WeatherIndicator[]>(() => {
  const current = weatherData.value?.current;
  const firstHour = weatherData.value?.hourly[0];
  if (!current) {
    return [];
  }

  return [
    { label: '体感温度', value: formatNumber(current.apparentTemperature), unit: '℃', description: '结合温度、湿度和风速的体感值' },
    { label: '湿度', value: formatNumber(current.humidity), unit: '%', description: '空气湿润程度，过高会增加闷热感' },
    { label: '气压', value: formatNumber(current.pressure), unit: 'hPa', description: '海平面气压，天气变化时会波动' },
    { label: '风速', value: formatNumber(current.windSpeed), unit: 'km/h', description: '近地面 10 米风速' },
    { label: '风向', value: getWindDirectionText(current.windDirection), description: '由风向角度转换的中文方位' },
    { label: '降雨概率', value: formatNumber(firstHour?.precipitationProbability), unit: '%', description: '最近小时出现降水的可能性' },
    { label: '降雨量', value: formatNumber(current.precipitation, 1), unit: 'mm', description: '当前时段观测或预估降水量' },
    { label: '云量', value: formatNumber(firstHour?.cloudCover), unit: '%', description: '天空被云覆盖的比例' },
    { label: '能见度', value: formatNumber(firstHour?.visibility ? firstHour.visibility / 1000 : null, 1), unit: 'km', description: '水平能见距离，雾天会明显下降' },
    { label: '紫外线指数', value: formatNumber(firstHour?.uvIndex, 1), description: '白天越高越需要防晒' }
  ];
});

function normalizeError(error: unknown): string {
  if (error instanceof Error && error.message) {
    if (error.message.includes('Failed to fetch')) {
      return '网络连接异常，请检查网络后重试。';
    }
    return error.message;
  }
  return '天气数据获取失败，请稍后重试。';
}

async function loadByLocation(location: GeoLocation) {
  const rawWeather = await fetchWeather(location.latitude, location.longitude);
  weatherData.value = transformWeather(rawWeather, location);
}

async function loadCityWeather(city: string) {
  loading.value = true;
  errorMessage.value = '';
  try {
    const location = await searchCity(city);
    lastCity.value = city;
    await loadByLocation(location);
  } catch (error) {
    errorMessage.value = normalizeError(error);
  } finally {
    loading.value = false;
  }
}

async function loadCurrentLocation() {
  if (!navigator.geolocation) {
    errorMessage.value = '当前浏览器不支持定位，请手动输入城市。';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        await loadByLocation({
          name: '当前位置',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          country: '定位结果'
        });
      } catch (error) {
        errorMessage.value = normalizeError(error);
      } finally {
        loading.value = false;
      }
    },
    (geoError) => {
      loading.value = false;
      errorMessage.value = geoError.code === geoError.PERMISSION_DENIED ? '你已拒绝定位权限，可以手动搜索城市。' : '定位失败，请稍后重试或手动输入城市。';
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
  );
}

function retry() {
  void loadCityWeather(lastCity.value || DEFAULT_CITY);
}

onMounted(() => {
  void loadCityWeather(DEFAULT_CITY);
});
</script>

<template>
  <main class="app-shell">
    <SearchBar :loading="loading" :default-city="lastCity" @search="loadCityWeather" @locate="loadCurrentLocation" />

    <LoadingState v-if="loading && !weatherData" />
    <ErrorState v-else-if="errorMessage && !weatherData" :message="errorMessage" @retry="retry" />

    <template v-else-if="weatherData">
      <ErrorState v-if="errorMessage" :message="errorMessage" @retry="retry" />

      <div class="top-layout">
        <CurrentWeather :weather="weatherData.current" />
        <TrendAnalysis v-if="analysis" :analysis="analysis" />
      </div>

      <HourlyForecast :hourly="weatherData.hourly" />
      <WeatherIndicators :indicators="indicators" />
      <WeatherMap :location="weatherData.location" />
      <WeatherCharts :hourly="weatherData.hourly" />
      <DailyForecast :daily="weatherData.daily" />
    </template>
  </main>
</template>
