<template>
  <el-table-column
    :key="column.prop"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :fixed="column.fixed"
    :align="column.align"
    :header-align="column.align"
    :sortable="column.sortable"
    :show-overflow-tooltip="(column as TextColumn).ellipsis"
  >
    <template v-if="!column.children" #default="scope">
      <ElButton
        v-if="column.type === 'button'"
        :color="(column as ButtonColumn).themeColor"
        :plain="(column as ButtonColumn).plain"
        :text="(column as ButtonColumn).text"
        :link="(column as ButtonColumn).link"
        :bg="(column as ButtonColumn).bg"
        :round="(column as ButtonColumn).round"
        :circle="(column as ButtonColumn).circle"
        :disabled="(column as ButtonColumn).disabled"
        @click="columnMethod?.onClick(column, scope.row)"
      >
        {{ columnMethod?.computedMappedValue(column, scope.row) }}
      </ElButton>
      <ElImage
        v-else-if="column.type === 'image'"
        preview-teleported
        :src="columnMethod?.computedMappedValue(column, scope.row)"
        :alt="(column as ImageColumn).alt"
        :preview-src-list="(column as ImageColumn).preview ? columnMethod?.computedMappedValue(column, scope.row) : []"
      />

      <span v-else>{{ columnMethod?.computedMappedValue(column, scope.row) }}</span>
    </template>
    <template v-if="column.children">
      <column-item v-for="(subColumn, index) in column.children" :key="index" :column="subColumn"></column-item>
    </template>
  </el-table-column>
</template>

<script lang="ts">
export default {
  name: 'ColumnItem',
};
</script>

<script setup lang="ts">
import { inject } from 'vue';
import { ElButton, ElImage, ElTableColumn } from 'element-plus';

import { provideColumnMethod } from '../index.vue';
import { ButtonColumn, ImageColumn, TableColumnItem, TextColumn } from '../type';
defineProps<{
  column: TableColumnItem;
}>();

const columnMethod = inject<provideColumnMethod | undefined>('provideColumnMethod');
</script>
