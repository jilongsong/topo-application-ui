<template>
  <el-table
    class="topo-ui-table"
    :data="tableData"
    style="width: 100%"
    :height="config.style?.height"
    :table-layout="config.cellConfig.tableLayout"
    :show-header="config.showHeader"
    :header-cell-style="config.headerStyle"
    :cell-style="getCellStyle"
    :border="config.border"
  >
    <el-table-column v-if="config.selection" type="selection" />
    <column-item v-for="column in columns" :key="column.label" :column="column"></column-item>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue';
// import { injectStrict } from '@pictode/vue-aide';
import { ElTable, ElTableColumn } from 'element-plus';

import { ComponentProps } from '@topo/core';

// import { ComponentProps, topoAppKey } from '@topo/core';
import 'element-plus/es/components/table/style/css';

import columnItem from './components/column-item.vue';
import { MTable, MTableColumn } from './type';

export interface provideColumnMethod {
  computedMappedValue: (column: MTableColumn, row: Record<string, any>) => any;
  onClick: (column: MTableColumn, row: Record<string, any>) => void;
}

const { config, provideMethod, emit } = defineProps<ComponentProps<MTable>>();

// const app = injectStrict(topoAppKey);

provide<provideColumnMethod>('provideColumnMethod', {
  computedMappedValue: (column: MTableColumn, row: Record<string, any>) => {
    if (!column.mappedValue) {
      return column.prop ? row[column.prop] : '';
    }
    // return app.parseValue(column.mappedValue, row);
    return undefined;
  },
  onClick: (column: MTableColumn, row: Record<string, any>) => {
    emit(`table:${column.mappedValue}:click`, { column, row });
  },
});

//单元格样式
const selectRows = computed(() => config.selectRows.rows || []);
const selectCols = computed(() => config.selectCols.cols || []);

const getCellStyle = ({
  rowIndex,
  column,
  columnIndex,
}: {
  rowIndex: number;
  column: Record<string, any>;
  columnIndex: number;
}) => {
  const baseStyle = { height: config.cellConfig.height, textAlign: config.cellConfig.textAlign };
  if (selectRows.value.includes(rowIndex + 1)) {
    return { ...baseStyle, ...config.selectRows.rowsStyle };
  }
  if (selectCols.value.includes(columnIndex + 1)) {
    return { ...baseStyle, ...config.selectCols.colsStyle };
  }
  if (config.vertical && column.property === 'title') {
    return config.headerStyle;
  }
  if (rowIndex % 2 === 1) {
    return { ...baseStyle, ...config.cellConfig.evenRows };
  }
  if (rowIndex % 2 === 0) {
    return { ...baseStyle, ...config.cellConfig.oddRows };
  }
};

//表头
const columns = computed<MTableColumn[]>(() => config.columns);

//数据源
const tableData = ref();

const formatTableData = (data: any[]) => {
  if (!Array.isArray(data)) return;
  return data;
};

watch(
  () => config.dataSource,
  (newData) => {
    tableData.value = formatTableData(newData);
  },
  { immediate: true }
);

provideMethod(
  'setTableData',
  ({ dataSource: value }) => {
    tableData.value = formatTableData(typeof value === 'string' ? JSON.parse(value) : value);
  },
  ['dataSource']
);
</script>

<style lang="scss">
.topo-ui-table {
  --el-table-tr-bg-color: transparent;
  --el-table-text-color: #333;
  --el-table-row-hover-bg-color: #fff;
  --el-table-border-color: v-bind('config?.style?.borderColor');
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}
</style>
