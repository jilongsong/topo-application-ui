<template>
  <div id="container" ref="chartWrapperRef" style="width: 550px; height: 400px"></div>
</template>

<script setup lang="ts">
import { computed, defineProps, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';

import { ComponentProps } from '@topo/core';

import { MPieChart3d } from './type';

// 初始化 Highcharts 3D 插件
Highcharts3D(Highcharts);

const { config, defineRefState } = defineProps<ComponentProps<MPieChart3d>>();

const chartWrapperRef = ref<HTMLElement>();

const chart = ref<Highcharts.Chart>();

const data = defineRefState('data', config.data ?? []);

const options = computed<Highcharts.Options>(() => {
  return {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true, // 启用 3D 效果
        alpha: config.verticalAngle ?? 30, // 控制上-下视角
        beta: config.horizontalAngle ?? 0, // 控制水平视角
      },
      backgroundColor: 'transparent',
      spacingTop: 0, // 设置图表上方的间隙
      spacingRight: 0, // 设置图表右侧的间隙
      spacingBottom: 0, // 设置图表下方的间隙
      spacingLeft: 0, // 设置图表左侧的间隙
    },
    title: {
      text: config.title,
      style: {
        fontSize: '12px',
      },
    },
    legend: {
      enabled: config.legend ?? true,
      layout: config.legendLayout ?? 'horizontal',
      align: config.legendAlign ?? 'center',
      verticalAlign: config.legendVerticalAlign ?? 'top',
      x: 0, // 图例水平偏移
      y: 0, // 图例垂直偏移
      itemMarginTop: 0,
      itemMarginBottom: 0,
      itemStyle: {
        fontSize: '12px',
        color: '#ffffff',
      },
    },
    tooltip: {
      pointFormat: config.tooltip ?? '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        fontSize: '12px',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 20, // 3D 深度，体现厚度
        size: '100%',
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.y}台</b>',
          style: {
            fontSize: '12px',
            textShadow: 'none',
            color: '#ffffff',
          },
        },
        showInLegend: true, // 确保图例显示
      },
    },
    series: [
      {
        type: 'pie',
        name: '占比',
        data: data.value ?? [],
      },
    ],
  };
});

watch(
  () => options.value,
  (options) => {
    if (!chart.value) {
      return;
    }
    chart.value.update(options);
    chart.value.redraw();
  },
  { immediate: true }
);

const chartsResizeObserver = new ResizeObserver(() => {
  nextTick(() => {
    chart.value?.redraw();
  });
});

onMounted(() => {
  nextTick(() => {
    if (!chartWrapperRef.value) {
      return;
    }
    chart.value = Highcharts.chart(chartWrapperRef.value, options.value);
    chartsResizeObserver.observe(chartWrapperRef.value);
  });
});

onUnmounted(() => {
  if (chartWrapperRef.value) {
    chartsResizeObserver.unobserve(chartWrapperRef.value);
  } else if (chart.value) {
    chart.value.destroy();
  }
});
</script>

<style>
.highcharts-credits {
  visibility: hidden;
}
</style>

<style scoped>
#container {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
