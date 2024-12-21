<script setup lang="ts">
import { computed, ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { Trash2Icon, XIcon } from '@topo/icon';
import { FieldProps, PanelLayout, useField } from '@topo/panel';
import { Button } from '@topo/ui';

import { ServicesKey } from '../utils/inject-keys';

import { UIFieldConfig } from './schema';

const services = injectStrict(ServicesKey);

const props = defineProps<FieldProps<UIFieldConfig>>();

const uiSelectMode = ref(false);

const { value: modelValue, setValue } = useField<string>(props.fieldName);

const cancelHandler = () => {
  if (!services.uiService) return;
  services.uiService.set<boolean>('uiSelectMode', false);
  uiSelectMode.value = false;
  globalThis.document.removeEventListener('ui-select', clickHandler as EventListener);
};

const clickHandler = ({ detail }: Event & { detail: any }) => {
  if (detail.id) {
    setValue(detail.id);
  }

  if (cancelHandler) {
    cancelHandler();
  }
};

const toName = computed(() => {
  const config = services.editorService.getNodeById(modelValue.value);
  return config?.name || '';
});

const startSelect = () => {
  if (!services.uiService) return;
  services.uiService.set<boolean>('uiSelectMode', true);
  uiSelectMode.value = true;
  globalThis.document.addEventListener('ui-select', clickHandler as EventListener);
};

const deleteHandler = () => {
  if (modelValue) {
    setValue('');
  }
};
</script>

<template>
  <PanelLayout v-bind="props" v-slot="slotProps">
    <slot v-bind="slotProps">
      <section class="w-full min-h-8 text-xs rounded-sm border-[1px] py-1 px-2">
        <Button v-if="uiSelectMode" variant="link" class="p-0" @click="cancelHandler">
          <XIcon class="w-4 h-4 text-red-600 mr-1" /> 取消
        </Button>
        <div v-else class="cursor-pointer grid grid-cols-[1fr,auto] gap-2" style="display: flex" @click="startSelect">
          <Button v-if="!toName" variant="link" class="text-blue-600 truncate p-0">点击此处选择</Button>
          <div v-else class="flex items-center justify-between w-full">
            {{ toName }}
            <Button variant="link" size="icon" @click.stop="deleteHandler">
              <Trash2Icon class="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      </section>
    </slot>
  </PanelLayout>
</template>
