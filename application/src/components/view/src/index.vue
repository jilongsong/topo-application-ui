<template>
  <div :id="`${config.id || ''}`" class="topo-ui-container topo-ui-view">
    <topo-ui-component :config="view" :context="context"></topo-ui-component>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';

import { ComponentProps } from '@topo/core';
import { MComponent } from '@topo/schema';

import type { MView } from './type';

const { config, emit, defineRefState } = defineProps<ComponentProps<MView>>();

const value = defineRefState('value', config.property.value);

const view = computed(() => config.items.find(({ id }: MComponent) => id === value.value) ?? config.items[0]);

watch(
  () => value.value,
  (value) => {
    emit('view:change', { value });
  }
);
</script>

<style lang="scss" scoped>
.topo-ui-view {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
