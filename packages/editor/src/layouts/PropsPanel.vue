<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { CopyIcon, Trash2Icon } from '@topo/icon';
import { Panel } from '@topo/panel';
import type { MNode } from '@topo/schema';
import { Button, Separator, Tabs, TabsList, TabsTrigger } from '@topo/ui';

import { defaultNodePanelConfig } from '../services/props';
import type { NodePanelConfig } from '../type';
import { ServicesKey } from '../utils/inject-keys';

const services = injectStrict(ServicesKey);

const editorService = services.editorService;

const propsService = services.propsService;

const nodePanelConfig = ref<NodePanelConfig>(defaultNodePanelConfig);

const panelRef = ref<InstanceType<typeof Panel>>();

const panelConfig = computed(() => nodePanelConfig.value[currentTab.value]);

const currentTab = ref<keyof NodePanelConfig>('property');

const node = computed(() => editorService.get<MNode | null>('node'));

const resetPanelValue = () => {
  if (!node.value || !panelRef.value) {
    return;
  }
  panelRef.value.resetForm({ values: node.value[currentTab.value] ?? {} }, { force: true });
};

watch(
  () => node.value,
  async (node, oldNode) => {
    if (!node) {
      nodePanelConfig.value = defaultNodePanelConfig;
      return;
    }
    if (node.id === oldNode?.id) {
      return;
    }
    const type = node.type;
    nodePanelConfig.value = await propsService.getPropsConfig(type, services);
    currentTab.value = 'property';
    resetPanelValue();
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => currentTab.value,
  () => resetPanelValue()
);

const copyId = async () => {
  if (!node.value?.id) return;
  await navigator.clipboard.writeText(`${node.value.id}`);
};
</script>

<template>
  <div class="w-full h-full p-4">
    <div class="flex items-center text-sm font-bold">
      <h2>{{ node?.id }}</h2>
      <Button siz="icon" variant="ghost" @click="copyId">
        <CopyIcon />
      </Button>
      <Button v-if="node?.type !== 'page'" siz="icon" variant="ghost">
        <Trash2Icon />
      </Button>
    </div>
    <div class="text-sm font-bold">名称：{{ node?.name }}</div>
    <Separator class="my-2" />
    <Tabs v-model="currentTab">
      <TabsList class="w-full h-full">
        <TabsTrigger class="w-full h-6" value="property">属性</TabsTrigger>
        <TabsTrigger class="w-full h-6" value="style">样式</TabsTrigger>
        <TabsTrigger class="w-full h-6" value="event">动作</TabsTrigger>
      </TabsList>
      <div class="overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
        <Panel
          ref="panelRef"
          :panel-config="panelConfig"
          @change="(values) => node && editorService.update({ ...node, [currentTab]: values })"
        ></Panel>
      </div>
    </Tabs>
  </div>
</template>
