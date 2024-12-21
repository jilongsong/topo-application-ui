<template>
  <div ref="chartsWrapperRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { markRaw, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { EChartsType } from 'echarts/core';

import { ECOption } from '../type';

import echarts from './echarts';

const props = defineProps<{
  option: ECOption | any;
}>();

let timer: any = null;

const chartsWrapperRef = ref<HTMLDivElement>();

const charts = ref<EChartsType>();

const chartsResizeObserver = new ResizeObserver(() => {
  nextTick(() => {
    charts.value?.resize();
  });
});

watch(
  () => props.option,
  (option) => {
    if (!charts.value) {
      return;
    }

    charts.value.clear();
    charts.value.setOption(option, { notMerge: true });
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  nextTick(() => {
    if (!chartsWrapperRef.value) {
      return;
    }
    charts.value = markRaw(echarts.init(chartsWrapperRef.value));
    charts.value.setOption(props.option, { notMerge: true });
    chartsResizeObserver.observe(chartsWrapperRef.value);
  });
});

onUnmounted(() => {
  if (chartsWrapperRef.value) {
    chartsResizeObserver.unobserve(chartsWrapperRef.value);
  } else if (charts.value) {
    charts.value.dispose();
    charts.value = undefined;
  }
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>
