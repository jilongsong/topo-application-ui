<template>
  <el-form-item class="topo-ui-checkbox" :label="config.label" :style="labelOtherOptions">
    <el-checkbox-group v-model="value" @change="handleSelectedChange">
      <el-checkbox
        v-for="({ value, label, disabled }, index) in config.options"
        :key="index"
        :disabled="disabled"
        :label="value"
        >{{ label }}</el-checkbox
      >
    </el-checkbox-group>
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { ElCheckbox, ElCheckboxGroup } from 'element-plus';
import { ElFormItem } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/checkbox/style/css';

import { MCheckbox } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MCheckbox>>();

//OPTIONS CONFIG

const value = defineRefState('value', config.value);

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

const handleSelectedChange = () => {
  emit('checkbox:change', { value: value.value });
  changeFormData && changeFormData(config.name, value.value);
};
</script>

<style lang="scss">
.topo-ui-checkbox {
  .el-form-item__content {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .el-checkbox {
    margin-right: 0;
    --el-checkbox-checked-text-color: v-bind('config.themeColor');
    --el-checkbox-checked-input-border-color: v-bind('config.themeColor');
    --el-checkbox-checked-bg-color: v-bind('config.themeColor');
    --el-checkbox-input-border-color-hover: v-bind('config.themeColor');
    --el-checkbox-text-color: v-bind('config.baseColor');
    .el-checkbox__inner {
      border-color: v-bind('config.baseColor');
    }
  }
  .el-form-item__label {
    width: v-bind(labelWidth) !important;
    display: v-bind(showLabel);
    margin-right: 10px;
    line-height: 22px;
    padding: 5px 0;
    color: v-bind('config.labelColor');
    font-size: calc(v-bind('config.labelFontSize') * 1px);
  }
  .el-checkbox-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: v-bind('config.adornments');
  }
}
</style>
