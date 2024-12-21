<template>
  <component
    :id="config.id"
    :is="tagName"
    :class="[`topo-ui-component${config.className ? ` ${config.className}` : ''}`, className]"
    :config="config"
    :context="context"
    :emit="emit"
    :provide-method="provideMethod"
    :define-ref-state="defineRefState"
  ></component>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import {
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
  // @ts-ignore
} from 'virtual:__federation__';

import { useApp, UseAppProps } from '@topo/core';
import { MNode } from '@topo/schema';

const props = defineProps<UseAppProps<MNode>>();

const { emit, provideMethod, defineRefState, createClass } = useApp(props);
const className = computed(() => createClass(props.config.style));

const tagName = defineAsyncComponent(async () => {
  const module = await __federation_method_getRemote('remote-ui', `./${props.config.type}`);
  return __federation_method_unwrapDefault(module.component);
});
</script>
