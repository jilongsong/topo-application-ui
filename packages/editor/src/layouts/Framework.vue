<template>
  <div class="flex flex-col h-full">
    <div class="w-full h-full">
      <ResizablePanelGroup direction="horizontal" class="h-full">
        <ResizablePanel style="overflow: visible" :default-size="16">
          <slot name="sidebar"></slot>
        </ResizablePanel>
        <ResizablePanel>
          <slot name="workspace"></slot>
        </ResizablePanel>
        <ResizablePanel :default-size="16" class="border-l">
          <slot name="props-panel"></slot>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import StageCore from '@topo/stage';
import { ResizablePanel, ResizablePanelGroup } from '@topo/ui';

import { ServicesKey } from '../utils/inject-keys';

withDefaults(
  defineProps<{
    codeOptions?: Record<string, any>;
  }>(),
  {
    codeOptions: () => ({}),
  }
);

const { editorService } = injectStrict(ServicesKey);

const loading = ref<boolean>(true);

const stage = computed(() => editorService?.get<StageCore>('stage'));

watch(
  () => stage.value,
  (stage: StageCore | undefined) => {
    if (!stage) {
      return;
    }
    stage
      .on('pre-runtime', () => {
        loading.value = true;
      })
      .on('renderer-resolve', () => {
        loading.value = false;
      });
  },
  { immediate: true }
);
</script>
