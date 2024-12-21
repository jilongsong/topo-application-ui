<script lang="ts" setup>
import { ref } from 'vue';

import { Maximize2Icon } from '@topo/icon';
import { CodeEditor, CodeEditorDialog } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import { CodeFieldConfig, FieldProps } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<CodeFieldConfig>>();

const contexts = useDependency(props.fieldName, 'contexts', props.field.contexts);

const open = ref(false);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <div
      class="h-10 flex items-center border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
    >
      <CodeEditor
        v-bind="slotProps.componentField"
        class="h-full flex-1"
        :contexts="contexts"
        :options="{
          minimap: { enabled: false },
          lineNumbers: 'off',
          scrollBeyondLastLine: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          glyphMargin: false,
          automaticLayout: true,
          fontSize: 16,
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
          },
          suggest: {
            snippetsPreventQuickSuggestions: false,
            showIcons: true,
            showStatusBar: true,
            preview: true,
          },
          wordBasedSuggestions: false,
          parameterHints: {
            enabled: true,
          },
        }"
      />
      <Maximize2Icon class="w-4 h-4 ml-1" @click="open = true" />
    </div>
    <CodeEditorDialog
      v-model:model-value="slotProps.componentField.modelValue"
      v-model:open="open"
      :title="label"
      :description="field.description"
      :options="{
        fontSize: 16,
      }"
    />
  </PanelLayout>
</template>
