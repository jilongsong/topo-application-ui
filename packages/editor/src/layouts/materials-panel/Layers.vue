<template>
  <ScrollArea
    class="w-full text-sm h-full overflow-y-scroll"
    @mouseenter="addSelectModeListener"
    @mouseleave="removeSelectModeListener"
  >
    <Draggable
      ref="tree"
      v-model="values"
      class="mtl-tree"
      :root-droppable="false"
      :ondragstart="handleDragStart"
      :each-droppable="isDisableDrop"
      children-key="items"
      @after-drop="handleDragEnd"
    >
      <template #default="{ node, stat }">
        <div :id="node.id" class="flex items-center gap-1 px-2">
          <ChevronRightIcon
            v-if="node.items?.length > 0"
            class="w-4 cursor-pointer"
            :class="{ 'rotate-90': stat.open }"
            :open="stat.open"
            @click="stat.open = !stat.open"
          />
          <SquareIcon v-if="isDisableDrop(stat)" class="w-4" />
          <ComponentIcon v-else class="w-4" />
          <div
            class="w-full py-1 cursor-pointer"
            @contextmenu="handleContextMenu($event, node)"
            @mouseenter="highlight(node)"
            @click="handleSelectStat(stat, node)"
          >
            {{ node.name }}
          </div>
          <div v-if="node.type === 'page'" class="text-xs text-gray-300">root</div>
        </div>
      </template>
    </Draggable>
    <teleport to="body">
      <layer-menu ref="menu"></layer-menu>
    </teleport>
  </ScrollArea>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { dragContext, Draggable } from '@he-tree/vue';
import { injectStrict } from '@pictode/vue-aide';
import KeyController from 'keycon';

import { ChevronRightIcon, ComponentIcon, SquareIcon } from '@topo/icon';
import type { Id, MContainer, MNode } from '@topo/schema';
import StageCore from '@topo/stage';
import { ScrollArea } from '@topo/ui';

import LayerMenu from '../../components/LayerMenu.vue';
import { Layout } from '../../type';
import { ServicesKey } from '../../utils/inject-keys';

const services = injectStrict(ServicesKey);
const editorService = services.editorService;
const menu = ref<InstanceType<typeof LayerMenu>>();
const tree = ref();

const page = computed(() => editorService.get('page'));
const values = ref(page.value ? [page.value] : []);

const keycon = ref<KeyController>();

editorService.on('remove', () => {
  setTimeout(() => {
    const page = editorService.get('page');
    values.value = page ? [page] : [];
  }, 0);
});

editorService.on('add', (newNode: MNode[]) => {
  setTimeout(() => {
    const page = editorService.get('page');
    values.value = page ? [page] : [];
    nextTick(() => {
      changeStatClassName(findStatByNodeId(newNode[0].id));
    });
  }, 0);
});

editorService.on('select', (node: MNode) => {
  setTimeout(() => {
    nextTick(() => {
      changeStatClassName(findStatByNodeId(node.id));
    });
  }, 0);
});

editorService.on('update', (node: MNode[]) => {
  setValuesByEvent(node[0]);
});

editorService.on('moveLayer', (node: MNode) => {
  setValuesByEvent(node);
});

editorService.on('moveToContainer', (node: MNode) => {
  setValuesByEvent(node);
});

const setValuesByEvent = (node: MNode) => {
  setTimeout(() => {
    const page = editorService.get('page');
    values.value = page ? [page] : [];
    select(node);
  }, 0);
};

// 触发画布高亮
const highlight = (data: MNode) => {
  if (!data?.id) {
    throw new Error('没有id');
  }
  editorService.highlight(data);
  editorService.get<StageCore>('stage')?.highlight(data.id);
};

// 监听模式选择
const addSelectModeListener = () => {
  const isMac = /mac os x/.test(navigator.userAgent.toLowerCase());
  const ctrl = isMac ? 'meta' : 'ctrl';
  keycon.value = new KeyController();
  keycon.value.keydown(ctrl, (e) => {
    e.inputEvent.preventDefault();
    isMultiSelectStatus.value = true;
  });
  // ctrl+tab切到其他窗口，需要将多选状态置为false
  keycon.value.on('blur', () => {
    isMultiSelectStatus.value = false;
  });
  keycon.value.keyup(ctrl, (e) => {
    e.inputEvent.preventDefault();
    isMultiSelectStatus.value = false;
  });
};

// 移除监听
const removeSelectModeListener = () => {
  keycon.value?.destroy();
  // 如果鼠标移出监听范围，且当前只选中了一个，置为单选模式(修复按住ctrl不放但鼠标移出的情况)
  if (selectedIds.value.length === 1) isMultiSelectStatus.value = false;
};

// 触发画布单选
const select = async (data: MNode) => {
  if (!data.id) {
    throw new Error('没有id');
  }

  await editorService.select(data);
  editorService.get<StageCore>('stage')?.select(data.id);
};

// 触发画布多选
const multiSelect = async (data: Id[]) => {
  await editorService.multiSelect(data);
  editorService.get<StageCore>('stage')?.multiSelect(data);
};

// 是否多选
const isMultiSelectStatus = ref(false);
// 多选场景 取消选中的那个节点id
const spliceNodeKey = ref<Id>();
// 多选选中的节点数组
const selectedNodes = ref<MNode[]>([]);
// 多选选中的组件id数组
const selectedIds = computed(() => selectedNodes.value.map((node: MNode) => node.id));

// 选择节点多选框
const multiClickHandler = (data: MNode): void => {
  if (!data?.id) {
    throw new Error('没有id');
  }

  // 页面(topo-ui-page)不可选中
  if (data.type === 'page') {
    tree.value?.setCheckedKeys([]);
    return;
  }

  const index = selectedNodes.value.findIndex((node) => node.id === data.id);
  if (index !== -1) {
    // 已经包含就移除掉
    selectedNodes.value.splice(index, 1);
    spliceNodeKey.value = data.id;
  } else {
    selectedNodes.value = [...selectedNodes.value, data];
  }
  multiSelect(selectedIds.value);
};

// 点击节点
const clickHandler = (data: MNode): void => {
  if (!isMultiSelectStatus.value) {
    if (services.uiService.get<boolean>('uiSelectMode')) {
      document.dispatchEvent(new CustomEvent('ui-select', { detail: data }));
      return;
    }
    select(data);
  } else {
    multiClickHandler(data);
  }
};

const handleSelectStat = (stat: any, node: MNode) => {
  clickHandler(node);
  changeStatClassName(stat);
};

const findStatByNodeId = (id: Id): any => {
  return tree.value?.statsFlat.find((stat: any) => stat.data.id === id);
};

const changeStatClassName = (stat: any) => {
  clearAllStatClass();
  if (!stat) return;
  tree.value?.closeAll();
  tree.value?.openNodeAndParents(stat);
  const setClassRecursively = (node: any) => {
    node.class = 'bg-blue-100';
    if (node.children && node.children.length > 0) {
      node.children.forEach(setClassRecursively);
    }
  };
  if (isDisableDrop(stat) && stat?.children.length >= 0) {
    stat.class = 'bg-blue-500 rounded-md text-white';
    if (stat.data.type !== 'page') {
      stat.children.forEach(setClassRecursively);
    }
  } else {
    stat.class = stat?.class ? '' : 'bg-purple-500 rounded-md text-white';
  }
};

const clearAllStatClass = () => {
  tree.value?.statsFlat.forEach((s: { class: string }) => {
    s.class = '';
  });
};

const isMoving = ref(false);
const handleDragStart = async () => {
  isMoving.value = true;
};

const handleDragEnd = async () => {
  const node = dragContext.dragNode?.data;
  isMoving.value = false;
  if (!node) return;
  const parent = editorService.getParentById(node.id, false) as MContainer;
  const layout = await editorService.getLayout(parent);
  node.style.position = layout;
  if (layout === Layout.RELATIVE) {
    node.style.top = 0;
    node.style.left = 0;
  }
  setTimeout(() => {
    const page = editorService.get('page');
    editorService.update(page ? [page] : []);
  }, 0);
};

const isDisableDrop = (stat: any) => {
  return ['page', 'container'].includes(stat.data.type);
};

// 右键菜单
const handleContextMenu = async (event: MouseEvent, data: MNode): Promise<void> => {
  event.preventDefault();
  await select(data);
  menu.value?.show(event);
};

watch(
  () => editorService.get<MNode[]>('nodes'),
  (nodes) => {
    selectedNodes.value = nodes ?? [];
  }
);

onMounted(() => {
  const highlightNode = editorService.get<MNode>('nodes');
  highlightNode && changeStatClassName(findStatByNodeId(highlightNode[0].id));
});
</script>
