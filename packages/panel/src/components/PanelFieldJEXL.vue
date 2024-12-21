<script lang="ts" setup>
import { ref } from 'vue';

import { Maximize2Icon } from '@topo/icon';
import { JexlEditor, JexlEditorDialog } from '@topo/ui';

import useDependency from '../hooks/useDependency';
import { FieldProps, JEXLFieldConfig } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<JEXLFieldConfig>>();

const context = useDependency(props.fieldName, 'context', props.field.context);
console.log('context', context);

const open = ref(false);
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <div
      class="h-10 flex items-center border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
    >
      <JexlEditor
        v-bind="slotProps.componentField"
        class="h-full flex-1"
        :context="context"
        :options="{
          theme: field.theme ?? 'light',
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
    <JexlEditorDialog
      v-bind="slotProps.componentField"
      v-model:open="open"
      :title="label"
      :description="field.description"
      :context="context"
      :options="{
        fontSize: 16,
      }"
    />
  </PanelLayout>
</template>
