<template>
  <el-pagination
    v-model:current-page="value"
    class="topo-pagination"
    layout="prev, pager, next"
    :total="total"
    :small="config.small"
    :pager-count="config.pageCount"
    :disabled="config.disabled"
    :default-page-size="config.pageSize"
    @current-change="changePage"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { ElPagination } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/pagination/style/css';

import { MPagination } from './type';

const { config, emit, defineRefState } = defineProps<ComponentProps<MPagination>>();

const value = defineRefState<number>('value', config.value);

const total = defineRefState<number>('total', config.total);

const changePage = (value: number) => {
  emit('pagination:change-page', { value });
};
</script>

<style lang="scss" scoped>
.topo-pagination {
  padding: 2px;
  :deep(.btn-prev) {
    background-color: v-bind('config.paginationStyle?.backgroundColor') !important;
  }
  :deep(.btn-next) {
    background-color: v-bind('config.paginationStyle?.backgroundColor') !important;
  }
  :deep(.el-pager li) {
    background-color: transparent;
  }
}
</style>
