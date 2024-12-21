<template>
  <div class="topo-ui-indicator-light">
    <div
      v-for="{ color, sign } in config.lightGroup"
      :key="sign"
      class="default-light"
      :style="{ backgroundColor: sign === value ? color : 'gray' }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ComponentProps } from '@topo/core';

import { MIndicatorLight } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MIndicatorLight>>();

const value = defineRefState<string>('value', config.value);

const groupLen = computed(() => config.lightGroup.length ?? 0);
</script>

<style lang="scss">
.topo-ui-indicator-light {
  display: grid;
  grid-template-columns: repeat(v-bind(groupLen), 1fr);
  gap: 5px;
  .default-light {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: gray;
  }
}
</style>
