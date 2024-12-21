<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { Minus } from 'lucide-vue-next';
import type { NumberFieldDecrementProps } from 'radix-vue';
import { NumberFieldDecrement, useForwardProps } from 'radix-vue';

import { cn } from '../../../lib/utils';

const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    :class="cn('p-2 rounded-sm disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  >
    <slot>
      <Minus class="h-4 w-4" />
    </slot>
  </NumberFieldDecrement>
</template>
