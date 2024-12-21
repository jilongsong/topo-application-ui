<template>
  <topoCharts :option="optionsData"></topoCharts>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { ComponentProps } from '@topo/core';

import topoCharts from './components/topoCharts.vue';
import { PropsConfig, useEchartsData } from './components/useformatEchartsData';
import { ECOption } from './type';

const { config, defineRefState } = defineProps<ComponentProps<PropsConfig & ECOption & { id: string; style: {} }>>();

const { formatEchartsData, formatSchemaData } = useEchartsData();

const optionsData = ref<ECOption>();

const dataSource = defineRefState('dataSource', config.dataSource ?? []);

watch(
  () => config,
  () => {
    if (config.isSchema) {
      optionsData.value = formatSchemaData(config);
    } else {
      optionsData.value = formatEchartsData(config);
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => dataSource.value,
  () => {
    if (config.isSchema) {
      optionsData.value = formatSchemaData({ ...config, dataSource: dataSource.value! });
    } else {
      optionsData.value = formatEchartsData({ ...config, dataSource: dataSource.value! });
    }
  },
  { immediate: true, deep: true }
);
</script>
