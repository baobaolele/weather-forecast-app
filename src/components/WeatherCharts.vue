<script setup lang="ts">
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import type { EChartsOption } from 'echarts';
import { init, use } from 'echarts/core';
import type { EChartsType } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { HourlyWeather } from '../types/weather';

use([LineChart, BarChart, GridComponent, TooltipComponent, TitleComponent, CanvasRenderer]);

const props = defineProps<{
  hourly: HourlyWeather[];
}>();

const tempChart = ref<HTMLDivElement | null>(null);
const rainChart = ref<HTMLDivElement | null>(null);
const windChart = ref<HTMLDivElement | null>(null);
let charts: EChartsType[] = [];

function buildLineOption(title: string, unit: string, labels: string[], values: Array<number | null>, color: string): EChartsOption {
  return {
    title: { text: title, left: 8, top: 4, textStyle: { fontSize: 14, fontWeight: 700 } },
    tooltip: { trigger: 'axis', valueFormatter: (value) => `${value}${unit}` },
    grid: { left: 42, right: 18, top: 46, bottom: 34 },
    xAxis: { type: 'category', data: labels, boundaryGap: false, axisLabel: { color: '#64748b' } },
    yAxis: { type: 'value', name: unit, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [
      {
        type: 'line',
        smooth: true,
        data: values,
        symbolSize: 6,
        lineStyle: { width: 3, color },
        itemStyle: { color },
        areaStyle: { color: `${color}22` }
      }
    ]
  };
}

function buildBarOption(labels: string[], values: Array<number | null>): EChartsOption {
  return {
    title: { text: '未来 24 小时降雨概率', left: 8, top: 4, textStyle: { fontSize: 14, fontWeight: 700 } },
    tooltip: { trigger: 'axis', valueFormatter: (value) => `${value}%` },
    grid: { left: 42, right: 18, top: 46, bottom: 34 },
    xAxis: { type: 'category', data: labels, axisLabel: { color: '#64748b' } },
    yAxis: { type: 'value', name: '%', max: 100, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#e2e8f0' } } },
    series: [{ type: 'bar', data: values, barMaxWidth: 18, itemStyle: { color: '#38bdf8', borderRadius: [6, 6, 0, 0] } }]
  };
}

function renderCharts() {
  if (!tempChart.value || !rainChart.value || !windChart.value) {
    return;
  }
  charts.forEach((chart) => chart.dispose());
  charts = [init(tempChart.value), init(rainChart.value), init(windChart.value)];

  const labels = props.hourly.map((item) => item.hourLabel);
  charts[0].setOption(buildLineOption('未来 24 小时温度变化', '℃', labels, props.hourly.map((item) => item.temperature), '#f97316'));
  charts[1].setOption(buildBarOption(labels, props.hourly.map((item) => item.precipitationProbability)));
  charts[2].setOption(buildLineOption('未来 24 小时风速变化', 'km/h', labels, props.hourly.map((item) => item.windSpeed), '#0f766e'));
}

function resizeCharts() {
  charts.forEach((chart) => chart.resize());
}

onMounted(() => {
  renderCharts();
  window.addEventListener('resize', resizeCharts);
});

watch(() => props.hourly, renderCharts, { deep: true });

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  charts.forEach((chart) => chart.dispose());
});
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">趋势图表</p>
        <h2>未来 24 小时变化</h2>
      </div>
    </div>

    <div class="charts-grid">
      <div ref="tempChart" class="chart-box" aria-label="温度变化图"></div>
      <div ref="rainChart" class="chart-box" aria-label="降雨概率图"></div>
      <div ref="windChart" class="chart-box" aria-label="风速变化图"></div>
    </div>
  </section>
</template>
