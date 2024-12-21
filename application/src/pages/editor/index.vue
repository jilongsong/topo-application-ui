<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import { ElMessage } from 'element-plus';

import { MenuBarData, MoveableOptions, NodePanelConfig, PageSign, Services, topoEditor } from '@topo/editor';
import { EyeIcon, FileTextIcon, SaveIcon } from '@topo/icon';
import StageCore from '@topo/stage';
import { Dialog, DialogContent } from '@topo/ui';

import { getComponents } from '../../assets/data/components';

const idPrefix = 'topo';
const stageRect = { width: 1920, height: 1080 };
const runtimeUrl = '/#/stage';
const previewUrl = '/#/preview';

const editorRef = ref<InstanceType<typeof topoEditor>>();
const runtimeIframe = ref<HTMLIFrameElement>();
const stageRef = ref<HTMLDivElement>();

const dsl = ref(JSON.parse(localStorage.getItem('dsl') as string));

const dialogVisible = ref(false);

const defaultSelected = computed(() => dsl.value?.items?.[0].id);

const executors = ref([]);

const menu = computed<MenuBarData>(() => ({
  left: [],
  center: ['delete', 'undo', 'redo', 'guides', 'rule', 'zoom'],
  right: [
    '/',
    {
      type: 'button',
      tooltip: '预览',
      icon: EyeIcon,
      handler: () => {
        save();
        dialogVisible.value = true;
      },
    },
    {
      type: 'button',
      tooltip: '保存',
      icon: SaveIcon,
      handler: async () => {
        save();
      },
    },
    '/',
    {
      type: 'button',
      icon: FileTextIcon,
      tooltip: '源码',
      handler: (service) =>
        service?.uiService.set(
          'currentPage',
          service?.uiService.get('currentPage') === PageSign.SOURCE_CODE ? PageSign.DEFAULT : PageSign.SOURCE_CODE
        ),
    },
  ],
}));

const save = () => {
  const rawDSL = toRaw(dsl.value);
  localStorage.setItem('dsl', JSON.stringify(rawDSL));
  ElMessage.success('保存成功');
};

const canSelect = (el: HTMLElement): boolean => {
  if (!el.id) {
    return false;
  }
  return el.id.startsWith(idPrefix) || /^(-?\d+)(\.\d+)?$/.test(el.id);
};

const moveableOptions = (core?: StageCore): MoveableOptions => {
  const options: MoveableOptions = {};
  const id = core?.dr?.target?.id;

  if (!id || !editorRef.value) return options;

  const node = editorRef.value.editorService.getNodeById(id);

  if (!node) return options;

  const isPage = node.type === 'page';

  options.draggable = !isPage;
  options.resizable = !isPage;
  options.rotatable = !isPage;

  return options;
};

const onStageRuntimeReady = (el: HTMLDivElement) => {
  stageRef.value = el;
};

const propsConfig = async (type: string, services: Services): Promise<NodePanelConfig> => {
  const realUrl = type.replace(/([A-Z])/g, '-$1').toLowerCase();
  const module = await import(`../../components/${realUrl}/index.ts`);
  const config = module.default.config;
  const result: NodePanelConfig = {
    property: config.property,
    style: config.style,
    event: config.event,
  };
  if (typeof config.property === 'function') {
    result.property = await config.property(services);
  }
  if (typeof config.style === 'function') {
    result.style = await config.style(services);
  }
  if (typeof config.event === 'function') {
    result.event = await config.event(services);
  }
  return result;
};

const propsValue = async (type: string) => {
  const realUrl = type.replace(/([A-Z])/g, '-$1').toLowerCase();
  const module = await import(`../../components/${realUrl}/index.ts`);
  return module.default.value;
};

onMounted(async () => {
  if (editorRef.value) {
    editorRef.value.uiService.set('showSrc', false);
    editorRef.value.propsService.setIdPrefix(idPrefix);
    if (!dsl.value) {
      console.log('dsl kong');

      const response = await fetch('/dsl.json');
      const json = await response.json();
      dsl.value = json;
    }
  }
  const res = await fetch('/data.json');
  executors.value = await res.json();
});
</script>

<template>
  <div id="#app-dev" style="width: 100%; height: 100%">
    <topo-editor
      ref="editorRef"
      v-model="dsl"
      :menu="menu"
      :default-selected="defaultSelected"
      :component-group-list="getComponents()"
      style="width: 100%; height: 100%"
      :content-menu="[]"
      :can-select="canSelect"
      :runtime-url="runtimeUrl"
      :executors="executors"
      :props-config="propsConfig"
      :props-value="propsValue"
      :stage-rect="stageRect"
      :moveable-options="moveableOptions"
      :auto-scroll-into-view="true"
      @stage-runtime-ready="onStageRuntimeReady"
    ></topo-editor>
    <Dialog v-model:open="dialogVisible">
      <DialogContent class="sm:max-w-full h-full">
        <iframe v-if="dsl" ref="runtimeIframe" title="preview" width="100%" height="100%" :src="previewUrl"></iframe>
      </DialogContent>
    </Dialog>
  </div>
</template>
