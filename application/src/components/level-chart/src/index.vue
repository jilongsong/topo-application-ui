<template>
  <div class="topo-level-chart">
    <div ref="colorCardRef" class="color">
      <div v-if="config.showTarget" class="target-position"></div>
      <div
        v-for="index in config.divideNum - 1"
        :key="index"
        :style="calculateDistance(index)"
        class="division-wrapper"
      ></div>
    </div>
    <div class="value">
      <div class="cursor"></div>
      <div class="min-value">{{ config.minValue }}</div>
      <div class="max-value">{{ config.maxValue }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';

import { ComponentProps } from '@topo/core';

import { MGradeMap, MGradeOption } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MGradeMap>>();

const colorCardRef = ref();
const colorCardWidth = ref<number>(0);
const standard = defineRefState('standard', config.standard ?? 0);
const targetPosition = computed(() => `${calculatePosition(standard.value)}px`);
const value = defineRefState('value', config.value ?? 0);
const calculateCursorPosition = computed(() => `${calculatePosition(value.value) - 6}px`);
const targetWidth = computed(() => `${config.targetWidth}px`);

const calculateDistance = (index: number): any => {
  const positionDistance = (colorCardWidth.value - (config.divideNum - 1) * config.divideWidth) / config.divideNum;
  return {
    left: `${positionDistance * index + (index - 1) * config.divideWidth}px`,
    width: `${config.divideWidth}px`,
  };
};

onMounted(() => {
  if (!colorCardRef.value) {
    return;
  }
  colorCardWidth.value = colorCardRef.value.clientWidth;
});

const calculatePosition = (value: number): number => {
  if (value > Math.abs(config.maxValue || 6)) {
    return colorCardWidth.value;
  }
  if (value < Math.abs(config.minValue || 0)) {
    return 0;
  }
  return colorCardWidth.value * ((value - config.minValue) / Math.abs(config.maxValue - config.minValue));
};

const getGradient = (val: MGradeOption[]) => {
  let str = 'linear-gradient(90deg,';
  let sum = 0;
  val.forEach((item: MGradeOption) => {
    sum += Number(item.max) - Number(item.min);
  });

  let gap = 0;
  for (let i = 0; i < val.length; i++) {
    if (i === 0) {
      str += `${val[0].color} 0,`;
    }
    gap += Number(val[i].max) - Number(val[i].min);
    const percent = `${(gap / sum) * 100}%`;
    str += `${val[i].color} ${percent}${i !== val.length - 1 ? ',' : ''}`;
  }
  str += ')';
  return str;
};
const backgroundImage = computed(() => getGradient(config.options));

watch(
  () => config.style,
  () => {
    colorCardWidth.value = colorCardRef.value?.clientWidth ?? 0;
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.topo-level-chart {
  width: 100%;
  height: 100%;
  .color {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 20px;
    background-image: v-bind(backgroundImage);
    .target-position {
      width: v-bind(targetWidth);
      position: absolute;
      height: calc(100% + 40px);
      top: -20px;
      background-color: v-bind('config.targetColor');
      left: v-bind(targetPosition);
      z-index: 5;
    }
    .division-wrapper {
      position: absolute;
      height: 100%;
      background-color: v-bind('config.divideBackground');
    }
    .division-wrapper::before {
      position: absolute;
      content: '';
      left: -6px;
      bottom: 0;
      width: 6px;
      height: 100%;
      border-radius: 0 0 6px 0;
    }
    .division-wrapper::after {
      position: absolute;
      width: 6px;
      height: 100%;
      content: '';
      right: -6px;
      bottom: 0;
      border-radius: 0 0 0 6px;
    }
  }
  .value {
    width: 100%;
    height: 20px;
    display: flex;
    position: relative;
    .cursor {
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid transparent;
      border-bottom: 12px solid v-bind('config.cursorColor');
      left: v-bind(calculateCursorPosition);
      z-index: 2;
    }
    .min-value {
      position: absolute;
      top: 2px;
      left: 0;
      color: v-bind('config.textColor');
    }
    .max-value {
      position: absolute;
      top: 2px;
      right: 0;
      color: v-bind('config.textColor');
    }
  }
}
</style>
