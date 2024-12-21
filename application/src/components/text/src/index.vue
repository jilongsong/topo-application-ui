<template>
  <div>{{ text }}</div>
</template>

<script lang="ts" setup>
import { ComponentProps } from '@topo/core';

import { MText } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MText>>();

const text = defineRefState<MText['property']['text']>('text', config.property.text ?? '');
</script>
