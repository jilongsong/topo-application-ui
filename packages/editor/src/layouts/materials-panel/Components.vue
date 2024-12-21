<template>
  <div class="w-full relative">
    <div class="relative w-full max-w-sm items-center">
      <Input
        id="search"
        v-model:model-value="searchText"
        type="text"
        placeholder="Type to Search..."
        class="pl-8 h-8"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <SearchIcon class="size-4 text-muted-foreground" />
      </span>
    </div>
    <ScrollArea class="components-list py-2 overflow-y-scroll">
      <div v-for="(group, index) in list" :key="index" class="px-1">
        <div class="space-y-1">
          <button
            :class="
              cn(
                'w-full flex items-center gap-2 rounded-lg px-4 py-4 text-sm font-medium text-gray-600 hover:bg-accent',
                activeGroup === group.type && 'bg-accent text-black'
              )
            "
            @mouseenter="changeCurrentGroup(group.type)"
          >
            <span class="flex-1 text-left">{{ group.title }}</span>
            <ChevronRightIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </ScrollArea>
    <div
      v-show="activeGroup"
      class="absolute w-60 top-[-16px] right-[-258px] h-full overflow-y-scroll z-50 bg-white border-r p-2 transition-all duration-200"
      @mouseleave="activeGroup = null"
    >
      <div class="w-full grid grid-cols-2 gap-4">
        <div
          v-for="item in activeGroupList"
          :key="item.type"
          class="'w-full aspect-square p-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200'"
        >
          <div
            class="mx-auto h-12 w-12 mb-2 bg-accent cursor-move"
            draggable="true"
            @dragstart="dragstartHandler(item, $event)"
            @dragend="dragendHandler"
          ></div>
          <span class="text-sm font-medium">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';
import serialize from 'serialize-javascript';

import { styleCompoundNaming } from '@topo/core';
import {
  ChevronRightIcon,
  Layers3Icon,
  LayoutDashboardIcon,
  MonitorCheckIcon,
  PackageIcon,
  Rows3Icon,
  SearchIcon,
} from '@topo/icon';
import type StageCore from '@topo/stage';
import { cn, Input, ScrollArea } from '@topo/ui';

import type { ComponentGroup, ComponentItem } from '../../type';
import { ServicesKey } from '../../utils/inject-keys';

const componentTypeIconLists = [Layers3Icon, PackageIcon, MonitorCheckIcon, Rows3Icon, LayoutDashboardIcon];

const services = injectStrict(ServicesKey);

const searchText = ref('');
const isDragging = ref(false);

const stage = computed(() => services.editorService.get<StageCore>('stage'));
const list = computed(() =>
  services.componentListService.getList().map((group: ComponentGroup, index: number) => ({
    ...group,
    icon: componentTypeIconLists[index],
    items: group.items,
  }))
);

const activeGroup = ref<string | null>(null);

const activeGroupList = computed(() => {
  if (!activeGroup.value) return [];
  return services.componentListService.getList().find((group: ComponentGroup) => group.type === activeGroup.value)
    ?.items;
});

const changeCurrentGroup = (type: string) => {
  activeGroup.value = type;
};

const appendComponent = ({ text, type, data = {} }: ComponentItem, x: number, y: number): void => {
  services.editorService.add({
    name: text,
    type,
    ...data,
    style: {
      ...data.style,
      position: 'absolute',
      [styleCompoundNaming.position]: {
        left: x,
        top: y,
      },
    },
  });
};

const dragstartHandler = ({ text, type, saveId, componentType, size, data = {} }: ComponentItem, e: DragEvent) => {
  if (e.dataTransfer) {
    isDragging.value = true;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'data',
      serialize({
        name: text,
        type,
        saveId,
        componentType,
        ...data,
      }).replace(/"(\w+)":\s/g, '$1: ')
    );
    // Create a ghost image
    const ghostElement = e.target as HTMLElement;
    const ghost = ghostElement.cloneNode(true) as HTMLElement;
    if (size) {
      ghost.style.width = size.width + 'px';
      ghost.style.height = size.height + 'px';
    } else {
      ghost.style.width = '200px';
      ghost.style.height = '200px';
    }
    ghost.style.backgroundColor = '#F3EEFF';
    ghost.style.border = '1px dashed #c5b1f5';

    ghost.style.opacity = '0.5';
    ghost.style.position = 'absolute';
    ghost.style.left = '-1000px';
    ghost.style.top = '-1000px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, e.offsetX, e.offsetY);

    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 0);
  }
};

const dragendHandler = () => {
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer) {
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    const stageElement = stage.value?.renderer.contentWindow?.document.body;
    if (stageElement) {
      const rect = stageElement.getBoundingClientRect();
      const x = e.clientX - rect.left - data.offsetX;
      const y = e.clientY - rect.top - data.offsetY;
      appendComponent(data, x, y);
    }
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
};

onMounted(() => {
  const stageElement = stage.value?.renderer.contentWindow?.document.body;
  if (stageElement) {
    stageElement.addEventListener('drop', handleDrop);
    stageElement.addEventListener('dragover', handleDragOver);
  }
});

onUnmounted(() => {
  const stageElement = stage.value?.renderer.contentWindow?.document.body;
  if (stageElement) {
    stageElement.removeEventListener('drop', handleDrop);
    stageElement.removeEventListener('dragover', handleDragOver);
  }
});
</script>

<style scoped>
.components-list {
  height: calc(100vh - 100px);
}
</style>
