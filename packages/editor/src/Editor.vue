<template>
  <framework :code-options="codeOptions">
    <template #sidebar>
      <slot name="sidebar" :editor-service="editorService">
        <Materials />
      </slot>
    </template>
    <template #workspace>
      <slot name="workspace" :editor-service="editorService">
        <workspace>
          <template #stage><slot name="stage"></slot></template>
          <template #workspace-content><slot name="workspace-content" :editor-service="editorService"></slot></template>
        </workspace>
      </slot>
    </template>

    <template #props-panel>
      <slot name="props-panel">
        <props-panel @mounted="() => $emit('props-panel-mounted')"></props-panel>
      </slot>
    </template>

    <template #empty><slot name="empty" :editor-service="editorService"></slot></template>
  </framework>
</template>

<script lang="ts" setup>
import { onUnmounted, provide, reactive, toRaw, watch } from 'vue';

import type { MApp, MExecutorConfig, MNode } from '@topo/schema';
import type StageCore from '@topo/stage';
import { CONTAINER_HIGHLIGHT_CLASS, ContainerHighlightType, MoveableOptions } from '@topo/stage';

import Framework from './layouts/Framework.vue';
import Materials from './layouts/materials-panel/index.vue';
import PropsPanel from './layouts/PropsPanel.vue';
import Workspace from './layouts/workspace/Workspace.vue';
import componentListService from './services/componentList';
import editorService from './services/editor';
import historyService from './services/history';
import propsService, { defaultNodePanelConfig } from './services/props';
import storageService from './services/storage';
import uiService from './services/ui';
import {
  ComponentListMenuKey,
  ContentMenuKey,
  LayerContentMenuKey,
  ServicesKey,
  StageContentMenuKey,
  StageOptionsKey,
  StageRuntimeReadyKey,
} from './utils/inject-keys';
import type {
  ComponentGroup,
  MenuBarData,
  MenuButton,
  MenuComponent,
  PropsConfig,
  PropsValue,
  Services,
  SideBarData,
  StageOptions,
} from './type';

const props = withDefaults(
  defineProps<{
    modelValue: MApp | undefined;
    componentGroupList?: ComponentGroup[];
    sidebar?: SideBarData;
    layerContentMenu?: (MenuButton | MenuComponent)[];
    stageContentMenu?: (MenuButton | MenuComponent)[];
    componentListMenu?: (MenuButton | MenuComponent)[];
    menu?: MenuBarData;
    contentMenu?: any;
    runtimeUrl?: string;
    autoScrollIntoView?: boolean;
    executors?: MExecutorConfig[];
    propsConfig?: PropsConfig;
    propsValue?: PropsValue;
    moveableOptions?: MoveableOptions | ((core?: StageCore) => MoveableOptions);
    defaultSelected?: number | string;
    canSelect?: (el: HTMLElement) => boolean | Promise<boolean>;
    isContainer?: (el: HTMLElement) => boolean | Promise<boolean>;
    containerHighlightClassName?: string;
    containerHighlightDuration?: number;
    containerHighlightType?: ContainerHighlightType;
    stageRect?:
      | string
      | {
          width: number;
          height: number;
        };
    codeOptions?: Record<string | number | symbol, any>;
    uploadPreviewFile?: string;
    isSSOLogin?: boolean;
  }>(),
  {
    componentGroupList: () => [],
    layerContentMenu: () => [],
    stageContentMenu: () => [],
    componentListMenu: () => [],
    menu: () => ({ left: [], right: [] }),
    executors: () => [],
    propsConfig: () => defaultNodePanelConfig,
    propsValue: () => ({}),
    canSelect: (el: HTMLElement) => Boolean(el.id),
    isContainer: (el: HTMLElement) => el.classList?.contains('topo-ui-container'),
    containerHighlightClassName: () => CONTAINER_HIGHLIGHT_CLASS,
    containerHighlightDuration: () => 800,
    containerHighlightType: () => ContainerHighlightType.DEFAULT,
    codeOptions: () => ({}),
    uploadPreviewFile: () => '',
    isSSOLogin: () => false,
  }
);

const emit = defineEmits<{
  (event: 'props-panel-mounted'): void;
  (event: 'update:modelValue', value: any): void;
  (event: 'saveComponent', value: any): void;
  (event: 'stage-runtime-ready', value: HTMLIFrameElement): void;
}>();

const onStageRuntimeReady = (el: HTMLIFrameElement) => {
  emit('stage-runtime-ready', el);
};

editorService.on('saveComponent', (value) => {
  emit('saveComponent', value);
});

editorService.on('root-change', (value) => {
  const node = editorService.get<MNode | null>('node');
  const nodeId = node?.id ?? props.defaultSelected;
  if (nodeId && node !== value) {
    editorService.select(nodeId);
  } else {
    editorService.set('nodes', [value]);
  }

  emit('update:modelValue', toRaw(editorService.get('root')));
});

// 初始值变化，重新设置节点信息
watch(
  () => ({ modelValue: props.modelValue }),
  ({ modelValue }) => {
    if (!modelValue) {
      return;
    }
    editorService.set('root', modelValue);
  },
  { immediate: true }
);

watch(
  () => props.componentGroupList,
  (componentGroupList) => componentListService.setList(componentGroupList),
  { immediate: true }
);

watch(
  () => props.propsConfig,
  (config) => propsService.setPropsConfig(config),
  { immediate: true }
);

watch(
  () => props.propsValue,
  (values) => propsService.setPropsValue(values),
  { immediate: true }
);

watch(
  () => props.executors,
  (executors) => propsService.setExecutors(executors),
  { immediate: true }
);

watch(
  () => props.stageRect,
  (stageRect) => stageRect && uiService.set('stageRect', stageRect),
  { immediate: true }
);

onUnmounted(() => {
  editorService.destroy();
  historyService.destroy();
  propsService.destroy();
  uiService.destroy();
  componentListService.destroy();
  storageService.destroy();
});

const services: Services = {
  componentListService,
  historyService,
  propsService,
  editorService,
  uiService,
  storageService,
};

const stageOptions = reactive<StageOptions>({
  runtimeUrl: props.runtimeUrl ?? '',
  autoScrollIntoView: props.autoScrollIntoView,
  moveableOptions: props.moveableOptions ?? {},
  canSelect: props.canSelect,
  isContainer: props.isContainer,
  containerHighlightClassName: props.containerHighlightClassName,
  containerHighlightDuration: props.containerHighlightDuration,
  containerHighlightType: props.containerHighlightType,
});

provide(ServicesKey, services);
provide(StageOptionsKey, stageOptions);
provide(LayerContentMenuKey, props.layerContentMenu);
provide(StageContentMenuKey, props.stageContentMenu);
provide(ComponentListMenuKey, props.componentListMenu);
provide(ContentMenuKey, props.contentMenu);
provide(StageRuntimeReadyKey, onStageRuntimeReady);
defineExpose(services);
</script>
