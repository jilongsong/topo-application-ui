<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import type { EnumFieldConfig, FieldProps } from '../schema';
import { beautifyObjectName } from '../utils';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<EnumFieldConfig>>();

const options = useDependency(props.fieldName, 'options', props.field.options);

const optionIcons = useDependency(props.fieldName, 'optionIcons', props.field.optionIcons);

const optionTitles = useDependency(props.fieldName, 'optionTitles', props.field.optionTitles);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <Select :disabled="disabled" v-bind="{ ...slotProps.componentField }">
        <SelectTrigger class="w-full h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="(option, index) in options" :key="index" :value="`${option}`">
            <component v-if="field.optionIcons" :is="optionIcons?.[index]" :size="16" />
            {{ optionTitles?.[index] || beautifyObjectName(`${option}`) }}
          </SelectItem>
        </SelectContent>
      </Select>
    </slot>
  </PanelLayout>
</template>
