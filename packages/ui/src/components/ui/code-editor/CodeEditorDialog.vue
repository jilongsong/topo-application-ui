<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog';

import CodeEditor, { CodeEditorProps } from './CodeEditor.vue';

defineProps<{
  title?: string;
  description?: string;
  theme?: 'light' | 'dark';
  language?: string;
  options?: CodeEditorProps;
}>();

const open = defineModel<boolean>('open');

const modelValue = defineModel<string>('modelValue');
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[1000px]">
      <DialogHeader>
        <DialogTitle :title="title">{{ title }}</DialogTitle>
        <DialogDescription :title="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <CodeEditor
        v-model="modelValue"
        class="h-[500px] min-h-[500px]"
        :theme="theme"
        :language="language"
        :options="options"
      />
    </DialogContent>
  </Dialog>
</template>
