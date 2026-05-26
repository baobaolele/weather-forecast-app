<script setup lang="ts">
import type { WeatherIndicator } from '../types/weather';

defineProps<{
  indicators: WeatherIndicator[];
}>();
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">关键指标</p>
        <h2>天气细节</h2>
      </div>
    </div>

    <div class="indicator-grid">
      <article v-for="item in indicators" :key="item.label" class="indicator-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}<small v-if="item.unit">{{ item.unit }}</small></strong>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>
