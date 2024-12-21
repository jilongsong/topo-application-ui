<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@topo/ui';

import type { BooleanFieldConfig, FieldProps } from '../schema';
import { beautifyObjectName } from '../utils';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<BooleanFieldConfig>>();
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <Tabs
        :model-value="`${slotProps.componentField.modelValue}`"
        @update:model-value="
          (value) => {
            slotProps.componentField['onUpdate:modelValue']?.(value === 'true');
          }
        "
      >
        <TabsList as="div" class="w-full h-8">
          <TabsTrigger class="w-full h-6" value="true" :disabled="disabled">
            {{ field.enabledTitle ?? beautifyObjectName('on') }}
          </TabsTrigger>
          <TabsTrigger class="w-full h-6" value="false" :disabled="disabled">
            {{ field.disableTitle ?? beautifyObjectName('off') }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </slot>
  </PanelLayout>
</template>
