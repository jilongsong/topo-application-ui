<template>
  <div :id="`${config.id || ''}`" class="topo-ui-container">
    <div
      v-for="({ header, content }, index) in configItems"
      :key="index"
      :name="String(index + 1)"
      :class="['topo-ui-list-item', { 'topo-ui-list-container_disabled': index > 0 }]"
    >
      <Collapse :config="header.config" :context="header.context" :index="index">
        <template #content>
          <topo-ui-component
            :config="content.config"
            :context="content.context"
            @click="changeSelect(index)"
          ></topo-ui-component>
        </template>
      </Collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import type { ComponentProps } from '@topo/core';

import Collapse from './components/collapse.vue';
import { MCollapse } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MCollapse>>();

const dataSource = defineRefState('dataSource', config.dataSource ?? []);
const value = defineRefState('value', config.value);
const activeValue: any = ref([]);
let defaultValue = value.value ? JSON.parse(JSON.stringify(value.value)) : 0;

const configItems = computed(() => {
  if (!Array.isArray(dataSource.value)) {
    return [];
  } else {
    return dataSource.value?.map((item: any, index: number) => ({
      header: {
        config: config.items[0],
        context: { currentItem: item, selected: setDefaultSelect(index) },
      },
      content: {
        config: config.items[1],
        context: { currentItem: item, selected: setDefaultSelect(index) },
      },
    }));
  }
});

const changeSelect = (index: number) => {
  activeValue.value = [];
  if (!config.isChoose) return;
  if (!config.multipleSelect) {
    configItems.value.forEach((item: any, indexp: number) => {
      item.context.selected = index === indexp;
    });
    value.value = index;
    activeValue.value = dataSource.value[index];
  } else {
    defaultValue = [];
    configItems.value[index].content.context.selected = !configItems.value[index].content.context.selected;
    configItems.value.forEach((item: any, indexp: number) => {
      if (item.context.selected) {
        defaultValue.push(indexp);
        activeValue.value.push(dataSource.value[indexp]);
      }
    });
    value.value = defaultValue;
  }
  emit('collapse:change', { value: activeValue.value });
};

const setDefaultSelect = (index: number) => {
  if (!config.isChoose) return false;
  if (!config.multipleSelect) {
    return value.value === index;
  } else {
    return Array.isArray(value.value) ? value.value.includes(index) : false;
  }
};
</script>

<style lang="scss" scoped>
.topo-ui-container {
  .list-view-container {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: calc(v-bind('config.listStyle.padding') * 1px);
    gap: calc(v-bind('config.listStyle.gap') * 1px);

    :deep(.el-divider--horizontal) {
      margin: 0 0;
    }

    .topo-ui-list-item {
      position: relative;
      height: auto;

      &::after {
        content: '';
        width: 100%;
        height: v-bind('config.listStyle.lineHeight');
        background-color: v-bind('config.listStyle.lineColor');
        position: absolute;
        z-index: 10;
      }
    }
  }
}

.header {
  height: 100px;
}

.content {
  height: 200px;
}
</style>
