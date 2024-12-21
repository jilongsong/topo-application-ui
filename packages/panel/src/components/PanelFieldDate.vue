<script setup lang="ts">
import { computed } from 'vue';

import { CalendarIcon } from '@topo/icon';
import { cn } from '@topo/ui';
import { Calendar } from '@topo/ui';
import { Button } from '@topo/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@topo/ui';

import type { DateFieldConfig, FieldProps } from '../schema';
import { parseStringToDateValue } from '../utils';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<DateFieldConfig>>();

const locale = computed(() => props.field.locale ?? 'zh-CN');
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <Popover>
        <PopoverTrigger as-child :disabled="disabled">
          <Button
            variant="outline"
            :class="
              cn(
                'w-full h-8 justify-start text-left font-normal',
                !slotProps.componentField.modelValue && 'text-muted-foreground'
              )
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" :size="16" />
            {{ slotProps.componentField.modelValue ?? field.placeholder ?? 'Select date' }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            initial-focus
            :locale="locale"
            :model-value="parseStringToDateValue(slotProps.componentField.modelValue, 'YYYY-MM-DD')"
            @update:model-value="
              (v) => {
                slotProps.componentField['onUpdate:modelValue']?.(v?.toString());
              }
            "
          />
        </PopoverContent>
      </Popover>
    </slot>
  </PanelLayout>
</template>
