<template>
  <div ref="canvasparentNode">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { ComponentProps } from '@topo/core';

import { Mannular } from './type';

const { config, defineRefState } = defineProps<ComponentProps<Mannular>>();

const canvasparentNode = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const value = defineRefState<string>('value', config.value);

const ctx = computed(() => canvasRef.value?.getContext('2d'));

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target === canvasparentNode.value) {
      const { width, height } = entry.contentRect;
      updateCanvasSize(width, height);
    }
  }
});

const updateCanvasSize = (width: number, height: number) => {
  // 更新canvas的尺寸
  if (canvasRef.value) {
    canvasRef.value.width = width;
    canvasRef.value.height = height;
    drawCircle(Number(value.value));
  }
};

const getCanvasClientSize = () => {
  const width = canvasparentNode.value?.clientWidth as number;
  const height = canvasparentNode.value?.clientHeight as number;
  return {
    canvasWidth: Math.min(width, height),
    canvasHeight: width,
  };
};

const drawCircle = (progress: number) => {
  if (!canvasRef.value) return;
  // 获取父级容器宽高
  const parentWidth = canvasparentNode.value?.clientWidth as number;
  const parentHeight = canvasparentNode.value?.clientHeight as number;
  canvasRef.value.width = Math.min(parentWidth, parentHeight);
  canvasRef.value.height = canvasRef.value.width;

  const { canvasWidth, canvasHeight } = getCanvasClientSize();
  canvasRef.value.width = canvasWidth;
  canvasRef.value.height = canvasHeight;

  if (!ctx.value) return;
  const radius = Math.min(canvasWidth, canvasHeight) * 0.45 - ctx.value.lineWidth / 2;
  ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);
  // 定义弧线的宽度
  ctx.value.lineWidth = config.style?.lineWidth || 10;
  // 定义两端为圆形
  ctx.value.lineCap = 'round';
  // 绘制背景灰色圆弧
  ctx.value.beginPath();
  ctx.value.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, 2 * Math.PI);
  ctx.value.strokeStyle = config.style?.defaultColor || '#ebeef5';
  ctx.value.stroke();
  ctx.value.closePath();

  // 绘制有颜色的部分
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI * progress;
  ctx.value.beginPath();
  ctx.value.arc(canvasWidth / 2, canvasHeight / 2, radius, startAngle, endAngle);
  ctx.value.strokeStyle = config.style?.activeColor || '#00a0fb';
  ctx.value.stroke();
  ctx.value.closePath();
  if (!config.showValue) return;
  ctx.value.textAlign = 'center';
  ctx.value.font = `${config.style?.fontSize}px sans-serif`;
  ctx.value.fillStyle = config.style?.color || '#ccc';
  ctx.value.fillText(
    (Number(value.value) * 100).toFixed(config.toFixed || 2) + '%',
    canvasWidth / 2,
    canvasHeight / 2 + (Number(config.style?.fontSize) / 2 || 7)
  );
};

//动画
const animateCircle = (progress: number, duration: number) => {
  const start = performance.now();
  let currentProgress = 0;
  //缓动动画
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };
  const step = () => {
    const now = performance.now();
    const timeElapsed = now - start;
    if (!ctx.value) return;
    if (timeElapsed < duration) {
      currentProgress = easeInOutQuad(timeElapsed, 0, progress, duration);
      drawCircle(currentProgress);
      requestAnimationFrame(step);
    } else {
      drawCircle(Number(value.value));
    }
  };
  step();
};

onMounted(() => {
  // 添加观察者
  if (canvasparentNode.value) {
    resizeObserver.observe(canvasparentNode.value);

    // 初始化时也绘制一次
    const initialWidth = canvasparentNode.value.clientWidth;
    const initialHeight = canvasparentNode.value.clientHeight;
    updateCanvasSize(initialWidth, initialHeight);

    // 调用动画方法
    animateCircle(Number(value.value), 1000);
  }
});

onUnmounted(() => {
  if (canvasparentNode.value && resizeObserver.unobserve) {
    resizeObserver.unobserve(canvasparentNode.value);
  }
});

watch(
  () => config,
  () => {
    drawCircle(Number(value.value));
  },
  { immediate: true }
);

watch(
  () => value.value,
  () => {
    drawCircle(Number(value.value));
  },
  { immediate: true }
);
</script>
