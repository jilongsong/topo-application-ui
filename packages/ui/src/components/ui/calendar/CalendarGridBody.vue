<script lang="ts" setup>
import { type CalendarGridBodyProps, CalendarGridBody } from 'radix-vue';

const props = defineProps<CalendarGridBodyProps>();
</script>

<template>
  <CalendarGridBody v-bind="props">
    <slot />
  </CalendarGridBody>
</template>
