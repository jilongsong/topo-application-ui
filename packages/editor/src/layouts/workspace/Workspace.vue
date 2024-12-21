<template>
  <div ref="workspace" class="w-full h-full bg-accent focus:outline-0" tabindex="-1">
    <slot name="stage">
      <topoStage :key="page?.id"></topoStage>
    </slot>

    <slot name="workspace-content"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';
import KeyController from 'keycon';

import type { MNode, MPage } from '@topo/schema';
import { isPage } from '@topo/utils';

import { ServicesKey } from '../../utils/inject-keys';

import topoStage from './Stage.vue';

const services = injectStrict(ServicesKey);
const workspace = ref<HTMLDivElement>();
const nodes = computed(() => services.editorService.get<MNode[]>('nodes'));
const page = computed(() => services.editorService.get<MPage>('page'));

const mouseenterHandler = () => {
  workspace.value?.focus();
};

const mouseleaveHandler = () => {
  workspace.value?.blur();
};

let keycon: KeyController;

onMounted(() => {
  workspace.value?.addEventListener('mouseenter', mouseenterHandler);
  workspace.value?.addEventListener('mouseleave', mouseleaveHandler);

  keycon = new KeyController(workspace.value);

  const isMac = /mac os x/.test(navigator.userAgent.toLowerCase());

  const ctrl = isMac ? 'meta' : 'ctrl';

  keycon
    .keyup('delete', (e) => {
      e.inputEvent.preventDefault();
      if (!nodes.value || isPage(nodes.value[0])) return;
      services.editorService.remove(nodes.value);
    })
    .keyup('backspace', (e) => {
      e.inputEvent.preventDefault();
      if (!nodes.value || isPage(nodes.value[0])) return;
      services.editorService.remove(nodes.value);
    })
    .keydown([ctrl, 'c'], (e) => {
      e.inputEvent.preventDefault();
      nodes.value && services.editorService.copy(nodes.value);
    })
    .keydown([ctrl, 'v'], (e) => {
      e.inputEvent.preventDefault();
      nodes.value && services.editorService.paste({ offsetX: 10, offsetY: 10 });
    })
    .keydown([ctrl, 'x'], (e) => {
      e.inputEvent.preventDefault();
      if (!nodes.value || isPage(nodes.value[0])) return;
      services.editorService.copy(nodes.value);
      services.editorService.remove(nodes.value);
    })
    .keydown([ctrl, 'z'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.undo();
    })
    .keydown([ctrl, 'shift', 'z'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.redo();
    })
    .keydown('up', (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(0, -1);
    })
    .keydown('down', (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(0, 1);
    })
    .keydown('left', (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(-1, 0);
    })
    .keydown('right', (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(1, 0);
    })
    .keydown([ctrl, 'up'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(0, -10);
    })
    .keydown([ctrl, 'down'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(0, 10);
    })
    .keydown([ctrl, 'left'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(-10, 0);
    })
    .keydown([ctrl, 'right'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.move(10, 0);
    })
    .keydown('tab', (e) => {
      e.inputEvent.preventDefault();
      services.editorService.selectNextNode();
    })
    .keydown([ctrl, 'tab'], (e) => {
      e.inputEvent.preventDefault();
      services.editorService.selectNextPage();
    })
    .keydown([ctrl, '='], (e) => {
      e.inputEvent.preventDefault();
      services.uiService.zoom(0.1);
    })
    .keydown([ctrl, 'numpadplus'], (e) => {
      e.inputEvent.preventDefault();
      services.uiService.zoom(0.1);
    })
    .keydown([ctrl, '-'], (e) => {
      e.inputEvent.preventDefault();
      services.uiService.zoom(-0.1);
    })
    .keydown([ctrl, 'numpad-'], (e) => {
      e.inputEvent.preventDefault();
      services.uiService.zoom(-0.1);
    })
    .keydown([ctrl, '0'], async (e) => {
      e.inputEvent.preventDefault();
      services.uiService.set('zoom', await services.uiService.calcZoom());
    })
    .keydown([ctrl, '1'], (e) => {
      e.inputEvent.preventDefault();
      services.uiService.set('zoom', 1);
    });
});

onUnmounted(() => {
  workspace.value?.removeEventListener('mouseenter', mouseenterHandler);
  workspace.value?.removeEventListener('mouseleave', mouseleaveHandler);
  keycon.destroy();
});
</script>
