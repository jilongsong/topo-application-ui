<template>
  <div :id="`${config.id || ''}`" class="topo-ui-container">
    <div class="list-view-container">
      <div
        v-for="({ config, context }, index) in configItems"
        :key="config.id"
        :class="['topo-ui-list-item', { 'topo-ui-list-container_disabled': index > 0 }]"
      >
        <topo-ui-component :config="config" :context="context" @click="changeSelect(index)"></topo-ui-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import type { ComponentProps } from '@topo/core';

import { MListView } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MListView>>();

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
  console.log('changeSelect', activeValue.value);
  emit('onSelect', { value: activeValue.value });
};
</script>

<style lang="scss" scoped>
.topo-ui-container {
  .list-view-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    grid-row-gap: calc(v-bind('config.style.gap') * 1px);
  }
}
</style>
