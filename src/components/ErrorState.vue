<script setup lang="ts">
defineProps<{
  message: string;
}>();

defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section class="state-card error-state" role="alert">
    <div class="error-icon">!</div>
    <h2>天气数据暂时不可用</h2>
    <p>{{ message }}</p>
    <button type="button" @click="$emit('retry')">重试</button>
  </section>
</template>
