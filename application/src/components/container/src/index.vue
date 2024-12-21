<template>
  <div
    :id="`${config.id || ''}`"
    class="topo-ui-container"
    @click="onClick"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <topo-ui-component
      v-for="item in config.items"
      :key="item.id"
      :config="item"
      :context="Object.assign(dataSource || {}, context)"
    ></topo-ui-component>
  </div>
</template>

<script lang="ts" setup>
import type { ComponentProps } from '@topo/core';
import type { MContainer } from '@topo/schema';

const { config, emit, defineRefState } = defineProps<ComponentProps<MContainer>>();

const dataSource = defineRefState('dataSource', config.dataSource ?? {});

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
