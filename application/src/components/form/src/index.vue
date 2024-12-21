<template>
  <div
    :id="`${config.id || ''}`"
    :class="`topo-ui-container topo-layout-${config.layout}${config.className ? ` ${config.className}` : ''}`"
  >
    <el-form ref="ruleFormRef" class="topo-ui-form" :mode="formData" label-width="120px">
      <topo-ui-component
        v-for="item in config.items"
        :key="item.id"
        :props="formData[item.name as string]"
        :config="item"
        :context="context"
      ></topo-ui-component>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive, ref, watch } from 'vue';

import type { ComponentProps } from '@topo/core';

import { MForm } from './type';

const { config, emit, provideMethod } = defineProps<ComponentProps<MForm>>();

const ruleFormRef = ref();

const formItemsMap = ref<Record<string, any>[]>([]);

const formData = reactive<Record<string, any>>({});

const formatFormData = () => {
  if (!formItemsMap.value || formItemsMap.value.length <= 0) return;
  for (const item of formItemsMap.value) {
    if (['input', 'select', 'checkbox', 'datepicker'].includes(item.type)) {
      formData[item['name']] = item.value;
    }
  }
};

const submitFormData = () => {
  emit('formData:submit', { value: formData });
};

provideMethod('submitFormData', submitFormData);

provide('changeFormData', (formItemName: string, formItemValue: any) => {
  formData[formItemName] = formItemValue;
});

watch(
  () => config.items,
  (newItems) => {
    formItemsMap.value = newItems;
    formatFormData();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
.topo-ui-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  main {
    box-sizing: border-box;
    flex: 1;
    &:hover {
      border: 1px dashed rgb(230, 227, 227);
    }
  }
}
</style>
