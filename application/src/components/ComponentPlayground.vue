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

import { useApp, UseAppProps } from '@topo/core';
import { MNode } from '@topo/schema';

const props = defineProps<UseAppProps<MNode>>();

const { emit, provideMethod, defineRefState, createClass } = useApp(props);
const className = computed(() => createClass(props.config.style));

const tagName = defineAsyncComponent(async () => {
  const realUrl = props.config.type?.replace(/([A-Z])/g, '-$1').toLowerCase();
  const module = await import(`./${realUrl}/index.ts`);
  return module.default.component;
});
</script>
