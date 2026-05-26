<script setup lang="ts">
import { computed, ref } from 'vue';
import type { GeoLocation } from '../types/weather';

const props = defineProps<{
  location: GeoLocation;
}>();

const mapLoaded = ref(false);

// 使用 Windy 公开嵌入页展示云图层，不需要后端和 API Key。
const mapUrl = computed(() => {
  const lat = props.location.latitude.toFixed(4);
  const lon = props.location.longitude.toFixed(4);
  const params = new URLSearchParams({
    lat,
    lon,
    detailLat: lat,
    detailLon: lon,
    zoom: '5',
    level: 'surface',
    overlay: 'clouds',
    product: 'ecmwf',
    menu: '',
    message: 'true',
    marker: 'true',
    calendar: 'now',
    pressure: '',
    type: 'map',
    location: 'coordinates',
    detail: '',
    metricWind: 'km/h',
    metricTemp: '°C',
    radarRange: '-1'
  });

  return `https://embed.windy.com/embed2.html?${params.toString()}`;
});
</script>

<template>
  <section class="panel weather-map-panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">气象云图</p>
        <h2>云量与天气系统</h2>
      </div>
      <span class="map-location">{{ location.name }}</span>
    </div>

    <div class="weather-map-frame">
      <div v-if="!mapLoaded" class="map-loading">
        <div class="loader"></div>
        <p>正在加载云图</p>
      </div>
      <iframe
        :src="mapUrl"
        title="气象云图"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        @load="mapLoaded = true"
      ></iframe>
    </div>

    <p class="map-note">云图由 Windy 嵌入地图提供，用于观察当前位置附近云量、云带和天气系统变化。</p>
  </section>
</template>
