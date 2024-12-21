<script setup lang="ts">
import { FormLabel } from '@topo/ui';

defineProps<{
  required?: boolean;
}>();
</script>

<template>
  <FormLabel>
    <slot />
    <span v-if="required" class="text-destructive"> *</span>
  </FormLabel>
</template>
