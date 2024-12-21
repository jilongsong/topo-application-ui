<template>
  <el-form-item class="topo-ui-switch" :label="config.label" :prop="config.name" :style="labelOtherOptions">
    <el-switch
      v-model="value"
      :style="`--el-switch-on-color: ${config.onColor}; --el-switch-off-color: ${config.offColor}`"
      :size="config.size"
      :active-text="config.activeText"
      :inactive-text="config.inactiveText"
      :inline-prompt="config.inlinePrompt"
      :width="config.width"
      :loading="config.loading"
      :disabled="config.disabled"
      @change="onChange"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ElFormItem, ElSwitch } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/switch/style/css';

import { MSwitch } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MSwitch>>();

const value = defineRefState<string>('value', config.value);
const labelWidth = computed(() => (config?.labelPosition === 'top' ? '100%' : config?.labelWidth + '%'));
const showLabel = computed(() => (config?.showLabel ? 'block' : 'none'));

const labelOtherOptions = computed(() => {
  const blockType = config?.labelPosition === 'top' ? 'block' : 'flex';
  return {
    display: blockType,
    justifyContent: blockType === 'flex' ? 'space-between' : '',
    textAlign: config?.labelAlignment,
  };
});

const onChange = () => {
  emit('switch:change', { value: value.value });
};
</script>

<style lang="scss">
.topo-ui-switch {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .el-switch__label span {
    font-size: calc(v-bind('config.fontSize') * 1px);
  }
  .el-switch__inner .is-text {
    font-size: calc(v-bind('config.fontSize') * 1px);
  }
}
.el-form-item__label {
  width: v-bind(labelWidth) !important;
  display: v-bind(showLabel);
  margin-right: 10px;
  padding: 5px 0;
  line-height: 22px;
  color: v-bind('config.labelFontColor');
  font-size: calc(v-bind('config.labelFontSize') * 1px);
}
.el-form-item__content {
  flex: 1;
  height: 100%;
}
</style>
