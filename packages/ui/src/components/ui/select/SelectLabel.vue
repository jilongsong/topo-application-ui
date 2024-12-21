<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { type SelectLabelProps, SelectLabel } from 'radix-vue';

import { cn } from '../../../lib/utils';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
  <SelectLabel :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>
