<script setup lang="ts">
import type { TrendAnalysisResult } from '../types/weather';

defineProps<{
  analysis: TrendAnalysisResult;
}>();
</script>

<template>
  <section class="panel trend-panel" :class="`trend-${analysis.level}`">
    <div class="section-heading">
      <div>
        <p class="eyebrow">智能分析</p>
        <h2>天气变化趋势</h2>
      </div>
      <span class="status-pill">{{ analysis.level === 'warning' ? '需注意' : analysis.level === 'notice' ? '关注变化' : '适合出行' }}</span>
    </div>

    <div class="trend-list">
      <p>{{ analysis.temperatureText }}</p>
      <p>{{ analysis.rainText }}</p>
      <p>{{ analysis.windText }}</p>
      <p>{{ analysis.uvText }}</p>
    </div>

    <div class="suggestions">
      <h3>生活建议</h3>
      <ul>
        <li v-for="item in analysis.suggestions" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>
