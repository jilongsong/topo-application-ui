<script lang="ts" setup>
import { NumberField, NumberFieldContent, NumberFieldInput } from '@topo/ui';
import { Slider } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import { FieldProps, SliderNumberFieldConfig } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<SliderNumberFieldConfig>>();

const min = useDependency<number>(props.fieldName, 'min', props.field.min);

const max = useDependency<number>(props.fieldName, 'max', props.field.max);

const step = useDependency<number>(props.fieldName, 'step', props.field.step);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <div class="flex items-center gap-1">
      <div class="w-16">
        <NumberField v-bind="slotProps.componentField" :min="min" :max="max" :step="step">
          <NumberFieldContent>
            <NumberFieldInput class="h-8" />
          </NumberFieldContent>
        </NumberField>
      </div>
      <Slider
        :model-value="[slotProps.componentField.modelValue]"
        :min="min"
        :max="max"
        :step="step"
        class="flex-1"
        @update:model-value="
          (val) => {
            if (!val) {
              return;
            }
            slotProps.componentField['onUpdate:modelValue']?.(val[0]);
          }
        "
      />
    </div>
  </PanelLayout>
</template>
