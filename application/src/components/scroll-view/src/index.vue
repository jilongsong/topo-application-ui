<template>
  <div
    :id="`${config.id || ''}`"
    class="topo-ui-scroll-container"
    @click="onClick"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <topo-ui-component
      v-for="item in config.items"
      :key="item.id"
      :config="item"
      :context="context"
    ></topo-ui-component>
  </div>
</template>

<script lang="ts" setup>
import type { ComponentProps } from '@topo/core';

import { MScrollView } from './type';

const { config, emit } = defineProps<ComponentProps<MScrollView>>();

const onClick = (event: MouseEvent) => {
  emit('container:click');
  event.stopPropagation();
};

const onMouseover = (event: MouseEvent) => {
  emit('container:mouseover');
  event.stopPropagation();
};

const onMouseout = (event: MouseEvent) => {
  emit('container:mouseout');
  event.stopPropagation();
};
</script>

<style lang="scss" scoped>
.topo-ui-scroll-container {
  overflow-y: v-bind('config.property.overflowY');
  overflow-x: v-bind('config.property.overflowX');
  &::-webkit-scrollbar {
    display: block;
  }
}
</style>
