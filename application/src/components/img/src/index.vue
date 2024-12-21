<template>
  <img :src="imgSrc" :alt="config.property.alt" @click="onClick" @error.once="onError" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ComponentProps } from '@topo/core';

import AltImg from './assets/alt.svg';
import { MImg } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MImg>>();

const src = defineRefState('src', typeof config.property.src === 'string' ? config.property.src : AltImg);

const imgSrc = computed<string>(() => {
  if (!src.value) {
    return AltImg;
  }
  return src.value;
});

const onError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  if (!target) {
    return;
  }
  if (typeof src.value !== 'string') {
    target.src = `/static/src.value`;
  }
};

const onClick = () => {
  emit('img:click');
};
</script>
