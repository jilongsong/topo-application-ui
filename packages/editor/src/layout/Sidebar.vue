<template>
  <div class="w-full h-full">
    <Input v-model="componentName" class="h-8" placeholder="Search..." />
    <div v-for="(group, index) in filterList" :key="index" class="w-full py-2">
      <Collapsible :default-open="true">
        <CollapsibleTrigger as-child>
          <div class="w-full flex items-center justify-between px-2 cursor-pointer pb-2">
            <span class="text-sm">{{ group.group }}</span>
            <ChevronsDownUpIcon class="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent class="space-y-2">
          <div class="grid grid-cols-2 gap-2">
            <div v-for="item in group.vertexes" :key="item.id" class="flex flex-col gap-2 items-center justify-center">
              <img
                class="w-20 h-16 cursor-move object-contain"
                :src="getImgSrc(item)"
                alt=""
                draggable
                @dragstart.stop="(event) => onDragstart(event, item)"
              />
              <span class="text-xs text-center">{{ item.name }}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { ChevronsDownUpIcon } from '@topo/icon';
import { MVertex } from '@topo/schema';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Input } from '@topo/ui';

import { ElementModelsKey } from '../constants/inject-keys';
import { ElementModel } from '../type';
import { injectStrict } from '../utils/vue-aide';

const modelList = injectStrict<ElementModel[]>(ElementModelsKey);

const componentName = ref<string>('');

const filterList = computed(() => {
  return modelList.reduce((total: ElementModel[], current) => {
    const result =
      current && current.vertexes
        ? current.vertexes.reduce((pre: MVertex[], value) => {
            if (value.name.includes(componentName.value)) {
              pre.push(value);
            }
            return pre;
          }, [])
        : [];
    total.push({
      group: current.group,
      vertexes: result,
    });
    return total;
  }, []);
});

const getImgSrc = (vertex: MVertex) => vertex.states.find((s) => s.default)?.src;

const onDragstart = (event: DragEvent, vertex: MVertex) => {
  event.dataTransfer?.setData('application/json', JSON.stringify(vertex));
};
</script>
