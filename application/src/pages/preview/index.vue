<template>
  <topoUiComponent v-if="pageConfig" :config="pageConfig"></topoUiComponent>
  <div v-else>没有配置页面</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';

import Core, { topoAppKey } from '@topo/core';
import { MApp, MPage } from '@topo/schema';
import { getUrlParam } from '@topo/utils';

import variant from '../../../public/style.json';
import theme from '../../../public/theme.json';
import topoUiComponent from '../../components/ComponentPlayground.vue';

const designWidth = document.documentElement.getBoundingClientRect().width;

const app = new Core({
  env: 'production',
  designWidth,
});

const pageConfig = ref<MPage | undefined>();

const dsl = ref<MApp>();

provide(topoAppKey, app);

onMounted(() => {
  dsl.value = JSON.parse(window.parent.localStorage.getItem('dsl') || '');
  window.parent && window.parent.postMessage('runtime-ready', '*');
});

onUnmounted(() => {
  window.removeEventListener('message', setDSL);
});

watch(
  () => dsl.value,
  async (dsl) => {
    if (!app || !dsl) {
      return;
    }
    app.setConfig(dsl, getUrlParam('page') ?? dsl.index);
    pageConfig.value = app.page?.data as MPage;
    app.themeManager.set({ light: theme, dark: theme });
    app.styleManager.registerStyleConfig(variant as any);
    const response = await fetch('/data.json');
    const data = await response.json();
    data.forEach((item: any) => {
      app.executorManger.initExecutor(item);
    });
  }
);

function setDSL({ data }: { data: MApp }) {
  dsl.value = data;
}
</script>
