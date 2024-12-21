<template>
  <div class="wrap-tabs">
    <el-tabs
      v-model="value"
      :stretch="config.stretch"
      :type="config.tabStyle"
      :tab-position="config.layout"
      class="topo-tabs"
      height="auto"
      @tab-change="onTabChange"
    >
      <el-tab-pane v-for="item in config.options" :key="item.value" :label="item.label" :name="item.value">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ElTabPane, ElTabs } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/tabs/style/css';

import { MTabs } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MTabs>>();

const value = defineRefState<string>('value', config.value);

const tabPadding = computed(() => config.tabPadding || '20px');

const onTabChange = () => {
  emit('tabs:change', { value: value.value });
};
</script>

<style lang="scss" scoped>
.wrap-tabs {
  width: 100%;
  height: 100%;
  .topo-tabs {
    width: 100%;
    height: 100%;
    :deep(.el-tabs__item) {
      font-size: v-bind('config.style?.fontSize') !important;
      padding: 0 v-bind('tabPadding');
      color: v-bind('config.style?.color');
      height: v-bind('config.tabItemHeight');
    }
    :deep(.el-tabs__nav-wrap::after) {
      height: 0;
    }
    :deep(.el-tabs__item.is-active) {
      color: v-bind('config.selectedColor') !important;
      background-color: v-bind('config.selectedBgColor') !important;
    }
    :deep(.el-tabs__active-bar) {
      background-color: v-bind('config.selectedColor') !important;
    }
  }
}
</style>
