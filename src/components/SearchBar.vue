<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  loading: boolean;
  defaultCity: string;
}>();

const emit = defineEmits<{
  search: [city: string];
  locate: [];
}>();

const city = ref(props.defaultCity);

watch(
  () => props.defaultCity,
  (value) => {
    city.value = value;
  }
);

function submitSearch() {
  const value = city.value.trim();
  if (value) {
    emit('search', value);
  }
}
</script>

<template>
  <section class="search-bar" aria-label="城市搜索">
    <div class="brand">
      <span class="brand-mark">☁️</span>
      <div>
        <h1>智能天气预报</h1>
        <p>小时级趋势 · 7 天预报 · 生活建议</p>
      </div>
    </div>

    <form class="search-form" @submit.prevent="submitSearch">
      <input
        v-model="city"
        type="search"
        placeholder="输入城市，例如 Dalian、Beijing、Sydney"
        :disabled="loading"
        aria-label="城市名称"
      />
      <button type="submit" :disabled="loading || !city.trim()">搜索</button>
      <button class="ghost-button" type="button" :disabled="loading" @click="emit('locate')">当前位置</button>
    </form>
  </section>
</template>
