<template>
  <div ref="topoContainerRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { ContextKey } from '../constants/inject-keys';
import { injectStrict } from '../utils/vue-aide';
const { app } = injectStrict(ContextKey);
const topoContainerRef = ref<HTMLDivElement>();

onMounted(() => {
  app.mount(topoContainerRef.value!);
});
</script>
