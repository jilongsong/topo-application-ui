<template>
  <div v-if="visible" :id="`${config.id || ''}`" class="topo-ui-overlay">
    <topo-ui-component
      v-for="item in config.items"
      :key="item.id"
      :config="item"
      :context="context"
    ></topo-ui-component>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { ComponentProps, topoAppKey } from '@topo/core';
import type { MNode } from '@topo/schema';

import { MOverlay } from './type';

const { config, emit, provideMethod } = defineProps<ComponentProps<MOverlay>>();

const visible = ref(false);

const app = injectStrict(topoAppKey);

const openOverlay = provideMethod('openOverlay', () => {
  visible.value = true;
  emit('overlay:open');
});

const closeOverlay = provideMethod('closeOverlay', () => {
  visible.value = false;
  emit('overlay:close');
});

app.on('editor:select', (info) => {
  if (info.path.find((node: MNode) => node.id === config.id)) {
    openOverlay();
  } else {
    closeOverlay();
  }
});
</script>

<style>
.topo-ui-overlay {
  position: 'fixed';
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100vh;
}
</style>
