<template>
  <el-form-item
    class="topo-ui-input"
    :label="config.label"
    :error="errorMessage"
    :prop="config.name"
    :style="labelOtherOptions"
    :rules="rules"
  >
    <el-input
      v-model="value"
      :type="config.inputType"
      :disabled="disabled"
      :clearable="config.clearable"
      :show-word-limit="config.showWordLimit"
      :placeholder="config.placeholder"
      :maxlength="config.maxlength"
      @blur="validateInputVal"
      @change="onChangeInputValue"
    >
      <template v-if="config.prefixText" #prepend>
        <span>{{ config.prefixText }}</span>
      </template>
      <template v-if="config.suffixText" #append>
        <span>{{ config.suffixText }}</span>
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/input/style/css';

import { MInput } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MInput>>();

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

//VALIDATION CONFIG
const errorMessage = ref<string>('');
const rules = computed(() => config?.validation || []);

const validateInputVal = () => {
  if (rules.value?.length <= 0) return;
  for (const rule of rules.value) {
    if (rule.pattren && !new RegExp(rule.pattren).test(value.value as string)) {
      errorMessage.value = rule.message;
      return;
    }
    errorMessage.value = '';
  }
};

const changeFormData: any = inject('changeFormData', null);

const onChangeInputValue = () => {
  emit('input:change', { value: value.value });
  changeFormData && changeFormData(config.name, value.value);
};
</script>

<style lang="scss">
.topo-ui-input {
  align-items: center;
  .el-input,
  .el-textarea {
    --el-input-focus-border: v-bind('config.inputActiveColor');
    --el-input-focus-border-color: v-bind('config.inputActiveColor');
    --el-input-border-color: v-bind('config.inputBorderColor');
    height: 100%;
    .el-input__inner,
    .el-input__wrapper,
    .el-textarea__inner {
      background-color: transparent;
      color: v-bind('config.inputTextColor');
    }
  }
  .el-input-group__prepend,
  .el-input-group__append {
    background-color: v-bind(' config.inputAppendBgColor');
    color: v-bind('config.inputAppendColor');
    box-shadow: 0 1px 0 0 v-bind(' config.inputAppendBgColor') inset,
      0 -1px 0 0 v-bind(' config.inputAppendBgColor') inset, -1px 0 0 0 v-bind(' config.inputAppendBgColor') inset;
  }
  .el-form-item__label {
    width: v-bind(labelWidth) !important;
    display: v-bind(showLabel);
    margin-right: 10px;
    padding: 5px 0;
    line-height: 22px;
    color: v-bind('config.labelColor');
    font-size: calc(v-bind('config.labelFontSize') * 1px);
  }
  .el-form-item__content {
    flex: 1;
    height: 100%;
  }
}
</style>
