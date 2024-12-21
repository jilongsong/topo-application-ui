<template>
  <CodeEditor
    :height="height"
    :init-values="model[name]"
    :language="language"
    :options="config.options"
    @save="save"
  ></CodeEditor>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { CodeEditor } from '@topo/ui';

const emit = defineEmits(['change']);

const props = defineProps<{
  model: any;
  name: string;
  config: {
    language?: string;
    options?: Object;
    height?: string;
  };
  prop: string;
}>();

const language = computed(() => props.config.language || 'javascript');
const height = computed(() => document.body.clientHeight - 168);

const save = (v: string) => {
  props.model[props.name] = v;
  emit('change', v);
};
</script>
