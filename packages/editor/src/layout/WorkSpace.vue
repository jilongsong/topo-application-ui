<template>
  <div ref="topoContainerRef" class="w-full h-full" draggable @dragover="onDragover" @drop="onDrop"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { MVertex } from '@topo/schema';
import { guid } from '@topo/utils';

import { CommandKey, ContextKey } from '../constants/inject-keys';
import { injectStrict } from '../utils/vue-aide';
const { app } = injectStrict(ContextKey);
const { addElement } = injectStrict(CommandKey);
const topoContainerRef = ref<HTMLDivElement>();

onMounted(() => {
  app.mount(topoContainerRef.value!);
});

const onDragover = (event: DragEvent) => {
  event.preventDefault();
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const resolve = event.dataTransfer?.getData('application/json');
  if (!resolve) {
    return;
  }
  const point = app.rendererService.pageToLocal(event.clientX, event.clientY);
  const vertex = JSON.parse(resolve) as MVertex;
  vertex.id = guid();
  vertex.x = point.x;
  vertex.y = point.y;
  addElement({
    element: vertex,
  });
};
</script>
