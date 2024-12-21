<template>
  <Suspense v-if="pageConfig" @pending="onSuspensePending" @resolve="onSuspenseResolve">
    <topoUiComponent :config="pageConfig"></topoUiComponent>
  </Suspense>
  <div v-else>没有配置页面</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, ref } from 'vue';

import Core, { topoAppKey } from '@topo/core';
import type { Id, MApp, MNode, MPage } from '@topo/schema';
import { getNodePath } from '@topo/utils';

import variant from '../../../public/style.json';
import theme from '../../../public/theme.json';
import topoUiComponent from '../../components/ComponentPlayground.vue';

const root = ref<MApp>();
const curPageId = ref<Id>();
const selectedId = ref<Id>();

const pageConfig = computed<MPage | undefined>(
  () => root.value?.items?.find((item: MNode) => item.id === curPageId.value) ?? root.value?.items?.[0]
);

const designWidth = document.documentElement.getBoundingClientRect().width;

const app = new Core({
  env: 'development',
  designWidth,
  config: root.value,
});
app.styleManager.registerStyleConfig(variant as any);
app.themeManager.set({ light: theme, dark: theme });

window.topoInstance = app;
const onSuspenseResolve = () => {
  const page = document.querySelector<HTMLElement>('.topo-ui-page');
  page && window.topo.onRendererResolve(page);
};

const onSuspensePending = () => {
  window.topo.onRendererPending();
};

provide(topoAppKey, app);

window.topo?.onRuntimeReady({
  getApp() {
    return app;
  },

  updateRootConfig(config) {
    root.value = config;
    app?.setConfig(config, curPageId.value);
  },

  updatePageId(id) {
    curPageId.value = id;
    app?.setPage(id);
  },

  select(id) {
    selectedId.value = id;
    const el = document.getElementById(`${id}`);
    if (el) return el;
    // 未在当前文档下找到目标元素，可能是还未渲染，等待渲染完成后再尝试获取
    return nextTick().then(() => document.getElementById(`${id}`) as HTMLElement);
  },

  add({ config, parentId }) {
    if (!root.value) throw new Error('error');
    if (!selectedId.value) throw new Error('error');
    if (!parentId) throw new Error('error');

    const parent = getNodePath(parentId, [root.value]).pop();
    if (!parent) throw new Error('未找到父节点');
    if (parent.id !== selectedId.value) {
      // add page
      const index = parent.items?.findIndex((child: MNode) => child.id === selectedId.value);
      parent.items?.splice(index + 1, 0, config);
    } else {
      // add component
      // 新增节点添加到配置中
      parent.items?.push(config);
    }
    if (app.page) {
      app.page.initNode(config, app.page.getNode(parent.id) ?? app.page);
    }
  },

  update({ config, parentId }) {
    if (!root.value) throw new Error('error');
    const node = getNodePath(config.id, [root.value]).pop();

    if (!parentId) throw new Error('error');
    const parent = getNodePath(parentId, [root.value]).pop();

    if (!node) throw new Error('未找到目标节点');
    if (!parent) throw new Error('未找到父节点');
    const index = parent.items?.findIndex((child: MNode) => child.id === node.id);
    parent.items.splice(index, 1, reactive(config));
    if (app.page) {
      app.page.initNode(config, app.page.getNode(parent.id) ?? app.page);
    }
  },

  remove({ id, parentId }) {
    if (!root.value) throw new Error('error');

    const node = getNodePath(id, [root.value]).pop();
    if (!node) throw new Error('未找到目标元素');

    const parent = getNodePath(parentId, [root.value]).pop();
    if (!parent) throw new Error('未找到父元素');

    const index = parent.items?.findIndex((child: MNode) => child.id === node.id);
    parent.items.splice(index, 1);
    if (app.page) {
      app.page.deleteNode(id);
    }
  },
});
</script>
