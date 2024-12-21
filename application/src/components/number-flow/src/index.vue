<template>
  <NumberFlow :value="value" />
</template>

<script lang="ts" setup>
import NumberFlow from '@number-flow/vue';

import { ComponentProps } from '@topo/core';

import { MNumberFlow } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MNumberFlow>>();

const value = defineRefState<MNumberFlow['property']['value']>('value', config.property.value);
</script>
