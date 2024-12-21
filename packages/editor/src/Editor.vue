<template>
  <div class="w-full h-full flex">
    <!-- 侧边栏 -->
    <aside v-if="layout & EditorLayout.Sidebar" class="w-72 border-r p-4" aria-label="编辑器侧边栏">侧边栏</aside>

    <!-- 编辑区域 -->
    <main class="flex-1"><WorkSpace /></main>
    <!-- 右侧属性面板 -->
    <aside v-if="layout & EditorLayout.Properties" class="w-72 border-l p-4" aria-label="右侧属性面板">
      右侧属性面板
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, provide, Ref, ref } from 'vue';

import { App, EditorAbility, Vertex } from '@topo/engine';
import { MElement, MProject } from '@topo/schema';

import { CommandKey, ContextKey, EditorEmitsKey, ElementModelsKey, ModelMethodsKey } from './constants/inject-keys';
import useEngine from './hooks/useEngine';
import useHotKey from './hooks/useHotKey';
import WorkSpace from './layout/WorkSpace.vue';
import { injectStrictWithSelf } from './utils/vue-aide';
import {
  CreatePipeLine,
  EditorLayout,
  ElementModel,
  GetAllEquipmentAndPipe,
  GetElementModels,
  GetInstanceInfo,
  GetInstances,
  GetInstanceTree,
  LineProperties,
  VertexProperties,
} from './type';

const props = withDefaults(
  defineProps<{
    project?: MProject;
    elementModels?: ElementModel[];
    editorLayout?: EditorLayout;
    // vertexProperties?: VertexProperties;
    // lineProperties?: LineProperties;
    getInstances?: GetInstances;
    getInstanceTree?: GetInstanceTree;
    getElementModels?: GetElementModels;
    getInstanceInfo?: GetInstanceInfo;
    getAllEquipmentAndPipe?: GetAllEquipmentAndPipe;
    createPipeLine?: CreatePipeLine;
    ability?: EditorAbility;
  }>(),
  {
    project: () => ({
      id: '',
      name: '',
      gridType: 'mesh',
      gridSize: 25,
      gridColor: 'rgba(123, 123, 123, 0.49)',
      vertexes: [],
      links: [],
    }),
    elementModels: () => [],
    editorLayout: () =>
      EditorLayout.Properties |
      EditorLayout.Sidebar |
      EditorLayout.Workspace |
      EditorLayout.TopBar |
      EditorLayout.ContextMenu,
    // vertexProperties: vertexProperties,
    // lineProperties: lineProperties,
    getInstances: () => [],
    getInstanceTree: () => [],
    getElementModels: () => [],
    getInstanceInfo: () => {},
    getAllEquipmentAndPipe: () => [],
    createPipeLine: () => '',
  }
);

const emits = defineEmits<{
  (event: 'removeVertex', vertex: Vertex): void;
  (event: 'addVertex', vertex: Vertex): void;
  (event: 'publish', app: App): void;
  (event: 'save', app: App): void;
  (event: 'distributeCheck', app: App, data: any): void;
  (event: 'selectChanged', vertexes: Ref<MElement[]>): void;
  (event: 'graphScale', scale: number): void;
  (event: 'created'): void;
}>();

useEngine(props.ability);

const { app, selected, layout } = injectStrictWithSelf(ContextKey);

const { deleteElement } = injectStrictWithSelf(CommandKey);

const loading = ref<boolean>(false);

useHotKey('z', () => app.commandService.undo(), { exact: true, ctrKey: true });

useHotKey('y', () => app.commandService.redo(), { exact: true, ctrKey: true });

useHotKey(
  'Delete',
  () => {
    if (selected.value.length) {
      deleteElement({
        element: selected.value,
      });
    }
  },
  { exact: true }
);

provide(ElementModelsKey, props.elementModels);
provide(ModelMethodsKey, {
  getInstances: props.getInstances,
  getInstanceTree: props.getInstanceTree,
  getInstanceInfo: props.getInstanceInfo,
  getAllEquipmentAndPipe: props.getAllEquipmentAndPipe,
  createPipeLine: props.createPipeLine,
  vertexProperties: {} as VertexProperties,
  lineProperties: {} as LineProperties,
  getElementModels: props.getElementModels,
});
provide(EditorEmitsKey, { emits });

defineExpose({
  app,
  selected,
});

onMounted(async () => {
  loading.value = true;
});

onUnmounted(() => {
  app.clearGraph();
});
</script>
