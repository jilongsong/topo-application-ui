<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useField } from 'vee-validate';

import { SettingsIcon } from '@topo/icon';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@topo/ui';

import type { BaseFieldConfig, FieldProps } from '../schema';

import PanelFieldObject from './PanelFieldObject.vue';
import PanelLabel from './PanelLabel.vue';

const { field, fieldName } = defineProps<FieldProps<BaseFieldConfig>>();

const { resetField, value } = useField(fieldName);

const isControlledField = computed(
  () => field.controlled && typeof field.controlled === 'object' && 'type' in field.controlled
);

const controllable = ref<boolean>((isControlledField.value && typeof value.value === 'object') || false);

watch(
  () => value.value,
  (newValue) => {
    if (isControlledField.value) {
      controllable.value = typeof newValue === 'object';
    }
  }
);

const onClickLabel = () => {
  if (isControlledField.value) {
    if (controllable.value !== true) {
      resetField({ value: undefined });
    }
    controllable.value = true;
  }
};

const onClickReset = () => {
  controllable.value = false;
  resetField({ value: undefined });
};
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName" as="div" :class="['py-2', { 'px-2': !isControlledField }]">
    <FormItem>
      <PanelLabel
        v-if="!field.hideLabel"
        :required="required"
        :class="['flex items-center', { 'cursor-pointer': isControlledField }]"
        @click="onClickLabel"
      >
        <SettingsIcon v-if="isControlledField" class="w-3 h-3 mr-1" />
        {{ label }}
      </PanelLabel>
      <FormControl>
        <PanelFieldObject
          v-if="controllable && isControlledField && field.controlled"
          :field-name="fieldName"
          :field="field.controlled"
          :handle-reset="onClickReset"
        ></PanelFieldObject>
        <slot v-else v-bind="slotProps" />
      </FormControl>
      <FormDescription v-if="field.description">
        {{ field.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
