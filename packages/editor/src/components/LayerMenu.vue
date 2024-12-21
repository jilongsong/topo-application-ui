<template>
  <content-menu ref="menu" :menu-data="menuData" style="overflow: initial"></content-menu>
</template>

<script lang="ts" setup>
import { computed, markRaw, ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { CopyIcon, PlusIcon, Trash2Icon } from '@topo/icon';

import useI18n from '../hooks/useI18n';
import type { ComponentGroup, MenuButton, MenuComponent } from '../type';
import { LayerContentMenuKey, ServicesKey } from '../utils/inject-keys';

import ContentMenu from './ContentMenu.vue';

const { t } = useI18n();
const services = injectStrict(ServicesKey);
const layerContentMenu = injectStrict(LayerContentMenuKey);

const menu = ref<InstanceType<typeof ContentMenu>>();
const node = computed(() => services?.editorService.get('node'));
const isRoot = computed(() => node.value?.type === 'app');
const isPage = computed(() => node.value?.type === 'page');
const componentList = computed(() => services?.componentListService.getList() || []);
const createMenuItems = (group: ComponentGroup): MenuButton[] =>
  group.items.map((component) => ({
    text: component.text,
    type: 'button',
    handler: () => {
      services?.editorService.add({
        name: component.text,
        type: component.type,
        ...(component.data || {}),
      });
    },
  }));

const getSubMenuData = computed<MenuButton[]>(() => {
  if (node.value?.type === 'tabs') {
    return [
      {
        text: t('editor.标签页'),
        type: 'button',
        handler: () => {
          services?.editorService.add({
            type: 'tab-pane',
          });
        },
      },
    ];
  }
  if (node.value?.items) {
    return (
      componentList.value.reduce(
        (subMenuData: MenuButton[], group: ComponentGroup, index) =>
          subMenuData.concat(
            createMenuItems(group),
            index < componentList.value.length - 1
              ? [
                  {
                    type: 'divider',
                    direction: 'horizontal',
                  },
                ]
              : []
          ),
        []
      ) || []
    );
  }
  return [];
});

const menuData = computed<(MenuButton | MenuComponent)[]>(() => [
  {
    type: 'button',
    text: t('editor.新增'),
    icon: markRaw(PlusIcon),
    display: () => node.value?.items,
    items: getSubMenuData.value,
  },
  {
    type: 'button',
    text: t('editor.复制'),
    icon: markRaw(CopyIcon),
    display: () => !isRoot.value,
    handler: () => {
      node.value && services?.editorService.copy(node.value);
    },
  },
  {
    type: 'button',
    text: t('editor.删除'),
    icon: markRaw(Trash2Icon),
    display: () => !isRoot.value && !isPage.value,
    handler: () => {
      node.value && services?.editorService.remove(node.value);
    },
  },
  ...layerContentMenu,
]);

const show = (e: MouseEvent) => {
  console.log('show', e);
  menu.value?.show(e);
};

defineExpose({
  show,
});
</script>
