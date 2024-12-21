<template>
  <div class="topo-color-chart">
    <div class="color-bar" :style="{ background: gradient }">
      <div v-if="config.showCur">
        <div
          v-for="item in dataSource"
          :key="item.value"
          class="marker"
          :style="{ left: `${getPosition(item.value)}%` }"
        >
          <div
            class="marker-container"
            :style="{
              borderColor: getColorForLevel(item.value),
              backgroundColor: adjustAlpha(getColorForLevel(item.value), 0.3),
            }"
          >
            <div>{{ item.label }}</div>
            <div>{{ item.value.toFixed(1) }}</div>
            <div>{{ item.status }}</div>
          </div>
        </div>
      </div>
      <div v-if="config.showValue" class="value-labels">
        <div v-for="marker in markers" :key="marker.value" class="value-label" :style="{ left: `${marker.position}%` }">
          {{ marker.value.toFixed(1) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ComponentProps } from '@topo/core';

import { MColorChart } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MColorChart>>();

const dataSource = defineRefState('dataSource', config.dataSource ?? []);

// 生成颜色渐变
const gradient = computed(() => {
  const colors = config.colors.map(({ color }) => color);
  const colorStops = colors.map((color, index) => {
    const position = (1 / colors.length) * 100 * (index + 1);
    return `${color} ${position}%`;
  });
  return `linear-gradient(to right, ${colorStops.join(', ')})`;
});

// 生成数值
const markers = computed(() => {
  const values = [];
  let currentValue = config.rangeMin;
  while (currentValue <= config.rangeMax) {
    values.push(Number(currentValue.toFixed(1)));
    currentValue += config.step;
  }

  return values.map((value) => {
    const position = ((value - config.rangeMin) / (config.rangeMax - config.rangeMin)) * 100;
    return {
      value: value,
      position: position,
    };
  });
});

// 根据数值计算在图中的百分比位置
const getPosition = (value: number) => {
  if (value < config.rangeMin) {
    return 0;
  } else if (value > config.rangeMax) {
    return 100;
  }
  return ((value - config.rangeMin) / (config.rangeMax - config.rangeMin)) * 100;
};

const adjustAlpha = (color: string, alpha: number) => {
  // 如果是 hex 格式
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 如果是 rgba 或 rgb 格式
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 如果输入格式不正确，返回原始颜色
  return color;
};

const interpolateColor = (color1: string, color2: string, ratio: number) => {
  const parseColor = (color: string) => {
    let r,
      g,
      b,
      a = 1;

    if (color.startsWith('#')) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else if (color.startsWith('rgba')) {
      const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        r = parseInt(rgbaMatch[1]);
        g = parseInt(rgbaMatch[2]);
        b = parseInt(rgbaMatch[3]);
        a = parseFloat(rgbaMatch[4]);
      }
    } else if (color.startsWith('rgb')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        r = parseInt(rgbMatch[1]);
        g = parseInt(rgbMatch[2]);
        b = parseInt(rgbMatch[3]);
      }
    }

    return { r, g, b, a };
  };

  const color1Parsed = parseColor(color1);
  const color2Parsed = parseColor(color2);

  const r = Math.round(color1Parsed.r! + (color2Parsed.r! - color1Parsed.r!) * ratio);
  const g = Math.round(color1Parsed.g! + (color2Parsed.g! - color1Parsed.g!) * ratio);
  const b = Math.round(color1Parsed.b! + (color2Parsed.b! - color1Parsed.b!) * ratio);
  const a = color1Parsed.a + (color2Parsed.a - color1Parsed.a) * ratio;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// 获取指定位置的颜色
const getColorForLevel = (value: number) => {
  const position = getPosition(value);
  const colors = config.colors.map(({ color }) => color);
  const colorStops = colors.map((color, index) => {
    const stopPosition = ((index / (colors.length - 1)) * 100).toFixed(2);
    return { color, position: parseFloat(stopPosition) };
  });

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (position >= colorStops[i].position && position < colorStops[i + 1].position) {
      return interpolateColor(
        colorStops[i].color,
        colorStops[i + 1].color,
        (position - colorStops[i].position) / (colorStops[i + 1].position - colorStops[i].position)
      );
    }
  }
  return colors[colors.length - 1];
};
</script>

<style lang="scss" scoped>
.topo-color-chart {
  position: relative;
  .color-bar {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .marker {
    position: absolute;
    top: -10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid v-bind('config.style?.curColor');
    transform: translateX(-50%);
    .marker-container {
      position: absolute;
      transform: translateX(-50%);
      color: v-bind('config.style?.color');
      bottom: 12px;
      padding: 0 5px;
      border-width: 1px;
      border-radius: 4px;
      border-style: solid;
      & > div {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        margin: 4px 0;
      }
    }
  }
  .value-labels {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .value-label {
    position: absolute;
    transform: translateX(-50%);
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    top: 8px;
    color: v-bind('config.style?.color');
  }
}
</style>
