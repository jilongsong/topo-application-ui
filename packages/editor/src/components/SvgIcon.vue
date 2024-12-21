<template>
  <i class="svg-icon" :style="{ fontSize: size }" @mouseover="hovered = true" @mouseout="hovered = false">
    <svg viewBox="0 0 1024 1024" aria-hidden="true" :width="size" :height="size">
      <use :fill="hovered ? activeColor : color" :xlink:href="icon" />
    </svg>
  </i>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    symbolId: string;
    prefix?: string;
    size?: number | string;
    color?: string;
    activeColor?: string;
  }>(),
  {
    prefix: 'icon',
    size: '1rem',
    color: 'currentColor',
    activeCOlor: 'currentColor',
  }
);

const hovered = ref<boolean>(false);

const icon = computed<string>(() => `#${props.prefix}-${props.symbolId}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  align-items: center;
}
</style>
