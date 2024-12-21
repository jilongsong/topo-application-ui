<script lang="ts" setup>
import { computed, markRaw } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import {
  Grid3X3Icon,
  RedoIcon,
  RulerIcon,
  ScalingIcon,
  Trash2Icon,
  UndoIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@topo/icon';

import ToolButton from '../../components/ToolButton.vue';
import useI18n from '../../hooks/useI18n';
import { MenuButton, MenuComponent } from '../../type';
import { ServicesKey } from '../../utils/inject-keys';

const { t } = useI18n();
const services = injectStrict(ServicesKey);
const uiService = services.uiService;
const zoom = computed((): number => uiService.get<number>('zoom') ?? 1);
const showGuides = computed((): boolean => uiService.get<boolean>('showGuides') ?? true);
const showRule = computed((): boolean => uiService.get<boolean>('showRule') ?? true);
const isMac = /mac os x/.test(navigator.userAgent.toLowerCase());
const ctrl = isMac ? 'Command' : 'Ctrl';

const configs = computed<(MenuButton | MenuComponent)[]>(() => [
  {
    type: 'button',
    className: 'zoom-in',
    icon: markRaw(ZoomInIcon),
    tooltip: `${t('editor.放大')}(${ctrl}+=)`,
    handler: () => uiService.zoom(0.1),
  },
  {
    type: 'text',
    text: `${parseInt(`${zoom.value * 100}`, 10)}%`!,
  },
  {
    type: 'button',
    className: 'zoom-out',
    icon: markRaw(ZoomOutIcon),
    tooltip: `${t('editor.缩小')}(${ctrl}+-)`,
    handler: () => uiService.zoom(-0.1),
  },
  {
    type: 'button',
    className: 'scale-to-original',
    icon: markRaw(ScalingIcon),
    tooltip: `${t('editor.缩放到实际大小')}(${ctrl}+1)`,
    handler: () => uiService.set('zoom', 1),
  },
  {
    type: 'button',
    className: 'undo',
    icon: markRaw(UndoIcon),
    tooltip: `${t('editor.后退')}(${ctrl}+z)`,
    disabled: () => !services.historyService.state.canUndo,
    handler: () => services.editorService.undo(),
  },
  {
    type: 'button',
    className: 'redo',
    icon: markRaw(RedoIcon),
    tooltip: `${t('editor.前进')}(${ctrl}+Shift+z)`,
    disabled: () => !services.historyService.state.canRedo,
    handler: () => services.editorService.redo(),
  },
  {
    type: 'button',
    className: 'rule',
    icon: markRaw(RulerIcon),
    tooltip: showRule.value ? t('editor.隐藏标尺') : t('editor.显示标尺'),
    handler: () => uiService.set('showRule', !showRule.value),
  },
  {
    type: 'button',
    className: 'guides',
    icon: markRaw(Grid3X3Icon),
    tooltip: showGuides.value ? t('editor.隐藏参考线') : t('editor.显示参考线'),
    handler: () => uiService.set('showGuides', !showGuides.value),
  },
  {
    type: 'button',
    className: 'delete',
    icon: markRaw(Trash2Icon),
    tooltip: `${t('editor.删除')}(Delete)`,
    disabled: () => services.editorService.get('node')?.type === 'page',
    handler: () => services.editorService.remove(services.editorService.get('node')),
  },
]);
</script>

<template>
  <div
    class="w-80 hover:w-96 h-14 border bg-background shadow rounded-2xl hover:shadow-xl fixed bottom-10 left-1/2 -translate-x-1/2 duration-300"
  >
    <div class="w-full h-full flex items-center gap-2 px-4 overflow-hidden">
      <ToolButton v-for="(item, index) in configs" :key="index" :data="item"></ToolButton>
    </div>
  </div>
</template>
