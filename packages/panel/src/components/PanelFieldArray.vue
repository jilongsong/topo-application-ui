<script setup lang="ts">
import { provide, watch } from 'vue';
import { FieldArray, FieldContextKey, useField } from 'vee-validate';

import { PlusIcon } from '@topo/icon';
import { Label } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import type { ArrayFieldConfig, FieldProps } from '../schema';
import { beautifyObjectName } from '../utils';

import PanelField from './PanelField.vue';

const props = defineProps<FieldProps<ArrayFieldConfig>>();

const defaultValue = useDependency(props.fieldName, 'defaultValue', props.field.defaultValue);

const fieldContext = useField<any[]>(props.fieldName);

watch(
  () => defaultValue.value,
  (defaultValue) => {
    if (!defaultValue || (fieldContext.value.value && fieldContext.value.value.length > 0)) {
      return;
    }
    fieldContext.setValue(defaultValue);
  },
  {
    immediate: true,
  }
);

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);
</script>

<template>
  <FieldArray v-slot="{ fields, remove, push }" as="section" :name="fieldName">
    <slot v-bind="props">
      <div class="py-2 flex flex-col space-y-2">
        <div class="flex justify-between items-center px-2">
          <Label :for="fieldName" :required="required">
            {{ field.label || beautifyObjectName(fieldName) }}
          </Label>
          <PlusIcon v-if="!field.uneditable" class="w-4 h-4 mr-2 cursor-pointer" @click="push(null)" />
        </div>
        <div v-for="(item, index) of fields" :key="item.key">
          <PanelField
            :field-name="`${fieldName}[${index}]`"
            :field="field.field"
            :handle-reset="() => !field.uneditable && remove(index)"
          />
        </div>
      </div>
    </slot>
  </FieldArray>
</template>
