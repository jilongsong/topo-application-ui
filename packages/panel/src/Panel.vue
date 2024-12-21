<script setup lang="ts">
import { watch } from 'vue';
import { defaultsDeep } from 'lodash-es';
import { useForm } from 'vee-validate';

import PanelField from './components/PanelField.vue';
import { ContainerLayoutConfig, PanelConfig } from './schema';
import { parseConfig } from './utils';

const { panelConfig, defaultValues } = defineProps<{
  panelConfig: PanelConfig;
  defaultValues?: any;
}>();

const emits = defineEmits<{
  submit: [event: Record<string, any>];
  change: [event: Record<string, any>];
}>();

const form = useForm({
  initialValues: defaultsDeep(parseConfig(panelConfig, defaultValues)),
  keepValuesOnUnmount: true,
});

const onSubmit = form.handleSubmit((val) => emits('submit', val));

watch(
  () => form.values,
  (values) => {
    emits('change', values);
  },
  { deep: true }
);

function getLayoutStyles(layout?: ContainerLayoutConfig) {
  if (!layout) return {};

  const styles: Record<string, any> = {
    display: layout.type === 'flex' ? 'flex' : layout.type === 'grid' ? 'grid' : 'flex',
  };

  if (layout.type === 'grid') {
    if (layout.grid?.columns) {
      styles.gridTemplateColumns = `repeat(${layout.grid.columns}, 1fr)`;
    }
    if (layout.grid?.gap) {
      styles.gap = typeof layout.grid.gap === 'number' ? `${layout.grid.gap}px` : layout.grid.gap;
    }
    if (layout.grid?.rowGap) {
      styles.rowGap = typeof layout.grid.rowGap === 'number' ? `${layout.grid.rowGap}px` : layout.grid.rowGap;
    }
    if (layout.grid?.columnGap) {
      styles.columnGap =
        typeof layout.grid.columnGap === 'number' ? `${layout.grid.columnGap}px` : layout.grid.columnGap;
    }
    if (layout.grid?.autoFlow) {
      styles.gridAutoFlow = layout.grid.autoFlow;
    }
  } else if (layout.type === 'flex') {
    if (layout.flex?.direction) {
      styles.flexDirection = layout.flex.direction;
    }
    if (layout.flex?.wrap) {
      styles.flexWrap = 'wrap';
    }
    if (layout.flex?.gap) {
      styles.gap = typeof layout.flex.gap === 'number' ? `${layout.flex.gap}px` : layout.flex.gap;
    }
    if (layout.flex?.alignItems) {
      styles.alignItems = layout.flex.alignItems;
    }
    if (layout.flex?.justifyContent) {
      styles.justifyContent = layout.flex.justifyContent;
    }
  } else if (layout.type === 'flow') {
    styles.display = 'flex';
    styles.flexWrap = 'wrap';
    if (layout.flow?.gap) {
      styles.gap = typeof layout.flow.gap === 'number' ? `${layout.flow.gap}px` : layout.flow.gap;
    }
    if (layout.flow?.minWidth) {
      styles.minWidth = typeof layout.flow.minWidth === 'number' ? `${layout.flow.minWidth}px` : layout.flow.minWidth;
    }
  }

  return styles;
}

function getFieldGridStyles(field: any, layout?: ContainerLayoutConfig) {
  if (!field.grid || layout?.type !== 'grid') return {};

  const styles: Record<string, any> = {};

  // 处理基本的跨行跨列
  if (field.grid.columnSpan) {
    styles.gridColumn = `span ${field.grid.columnSpan}`;
  }
  if (field.grid.rowSpan) {
    styles.gridRow = `span ${field.grid.rowSpan}`;
  }

  // 处理精确的开始和结束位置
  if (field.grid.columnStart) {
    styles.gridColumnStart = field.grid.columnStart;
  }
  if (field.grid.columnEnd) {
    styles.gridColumnEnd = field.grid.columnEnd;
  }
  if (field.grid.rowStart) {
    styles.gridRowStart = field.grid.rowStart;
  }
  if (field.grid.rowEnd) {
    styles.gridRowEnd = field.grid.rowEnd;
  }

  // 处理区域配置
  if (field.grid.area && layout?.grid?.areas?.[field.grid.area]) {
    const [colStart, colEnd, rowStart, rowEnd] = layout.grid.areas[field.grid.area];
    styles.gridColumnStart = colStart;
    styles.gridColumnEnd = colEnd;
    styles.gridRowStart = rowStart;
    styles.gridRowEnd = rowEnd;
  }

  return styles;
}

defineExpose({
  values: form.values,
  setValues: form.setValues,
  resetForm: form.resetForm,
  submitForm: form.submitForm,
  handleSubmit: form.handleSubmit,
  handleReset: form.handleReset,
});
</script>

<template>
  <form class="w-full" @submit="onSubmit">
    <slot name="customAutoForm" :fields="panelConfig.fields">
      <div :style="getLayoutStyles(panelConfig.layout)" class="w-full">
        <template v-for="(field, key) of panelConfig.fields" :key="key">
          <slot :field="field" :name="key.toString()" :field-name="key.toString()">
            <PanelField
              class="min-w-0"
              :style="getFieldGridStyles(field, panelConfig.layout)"
              :field-name="key.toString()"
              :field="panelConfig.fields[key as keyof typeof panelConfig]"
            />
          </slot>
        </template>
      </div>
    </slot>

    <slot :form-config="panelConfig" />
  </form>
</template>
