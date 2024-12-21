<template>
  <div :id="`${config.id || ''}`" class="topo-ui-container">
    <div class="grid-view-container">
      <div
        v-for="({ config, context }, index) in configItems"
        :key="index"
        :class="{ 'topo-ui-list-container_disabled': index > 0 }"
      >
        <topo-ui-component
          :config="config"
          :context="context"
          @click.capture="changeSelect(index)"
        ></topo-ui-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import type { ComponentProps } from '@topo/core';

import { MGridView } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MGridView>>();

const dataSource = defineRefState('dataSource', config.property.dataSource ?? []);
const value = defineRefState('value', config.property.value);
const activeValue: any = ref([]);
let defaultValue = value.value ? JSON.parse(JSON.stringify(value.value)) : 0;

const configItems = computed(() => {
  if (!Array.isArray(dataSource.value)) {
    return [];
  } else {
    return dataSource.value?.map((item: any, index: number) => ({
      config: config.items[0],
      context: { currentItem: item, selected: setDefaultSelect(index) },
    }));
  }
});

const setDefaultSelect = (index: number) => {
  if (!config.property.isChoose) return false;
  if (!config.property.multipleSelect) {
    return value.value === index;
  } else {
    return Array.isArray(value.value) ? value.value.includes(index) : false;
  }
};

const changeSelect = (index: number) => {
  activeValue.value = [];
  if (!config.property.isChoose) return;
  if (!config.property.multipleSelect) {
    configItems.value.forEach((item: any, indexp: number) => {
      item.context.selected = index === indexp;
    });
    value.value = index;
    activeValue.value = dataSource.value[index];
  } else {
    defaultValue = [];
    configItems.value[index].context.selected = !configItems.value[index].context.selected;
    configItems.value.forEach((item: any, indexp: number) => {
      if (item.context.selected) {
        defaultValue.push(indexp);
        activeValue.value.push(dataSource.value[indexp]);
      }
    });
    value.value = defaultValue;
  }
  emit('gridView:change', { value: activeValue.value });
};
</script>

<style lang="scss" scoped>
.topo-ui-container {
  .grid-view-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(v-bind('config.style.cellWidth') * 1px), 1fr));
    grid-row-gap: calc(v-bind('config.style.rowGap') * 1px);
    grid-column-gap: calc(v-bind('config.style.colGap') * 1px);
    overflow-y: scroll;
  }
}
</style>
