<script setup lang="ts">
import { Input } from '@topo/ui';
import { Textarea } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import type { FieldProps, StringFieldConfig } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<StringFieldConfig>>();

const maxLength = useDependency<number>(props.fieldName, 'maxLength', props.field.maxLength);

const minLength = useDependency<number>(props.fieldName, 'minLength', props.field.minLength);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <Textarea
        v-if="field.displayTextArea"
        type="text"
        v-bind="{ ...slotProps.componentField }"
        :max-length="maxLength"
        :min-length="minLength"
        :placeholder="field.placeholder"
      />
      <Input
        v-else
        v-bind="{ ...slotProps.componentField }"
        class="h-8"
        type="text"
        :max-length="maxLength"
        :min-length="minLength"
        :placeholder="field.placeholder"
      />
    </slot>
  </PanelLayout>
</template>
