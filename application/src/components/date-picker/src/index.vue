<template>
  <el-form-item class="topo-ui-datepicker" :label="config.label" :style="labelOtherOptions">
    <el-config-provider :locale="locale">
      <el-date-picker
        v-model="value"
        :type="config.dateType"
        :value-format="config.format || 'YYYY-MM-DD HH:mm:ss'"
        :disabled="disabled"
        :placeholder="config.placeholder"
        @change="changeCurDate"
      />
    </el-config-provider>
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { ElConfigProvider, ElDatePicker, ElFormItem } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { ComponentProps } from '@topo/core';
import { dateFormat } from '@topo/utils';

import 'element-plus/es/components/date-picker/style/css';

import { MDatePicker } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MDatePicker>>();

const locale = ref();
locale.value = zhCn;

//BASIC CONFIG
const value = defineRefState<string>('value', config.value);

const disabled = defineRefState<boolean>('disabled', config.disabled);

//LABEL CONFIG
const showLabel = computed(() => (config?.showLabel ? 'block' : 'none'));

const labelWidth = computed(() => (config?.labelPosition === 'top' ? '100%' : config?.labelWidth + '%'));

const labelOtherOptions = computed(() => {
  const blockType = config?.labelPosition === 'top' ? 'block' : 'flex';
  return {
    display: blockType,
    justifyContent: blockType === 'flex' ? 'space-between' : '',
    textAlign: config?.labelAlignment,
  };
});

const changeFormData: any = inject('changeFormData', null);

const changeCurDate = (time: string) => {
  emit('time:change', { value: dateFormat(time, config.format) });
  changeFormData?.(config.name, dateFormat(time, config.format));
};

watch(
  () => config.currentTime,
  (isCurrentTime: boolean) => {
    if (isCurrentTime) {
      value.value = dateFormat(new Date(), '', config.format) as string;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.topo-ui-datepicker {
  align-items: center;
  .el-form-item__label {
    width: v-bind(labelWidth) !important;
    display: v-bind(showLabel);
    margin-right: 10px;
    padding: 5px 0;
    line-height: 22px;
    color: v-bind('config.style?.labelColor');
    font-size: calc(v-bind('config?.style?.labelFontSize') * 1px);
  }
  .el-form-item__content {
    flex: 1;
    height: 100%;
  }
  .el-date-picker {
    --el-datepicker-active-color: v-bind('config?.style?.inputActiveColor');
    --el-datepicker-hover-text-color: v-bind('config?.style?.inputActiveColor');
    .el-picker-panel {
      height: 100%;
    }
  }
  .el-date-editor {
    --el-input-border-color: v-bind('config?.style?.inputBorderColor');
  }
  .el-input {
    --el-select-border-color: v-bind('config?.style?.inputBorderColor');
    --el-input-focus-border: v-bind('config?.style?.inputActiveColor');
    --el-input-focus-border-color: v-bind('config?.style?.inputActiveColor');
    width: 100%;
    height: 100%;
    .el-input__wrapper {
      background-color: transparent;
    }
  }
}
</style>
