<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as monaco from 'monaco-editor';

import { EditorCompletionProvider } from './provider';
import { dark, light } from './theme';

// 定义主题
monaco.editor.defineTheme('dark', dark);
monaco.editor.defineTheme('light', light);

export type CodeEditorProps = Omit<monaco.editor.IStandaloneEditorConstructionOptions, 'theme' | 'language' | 'value'>;

// 定义 props 和默认值
const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark';
    language?: string;
    contexts?: Record<string, any>[];
    options?: CodeEditorProps;
  }>(),
  {
    theme: () => 'light',
    language: () => 'javascript',
    contexts: () => [],
  }
);

const modelValue = defineModel<string>('modelValue');
const emit = defineEmits<{
  change: [value: string];
}>();

const editorContainer = ref<HTMLElement | null>(null);
let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
const editorId = `editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const completionProvider = EditorCompletionProvider.getInstance();

// 初始化编辑器
const initEditor = () => {
  if (!editorContainer.value) return;

  monacoEditor = monaco.editor.create(editorContainer.value, {
    ...props.options,
    theme: props.theme,
    value: modelValue.value,
    language: props.language,
  });

  // 监听内容变化
  monacoEditor.onDidChangeModelContent(() => {
    if (monacoEditor) {
      const value = monacoEditor.getValue();
      modelValue.value = value;
      emit('change', value);
    }
  });

  completionProvider.registerContext(editorId, props.contexts[0] ?? {});
};

// 监听 props 变化
watch(
  () => modelValue.value,
  (value?: string) => {
    if (monacoEditor && value !== monacoEditor.getValue()) {
      monacoEditor.setValue(value ?? '');
    }
  },
  { immediate: true }
);

watch(
  () => props.theme,
  (newTheme) => {
    if (monacoEditor) {
      monaco.editor.setTheme(newTheme);
    }
  }
);

watch(
  () => props.language,
  (newLanguage) => {
    const editorModel = monacoEditor?.getModel();
    if (editorModel) {
      monaco.editor.setModelLanguage(editorModel, newLanguage);
    }
  }
);

watch(
  () => props.contexts,
  (newContexts) => {
    completionProvider.registerContext(editorId, newContexts[0] ?? {});
  },
  { deep: true }
);

// 生命周期钩子
onMounted(() => {
  initEditor();
});

onBeforeUnmount(() => {
  completionProvider.removeContext(editorId);
  if (monacoEditor) {
    monacoEditor.dispose();
    monacoEditor = null;
  }
});

defineExpose({
  getEditor: () => monacoEditor,
});
</script>

<template>
  <div ref="editorContainer" />
</template>
