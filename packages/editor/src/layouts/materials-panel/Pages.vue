<template>
  <ScrollArea class="w-full text-sm h-full overflow-y-scroll">
    <div class="flex justify-between">
      <div>Pages</div>
      <div><PlusIcon class="w-4 cursor-pointer" @click="addPage" /></div>
    </div>
    <div class="px-2">
      <div
        v-for="(item, index) in (root && root.items) || []"
        :key="item.key"
        :class="`group flex items-center justify-between gap-2 px-2 py-1 text-gray-600 cursor-pointer rounded-sm my-2 ${
          page?.id === item.id ? 'bg-accent text-gray-900' : ''
        }`"
        @click="selectedPage(item)"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = -1"
      >
        <HomeIcon v-if="index === 0" class="w-4" />
        <FileIcon v-else class="w-4" />
        <span class="flex-1">{{ item.name || item.id }}</span>
        <EllipsisIcon v-if="hoveredIndex === index" class="w-4" @contextmenu="contextmenu($event, item)" />
      </div>
    </div>
  </ScrollArea>
  <content-menu ref="menu" :menu-data="menuData" style="overflow: initial"></content-menu>
</template>

<script lang="ts" setup>
import { computed, markRaw, ref, toRaw } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { CopyIcon, EllipsisIcon, FileIcon, HomeIcon, PencilLineIcon, PlusIcon, Trash2Icon } from '@topo/icon';
import type { MApp, MPage } from '@topo/schema';
import { ConfirmDialog, ScrollArea } from '@topo/ui';

import ContentMenu from '../../components/ContentMenu.vue';
import useCommandComponent from '../../hooks/useCommandComponent';
import type { MenuButton, MenuComponent } from '../../type';
import { generatePageNameByApp } from '../../utils/editor';
import { ServicesKey } from '../../utils/inject-keys';

const alertDialog = useCommandComponent(ConfirmDialog);

const services = injectStrict(ServicesKey);
const editorService = services.editorService;
const root = computed(() => editorService.get<MApp>('root'));
const page = computed(() => editorService.get('page'));

const currentItem = ref<MPage>();
const menu = ref<InstanceType<typeof ContentMenu>>();
const hoveredIndex = ref(-1);

const menuData = computed<(MenuButton | MenuComponent)[]>(() => [
  {
    type: 'button',
    text: '重命名',
    icon: markRaw(PencilLineIcon),
    handler: () => rename(currentItem.value as MPage),
  },
  {
    type: 'button',
    text: '复制',
    icon: markRaw(CopyIcon),
    handler: () => copy(currentItem.value as MPage),
  },
  {
    type: 'button',
    text: '删除',
    icon: markRaw(Trash2Icon),
    handler: () => deletePage(currentItem.value as MPage),
  },
]);

const selectedPage = (page: MPage) => {
  editorService.select(page);
};
const deletePage = (node: MPage) => {
  editorService.remove(node);
};

const addPage = () => {
  if (!editorService) return;
  const pageConfig = {
    type: 'page',
    name: generatePageNameByApp(toRaw(editorService.get('root'))),
  };
  editorService.add(pageConfig);
};

const copy = (node: MPage) => {
  node && editorService.copy(node);
  editorService.paste({
    left: 0,
    top: 0,
  });
};

const rename = (node: MPage) => {
  alertDialog({
    title: '提示',
    description: `重命名${node.name}`,
    inputValue: node.name,
    onConfirm: (name: string) => {
      editorService.update({ ...node, name: String.prototype.trim.call(name) });
    },
  });
};
const contextmenu = async (event: MouseEvent, item: MPage): Promise<void> => {
  event.preventDefault();
  currentItem.value = item;
  menu.value?.show(event);
};
</script>
