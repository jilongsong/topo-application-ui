<template>
  <img :src="imgUrl" :alt="content" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import QRCode from 'qrcode';

import { ComponentProps } from '@topo/core';

import { MQrcode } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MQrcode>>();

const content = defineRefState<string>('content', config.property.content);

const imgUrl = ref<string>('');

watch(
  () => ({
    dark: config.style.color,
    light: config.style.bg,
    width: config.style?.width,
    content: content.value,
  }),
  async ({ dark, light, width, content }) => {
    if (!content) {
      return;
    }
    const url = await QRCode.toDataURL(content, {
      color: { dark: rgbaToHex(dark), light: rgbaToHex(light) },
      width: +width,
    });
    imgUrl.value = url;
  },
  { immediate: true }
);

function rgbaToHex(rgba: string): string {
  const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(\.\d+)?)\s*)?\)/;
  const parsed = regex.exec(rgba);

  if (!parsed) {
    throw new Error(`Invalid format: ${rgba}`);
  }

  const red = parseInt(parsed[1], 10);
  const green = parseInt(parsed[2], 10);
  const blue = parseInt(parsed[3], 10);
  const alpha = parsed[4] ? parseFloat(parsed[4]) : 1;

  if (
    isNaN(red) ||
    isNaN(green) ||
    isNaN(blue) ||
    isNaN(alpha) ||
    red > 255 ||
    green > 255 ||
    blue > 255 ||
    alpha < 0 ||
    alpha > 1
  ) {
    throw new Error(`Invalid color components in: ${rgba}`);
  }

  const elems = [hex(red), hex(green), hex(blue)];

  if (alpha < 1) {
    elems.push(hex(Math.round(alpha * 255)));
  }

  return `#${elems.join('')}`;

  function hex(number: number): string {
    return ('0' + number.toString(16)).slice(-2);
  }
}
</script>
