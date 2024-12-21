<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@topo/ui';

import useDependency from '../hooks/useDependency';
import type { FieldProps, NumberFieldConfig } from '../schema';

import PanelLayout from './PanelLayout.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<FieldProps<NumberFieldConfig>>();

const min = useDependency<number>(props.fieldName, 'min', props.field.min);

const max = useDependency<number>(props.fieldName, 'max', props.field.max);

const step = useDependency<number>(props.fieldName, 'step', props.field.step);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <NumberField v-bind="{ ...slotProps.componentField }" :min="min" :max="max" :step="step" :disabled="disabled">
        <NumberFieldContent class="flex justify-between items-center gap-2">
          <NumberFieldInput class="flex-1 h-8" />
          <div class="w-20 flex items-center gap-1">
            <NumberFieldIncrement class="flex bg-accent w-8 h-8 justify-center items-center"></NumberFieldIncrement>
            <NumberFieldDecrement class="flex bg-accent w-8 h-8 justify-center items-center"></NumberFieldDecrement>
          </div>
        </NumberFieldContent>
      </NumberField>
    </slot>
  </PanelLayout>
</template>
