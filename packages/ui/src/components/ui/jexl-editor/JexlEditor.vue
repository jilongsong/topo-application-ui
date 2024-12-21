<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { JexlEditor, JexlEditorOptions } from '@topo/expression';

const props = defineProps<{
  context?: Record<string, any>;
  options?: JexlEditorOptions;
}>();

const modelValue = defineModel<string>('modelValue');

const editor = new JexlEditor({
  context: props.context,
  ...props.options,
});

const editorContainer = ref<HTMLDivElement | null>(null);

editor.on('change', () => {
  modelValue.value = editor.getValue();
});

watch(
  () => modelValue.value,
  (value?: string) => {
    if (editor && value !== editor.getValue()) {
      editor.setValue(value ?? '');
    }
  },
  { immediate: true }
);

watch(
  () => props.context,
  (context) => editor.setContext(context ?? {}),
  { deep: true }
);

onMounted(() => {
  if (!editorContainer.value) return;
  editor.mount(editorContainer.value);
  editor.setValue(modelValue.value ?? '');
});

onUnmounted(() => {
  editor.dispose();
});
</script>

<template>
  <div ref="editorContainer" class="h-full"></div>
</template>
