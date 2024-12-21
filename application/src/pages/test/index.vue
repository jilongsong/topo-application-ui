<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import App from '@topo/core';
import { ScrollArea } from '@topo/ui';

import variant from '../../../public/style.json';

import ThemePanel from './components/ThemePanel.vue';
import { DARK_THEME, LIGHT_THEME } from './theme/defaultTheme';

const app = new App({});

const themeManager = app.themeManager;

const styleManager = app.styleManager;

styleManager.registerStyleConfig(variant as any);

// 按钮样式系统配置
const buttonStyles = styleManager.createStyles('button');

// 输入框样式系统配置
const inputStyles = styleManager.createStyles('input');

const lightTheme = ref(LIGHT_THEME);

const darkTheme = ref(DARK_THEME);

watch(
  () => [lightTheme.value, darkTheme.value],
  () => {
    themeManager.set({ light: lightTheme.value, dark: darkTheme.value });
  },
  { deep: true, immediate: true }
);

// 计算 buttonClassName 根据 variant 动态变化
const buttonClassName = computed(() =>
  buttonStyles({
    variantName: 'soft',
    padding: '8px',
  })
);

const inputClassName = inputStyles({
  variantName: 'filled', // 选择 Filled 输入框变体
});

const handleChange = () => {
  themeManager.toggle();
};
</script>

<template>
  <div>
    <!-- 按钮 -->
    <button :class="buttonClassName">Button</button>

    <!-- 输入框 -->
    <input :class="inputClassName" placeholder="Enter text" />

    <!-- 变化按钮 -->
    <button @click.stop="handleChange">{{ themeManager.currentMode }}</button>
  </div>
  <div class="flex">
    <div class="w-1/2 h-full">
      <div>亮色主题</div>
      <ScrollArea class="h-[900px] p-2">
        <ThemePanel v-model="lightTheme" class="h-full w-full" />
      </ScrollArea>
    </div>
    <div class="w-1/2 h-full">
      <div>暗色主题</div>
      <ScrollArea class="h-[900px] p-2">
        <ThemePanel v-model="darkTheme" class="h-full w-full" />
      </ScrollArea>
    </div>
  </div>
</template>
