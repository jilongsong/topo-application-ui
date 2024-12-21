<template>
  <div class="flex items-center justify-between border-b px-2" style="height: 60px">
    <div v-for="key in keys" :key="key" class="w-full h-full">
      <div v-if="key === ColumnLayout.LEFT" class="flex items-center justify-start gap-2 h-full pl-2">
        <ControlDirectory />
        <MaterialsButtonGroup />
      </div>
      <div v-if="key === ColumnLayout.CENTER" class="flex items-center justify-center gap-4 h-full">
        <!-- <ToolButton v-for="(item, index) in buttons[key]" :key="index" :data="item"></ToolButton> -->
      </div>
      <div v-if="key === ColumnLayout.RIGHT" class="flex items-center justify-end gap-2 h-full pr-2">
        <ToolButton v-for="(item, index) in buttons[key]" :key="index" :data="item"></ToolButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, markRaw } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import {
  ExpandIcon,
  Grid3X3Icon,
  RedoIcon,
  RulerIcon,
  ScalingIcon,
  Trash2Icon,
  UndoIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@topo/icon';

import ToolButton from '../components/ToolButton.vue';
import useI18n from '../hooks/useI18n';
import { ColumnLayout, MenuBarData, MenuButton, MenuComponent, MenuItem } from '../type';
import { ServicesKey } from '../utils/inject-keys';

import ControlDirectory from './ControlDirectory.vue';
import MaterialsButtonGroup from './MaterialsButtonGroup.vue';

const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    data?: MenuBarData;
  }>(),
  {
    data: () => ({}),
  }
);

const services = injectStrict(ServicesKey);
const uiService = services.uiService;

const keys = Object.values(ColumnLayout);

const showGuides = computed((): boolean => uiService.get<boolean>('showGuides') ?? true);
const showRule = computed((): boolean => uiService.get<boolean>('showRule') ?? true);
const zoom = computed((): number => uiService.get<number>('zoom') ?? 1);

const isMac = /mac os x/.test(navigator.userAgent.toLowerCase());
const ctrl = isMac ? 'Command' : 'Ctrl';
const getConfig = (item: MenuItem): (MenuButton | MenuComponent)[] => {
  if (typeof item !== 'string') {
    return [item];
  }
  const config: (MenuButton | MenuComponent)[] = [];
  const zoomRatio = parseInt(`${zoom.value * 100}`, 10);
  switch (item) {
    case '/':
      config.push({
        type: 'divider',
        className: 'divider',
      });
      break;
    case 'zoom':
      config.push(
        ...getConfig('zoom-out'),
        ...getConfig(`${zoomRatio}%`),
        ...getConfig('zoom-in'),
        ...getConfig('scale-to-original'),
        ...getConfig('scale-to-fit')
      );
      break;
    case 'delete':
      config.push({
        type: 'button',
        className: 'delete',
        icon: markRaw(Trash2Icon),
        tooltip: `${t('editor.删除')}(Delete)`,
        disabled: () => services.editorService.get('node')?.type === 'page',
        handler: () => services.editorService.remove(services.editorService.get('node')),
      });
      break;
    case 'undo':
      config.push({
        type: 'button',
        className: 'undo',
        icon: markRaw(UndoIcon),
        tooltip: `${t('editor.后退')}(${ctrl}+z)`,
        disabled: () => !services.historyService.state.canUndo,
        handler: () => services.editorService.undo(),
      });
      break;
    case 'redo':
      config.push({
        type: 'button',
        className: 'redo',
        icon: markRaw(RedoIcon),
        tooltip: `${t('editor.前进')}(${ctrl}+Shift+z)`,
        disabled: () => !services.historyService.state.canRedo,
        handler: () => services.editorService.redo(),
      });
      break;
    case 'zoom-in':
      config.push({
        type: 'button',
        className: 'zoom-in',
        icon: markRaw(ZoomInIcon),
        tooltip: `${t('editor.放大')}(${ctrl}+=)`,
        handler: () => uiService.zoom(0.1),
      });
      break;
    case 'zoom-out':
      config.push({
        type: 'button',
        className: 'zoom-out',
        icon: markRaw(ZoomOutIcon),
        tooltip: `${t('editor.缩小')}(${ctrl}+-)`,
        handler: () => uiService.zoom(-0.1),
      });
      break;
    case 'scale-to-original':
      config.push({
        type: 'button',
        className: 'scale-to-original',
        icon: markRaw(ScalingIcon),
        tooltip: `${t('editor.缩放到实际大小')}(${ctrl}+1)`,
        handler: () => uiService.set('zoom', 1),
      });
      break;
    case 'scale-to-fit':
      config.push({
        type: 'button',
        className: 'scale-to-fit',
        icon: markRaw(ExpandIcon),
        tooltip: `${t('editor.缩放以适应')}(${ctrl}+0)`,
        handler: async () => uiService.set('zoom', await uiService.calcZoom()),
      });
      break;
    case 'rule':
      config.push({
        type: 'button',
        className: 'rule',
        icon: markRaw(RulerIcon),
        tooltip: showRule.value ? t('editor.隐藏标尺') : t('editor.显示标尺'),
        handler: () => uiService.set('showRule', !showRule.value),
      });
      break;
    case 'guides':
      config.push({
        type: 'button',
        className: 'guides',
        icon: markRaw(Grid3X3Icon),
        tooltip: showGuides.value ? t('editor.隐藏参考线') : t('editor.显示参考线'),
        handler: () => uiService.set('showGuides', !showGuides.value),
      });
      break;
    default:
      config.push({
        type: 'text',
        text: item,
      });
  }
  return config;
};

const buttons = computed(() => {
  const data: {
    [ColumnLayout.LEFT]: (MenuButton | MenuComponent)[];
    [ColumnLayout.CENTER]: (MenuButton | MenuComponent)[];
    [ColumnLayout.RIGHT]: (MenuButton | MenuComponent)[];
  } = {
    [ColumnLayout.LEFT]: [],
    [ColumnLayout.CENTER]: [],
    [ColumnLayout.RIGHT]: [],
  };
  keys.forEach((key) => {
    const items = props.data[key] || [];
    items.forEach((item) => {
      data[key].push(...getConfig(item));
    });
  });
  return data;
});
</script>
