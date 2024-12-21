<template>
  <content-menu ref="menu" :menu-data="menuData"></content-menu>
</template>

<script lang="ts" setup>
import { computed, markRaw, reactive, ref, watch } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { CopyPlusIcon, DeleteIcon, PanelBottomIcon, PanelTopIcon } from '@topo/icon';
import { MNode } from '@topo/schema';
import StageCore from '@topo/stage';
import { isPage } from '@topo/utils';

import ContentMenu from '../../components/ContentMenu.vue';
import useI18n from '../../hooks/useI18n';
import storageService from '../../services/storage';
import { LayerOffset, Layout, MenuButton, MenuComponent } from '../../type';
import { COPY_STORAGE_KEY } from '../../utils/editor';
import { ContentMenuKey, ServicesKey, StageContentMenuKey } from '../../utils/inject-keys';

const { t } = useI18n();
const props = withDefaults(defineProps<{ isMultiSelect?: boolean }>(), { isMultiSelect: false });

const services = injectStrict(ServicesKey);
const stageContentMenu = injectStrict(StageContentMenuKey);
const contentMenu = injectStrict(ContentMenuKey);

const editorService = services.editorService;
const menu = ref<InstanceType<typeof ContentMenu>>();
const canPaste = ref(false);
const canCenter = ref(false);

const node = computed(() => editorService?.get<MNode>('node'));
const nodes = computed(() => editorService?.get<MNode[]>('nodes'));
const parent = computed(() => editorService?.get('parent'));
const stage = computed(() => editorService?.get<StageCore>('stage'));

const menuData = reactive<(MenuButton | MenuComponent)[]>([
  {
    type: 'button',
    text: t('editor.水平居中'),
    display: () => canCenter.value,
    handler: () => {
      if (!nodes.value) return;
      editorService?.alignCenter(nodes.value);
    },
  },
  {
    type: 'button',
    text: t('editor.复制'),
    icon: markRaw(CopyPlusIcon),
    handler: () => {
      console.log(node.value);
      nodes.value && editorService?.copy(nodes.value);
      canPaste.value = true;
    },
  },
  {
    type: 'button',
    text: t('editor.粘贴'),
    display: () => canPaste.value,
    handler: () => {
      const rect = menu.value?.$el.getBoundingClientRect();
      const parentRect = stage.value?.container?.getBoundingClientRect();
      const initialLeft = (rect?.left || 0) - (parentRect?.left || 0);
      const initialTop = (rect?.top || 0) - (parentRect?.top || 0);

      if (!nodes.value || nodes.value.length === 0) return;
      editorService?.paste({ left: initialLeft, top: initialTop });
    },
  },
  {
    type: 'divider',
    direction: 'horizontal',
    display: () => {
      if (!node.value) return false;
      return !isPage(node.value);
    },
  },
  {
    type: 'button',
    text: t('editor.上移一层'),
    icon: markRaw(PanelTopIcon),
    display: () => !isPage(node.value) && !props.isMultiSelect,
    handler: () => {
      editorService?.moveLayer(1);
    },
  },
  {
    type: 'button',
    text: t('editor.下移一层'),
    icon: markRaw(PanelBottomIcon),
    display: () => !isPage(node.value) && !props.isMultiSelect,
    handler: () => {
      editorService?.moveLayer(-1);
    },
  },
  {
    type: 'button',
    text: t('editor.置顶'),
    display: () => !isPage(node.value) && !props.isMultiSelect,
    handler: () => {
      editorService?.moveLayer(LayerOffset.TOP);
    },
  },
  {
    type: 'button',
    text: t('editor.置底'),
    display: () => !isPage(node.value) && !props.isMultiSelect,
    handler: () => {
      editorService?.moveLayer(LayerOffset.BOTTOM);
    },
  },
  {
    type: 'divider',
    direction: 'horizontal',
    display: () => !isPage(node.value) && !props.isMultiSelect,
  },
  {
    type: 'button',
    text: t('editor.删除'),
    icon: DeleteIcon,
    display: () => !isPage(node.value),
    handler: () => {
      nodes.value && editorService?.remove(nodes.value);
    },
  },
  {
    type: 'divider',
    direction: 'horizontal',
  },
  {
    type: 'button',
    text: t('editor.清空参考线'),
    handler: () => {
      editorService?.get<StageCore>('stage').clearGuides();
    },
  },
  ...contentMenu,
  ...stageContentMenu,
]);

watch(
  parent,
  async () => {
    if (!parent.value || !editorService) return (canCenter.value = false);
    const layout = await editorService.getLayout(parent.value);
    const isLayoutConform = [Layout.ABSOLUTE, Layout.FIXED].includes(layout);
    const isTypeConform = nodes.value?.every(
      (selectedNode) => !['app', 'page', 'pop'].includes(`${selectedNode?.type}`)
    );
    canCenter.value = isLayoutConform && !!isTypeConform;
  },
  { immediate: true }
);

const show = async (e: MouseEvent) => {
  menu.value?.show(e);
  const data = await storageService.getItem(COPY_STORAGE_KEY);
  canPaste.value = data !== 'undefined' && !!data;
};

defineExpose({ show });
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  top: 200px !important;
  .el-dialog__body {
    height: 100px;
  }
}
</style>
