<script lang="ts" setup>
import { ColorPicker } from '@topo/ui';

import { ColorFieldConfig, FieldProps } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<ColorFieldConfig>>();
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <ColorPicker v-bind="slotProps.componentField"></ColorPicker>
  </PanelLayout>
</template>
