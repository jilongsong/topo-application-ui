<script setup lang="ts">
import { JexlEditorOptions } from '@topo/expression';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog';

import JexlEditor from './JexlEditor.vue';

defineProps<{
  title?: string;
  description?: string;
  context?: Record<string, any>;
  options?: JexlEditorOptions;
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
      <JexlEditor v-model="modelValue" class="h-[500px] min-h-[500px]" :options="options" :context="context" />
    </DialogContent>
  </Dialog>
</template>
