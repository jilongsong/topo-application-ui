<template>
  <el-form-item class="topo-ui-select" :label="config.label" :style="labelOtherOptions">
    <el-select
      v-model="value"
      :disabled="disabled"
      collapse-tags
      collapse-tags-tooltip
      :placeholder="config.placeholder"
      @change="handleChangeSelect"
    >
      <el-option
        v-for="item in columns"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { ElFormItem, ElOption, ElSelect } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/select/style/css';

import { MSelect } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MSelect>>();

//OPTIONS CONFIG
const value = defineRefState<string>('value', config.value);
const columns = defineRefState('columns', config.columns);

//INTERACTION CONFIG
const disabled = defineRefState<boolean>('disabled', config.disabled);

//LABEL CONFIG
const showLabel = computed(() => (config.showLabel ? 'block' : 'none'));

const labelWidth = computed(() => (config.labelPosition === 'top' ? '100%' : config.labelWidth + '%'));

const labelOtherOptions = computed(() => {
  const blockType = config.labelPosition === 'top' ? 'block' : 'flex';
  return {
    display: blockType,
    justifyContent: blockType === 'flex' ? 'space-between' : '',
    textAlign: config.labelAlignment,
  };
});

const changeFormData: any = inject('changeFormData', null);

const handleChangeSelect = (val: string) => {
  emit('select:change', { value: val });
  changeFormData && changeFormData(config.name, value.value);
};
</script>

<style lang="scss">
.topo-ui-select {
  align-items: center;
  .el-form-item__content {
    flex: 1;
    height: 100%;
  }
  .el-form-item__label {
    width: v-bind(labelWidth) !important;
    display: v-bind(showLabel);
    margin-right: 10px;
    padding: 5px 0;
    line-height: 22px;
    color: v-bind('config.style?.labelColor');
    font-size: calc(v-bind('config.style?.labelFontSize') * 1px);
  }
  .el-select {
    width: 100%;
    height: 100%;
    --el-select-border-color: v-bind('config.style?.inputBorderColor');
    --el-select-border-color-hover: v-bind('config.style?.inputActiveColor');
    --el-select-input-focus-border-color: v-bind('config.style?.inputActiveColor');
    .el-select__placeholder {
      color: v-bind('config.style?.inputTextColor');
    }
    .el-select__wrapper {
      height: 100%;
      background-color: v-bind('config.style?.backgroundColor');
    }
  }
  .select-trigger,
  .el-input {
    height: 100%;
    --el-input-border-color: v-bind('config.style?.inputBorderColor');
    .el-input__wrapper {
      background-color: v-bind('config.style?.backgroundColor');
    }
  }
}
.el-select-dropdown__item.selected {
  color: v-bind('config.style?.inputActiveColor');
}
</style>
