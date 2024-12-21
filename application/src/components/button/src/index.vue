<template>
  <Primitive as="button" :style="{ cursor: disabled && 'not-allowed' }" :disabled="disabled" @click="onClick">
    {{ text }}
  </Primitive>
</template>

<script lang="ts" setup>
import { Primitive } from 'radix-vue';

import { ComponentProps } from '@topo/core';

import { MButton } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MButton>>();

const text = defineRefState<string>('text', config.property.text);

const disabled = defineRefState<boolean>('disable', config.property.disabled);

const onClick = () => {
  emit('onClick');
};
</script>
