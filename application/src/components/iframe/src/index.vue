<template>
  <div class="topo-iframe">
    <iframe width="100%" height="100%" title="" :src="src" @load="onIframeLoad" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

import { ComponentProps } from '@topo/core';

import { MIframe } from './type';
const { config, defineRefState, emit } = defineProps<ComponentProps<MIframe>>();

const src = defineRefState('src', config.src);

const onIframeLoad = () => {
  emit('iframe:loaded');
};

const onMessageReceived = (event: MessageEvent) => {
  emit('iframe:message', event.data);
};

onMounted(() => {
  window.addEventListener('message', onMessageReceived);
});

onUnmounted(() => {
  window.removeEventListener('message', onMessageReceived);
});
</script>
