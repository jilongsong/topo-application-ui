<template>
  <div class="container">
    <div v-for="i in blockCount" :key="i" :class="`progress-segment ${i <= progress ? 'active' : ''}`"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ComponentProps } from '@topo/core';

import { MProgress } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MProgress>>();

const blockCount = defineRefState<number>('blockCount', config.blockCount ?? 10);

const value = defineRefState<number>('value', config.value ?? 0);

const progress = computed<number>(() => {
  return Math.floor((value.value ?? 0) * (blockCount.value ?? 1));
});
</script>

<style lang="css" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(v-bind(blockCount), 1fr); /* 创建 10 块 */
  gap: 2px;
  padding: 2px;
  overflow: hidden;
}
.progress-segment {
  background-color: v-bind('config.style?.trackColor');
}
.progress-segment.active {
  background-color: v-bind('config.style?.color');
}
</style>
