<template>
  <div class="w-full h-full flex items-center text-gray-600">
    <div
      v-for="item in menuGroup"
      :key="item.value"
      :class="`flex items-center px-3 py-1 rounded-md text-sm justify-center gap-2 cursor-pointer ${
        activeTabName === item.value ? 'bg-accent text-black' : ''
      }`"
      @click="item.action"
    >
      <component :is="item.icon" class="w-4" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { AppWindowIcon, SquareTerminalIcon } from '@topo/icon';

import { PageSign } from '../type';
import { ServicesKey } from '../utils/inject-keys';

const enum MenuGroup {
  COMPONENTS = 'components',
  DATABASE = 'dataBase',
  EXECUTOR = 'executor',
}

const { uiService } = injectStrict(ServicesKey);

const activeTabName = ref<MenuGroup | null>(null);

const menuGroup = [
  {
    label: '组件',
    value: MenuGroup.COMPONENTS,
    icon: AppWindowIcon,
    display: () => {},
    action: () => {
      uiService?.set('currentPage', PageSign.COMPONENTS);
      changeSelection(MenuGroup.COMPONENTS);
    },
  },
  {
    label: '执行器',
    value: MenuGroup.EXECUTOR,
    icon: SquareTerminalIcon,
    display: () => {},
    action: () => {
      uiService?.set('currentPage', PageSign.EXECUTOR);
      changeSelection(MenuGroup.EXECUTOR);
    },
  },
];

const changeSelection = (value: MenuGroup) => {
  if (activeTabName.value === value) {
    uiService?.set('currentPage', PageSign.DEFAULT);
    activeTabName.value = null;
  } else {
    activeTabName.value = value;
  }
};
</script>
