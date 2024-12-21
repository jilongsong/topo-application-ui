<template>
  <div :id="`${config.id || ''}`" class="topo-ui-page topo-ui-container w-full h-full">
    <topo-ui-component
      v-for="item in config.items"
      :key="item.id"
      :config="item"
      :context="context"
    ></topo-ui-component>
  </div>
</template>

<script lang="ts" setup>
import { ComponentProps } from '@topo/core';

import { MPage } from './type';

const { config, context, provideMethod } = defineProps<ComponentProps<MPage>>();

provideMethod('refresh', () => {
  window.location.reload();
});
</script>
