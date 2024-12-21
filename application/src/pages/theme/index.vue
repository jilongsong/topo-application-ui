<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import App from '@topo/core';
import { Button, Input, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from '@topo/ui';

import variant from '../../../public/style.json';
import { useTheme } from '../../hooks/useTheme';

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

const selectedTheme = ref('light');

const lightTheme = ref(LIGHT_THEME);

const darkTheme = ref(DARK_THEME);

const { setTheme } = useTheme();

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
    padding: '10px',
  })
);

const inputClassName = inputStyles({
  variantName: 'filled', // 选择 Filled 输入框变体
});

onBeforeUnmount(() => {
  setTheme('light');
});
</script>

<template>
  <div class="w-full h-full">
    <div class="w-96 h-5/6 fixed top-6 right-6 border rounded shadow p-4 overflow-y-scroll">
      <div class="text-xl font-bold">Theme</div>
      <Tabs v-model:model-value="selectedTheme" default-value="light" class="w-full my-2">
        <TabsList class="h-full">
          <TabsTrigger value="light" @click="setTheme('light')"> 亮色主题 </TabsTrigger>
          <TabsTrigger value="dark" @click="setTheme('dark')"> 暗色主题 </TabsTrigger>
        </TabsList>
        <TabsContent value="light" class="h-full"><ThemePanel v-model="lightTheme" /></TabsContent>
        <TabsContent value="dark"><ThemePanel v-model="darkTheme" /> </TabsContent>
      </Tabs>
    </div>
    <ScrollArea :style="{ width: 'calc(100% - 500px)' }" class="h-full px-6 overflow-y-scroll">
      <div v-if="selectedTheme === 'light'" class="px-2">
        <!-- 按钮 -->
        <div class="my-4">
          <div class="my-2">按钮配置：</div>
          <div class="flex gap-4">
            <Button
              :class="buttonClassName"
              :style="{
                background: lightTheme.colors.primary,
              }"
              >primary</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: lightTheme.colors.success,
              }"
              >success</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: lightTheme.colors.info,
              }"
              >info</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: lightTheme.colors.warning,
              }"
              >warning</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: lightTheme.colors.danger,
              }"
              >danger</Button
            >
          </div>
        </div>
        <!-- 输入框 -->
        <div class="my-4">
          <div class="my-2">输入框：</div>
          <Input :class="inputClassName" placeholder="Enter text" />
        </div>
        <!-- 背景色 -->
        <div class="my-4">
          <div class="my-2">背景配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: lightTheme.colors.backgroundPrimary,
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
              }"
            >
              背景主色
            </div>
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: lightTheme.colors.backgroundSecondary,
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
              }"
            >
              背景次色
            </div>
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: lightTheme.colors.backgroundElement,
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
              }"
            >
              背景元素色
            </div>
          </div>
        </div>
        <!-- 文本 -->
        <div class="my-4">
          <div class="my-2">文本配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <div
              class="h-32 text-2xl flex-col flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
              }"
            >
              <div class="text-sm">Aa 字体</div>
              <div class="text-lg">Aa 字体</div>
              <div class="text-xl">Aa 字体</div>
              <div class="text-2xl">Aa 字体</div>
            </div>
            <div
              class="h-32 text-2xl flex-col flex items-center justify-center"
              :style="{
                background: lightTheme.colors.backgroundSecondary,
                color: lightTheme.colors.textInverted,
              }"
            >
              <div class="text-sm">Aa 字体</div>
              <div class="text-lg">Aa 字体</div>
              <div class="text-xl">Aa 字体</div>
              <div class="text-2xl">Aa 字体</div>
            </div>
          </div>
        </div>
        <!-- 边框 -->
        <div class="my-4">
          <div class="my-2">圆角配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <!-- 基础边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
                borderRadius: lightTheme.radius.none,
              }"
            >
              无
            </div>
            <!-- 小圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              sm
            </div>
            <!-- 中圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
                borderRadius: lightTheme.radius.md,
              }"
            >
              md
            </div>
            <!-- 大圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
                borderRadius: lightTheme.radius.lg,
              }"
            >
              lg
            </div>
            <!-- 大圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                border: `1px solid ${lightTheme.colors.backgroundBorder}`,
                borderRadius: lightTheme.radius.full,
              }"
            >
              填满
            </div>
          </div>
        </div>
        <!-- 阴影 -->
        <div class="my-4">
          <div class="my-2">阴影配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <!-- 小阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                boxShadow: lightTheme.shadows.none,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              无
            </div>
            <!-- 小阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                boxShadow: lightTheme.shadows.sm,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              sm
            </div>
            <!-- 中等阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                boxShadow: lightTheme.shadows.md,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              md
            </div>
            <!-- 大阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                boxShadow: lightTheme.shadows.lg,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              lg
            </div>
            <!-- 最大阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: lightTheme.colors.textPrimary,
                boxShadow: lightTheme.shadows.xl,
                borderRadius: lightTheme.radius.sm,
              }"
            >
              xl
            </div>
          </div>
        </div>
      </div>
      <div v-else class="px-2">
        <!-- 按钮 -->
        <div class="my-4">
          <div class="my-2">按钮配置：</div>
          <div class="flex gap-4">
            <Button
              :class="buttonClassName"
              :style="{
                background: darkTheme.colors.primary,
              }"
              >primary</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: darkTheme.colors.success,
              }"
              >success</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: darkTheme.colors.info,
              }"
              >info</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: darkTheme.colors.warning,
              }"
              >warning</Button
            >
            <Button
              :class="buttonClassName"
              :style="{
                background: darkTheme.colors.danger,
              }"
              >danger</Button
            >
          </div>
        </div>
        <!-- 输入框 -->
        <div class="my-4">
          <div class="my-2">输入框：</div>
          <Input :class="inputClassName" placeholder="Enter text" />
        </div>
        <!-- 背景色 -->
        <div class="my-4">
          <div class="my-2">背景配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: darkTheme.colors.backgroundPrimary,
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
              }"
            >
              背景主色
            </div>
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: darkTheme.colors.backgroundSecondary,
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
              }"
            >
              背景次色
            </div>
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                background: darkTheme.colors.backgroundElement,
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
              }"
            >
              背景元素色
            </div>
          </div>
        </div>
        <!-- 文本 -->
        <div class="my-4">
          <div class="my-2">文本配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <div
              class="h-32 text-2xl flex-col flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
              }"
            >
              <div class="text-sm">Aa 字体</div>
              <div class="text-lg">Aa 字体</div>
              <div class="text-xl">Aa 字体</div>
              <div class="text-2xl">Aa 字体</div>
            </div>
            <div
              class="h-32 text-2xl flex-col flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textInverted,
              }"
            >
              <div class="text-sm">Aa 字体</div>
              <div class="text-lg">Aa 字体</div>
              <div class="text-xl">Aa 字体</div>
              <div class="text-2xl">Aa 字体</div>
            </div>
          </div>
        </div>
        <!-- 边框 -->
        <div class="my-4">
          <div class="my-2">圆角配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <!-- 基础边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
                borderRadius: darkTheme.radius.none,
              }"
            >
              无
            </div>
            <!-- 小圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              sm
            </div>
            <!-- 中圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
                borderRadius: darkTheme.radius.md,
              }"
            >
              md
            </div>
            <!-- 大圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
                borderRadius: darkTheme.radius.lg,
              }"
            >
              lg
            </div>
            <!-- 大圆角边框 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                border: `1px solid ${darkTheme.colors.backgroundBorder}`,
                borderRadius: darkTheme.radius.full,
              }"
            >
              填满
            </div>
          </div>
        </div>
        <!-- 阴影 -->
        <div class="my-4">
          <div class="my-2">阴影配置：</div>
          <div class="grid grid-cols-5 gap-4">
            <!-- 小阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                boxShadow: darkTheme.shadows.none,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              无
            </div>
            <!-- 小阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                boxShadow: darkTheme.shadows.sm,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              sm
            </div>
            <!-- 中等阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                boxShadow: darkTheme.shadows.md,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              md
            </div>
            <!-- 大阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                boxShadow: darkTheme.shadows.lg,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              lg
            </div>
            <!-- 大阴影 -->
            <div
              class="h-32 flex items-center justify-center"
              :style="{
                color: darkTheme.colors.textPrimary,
                boxShadow: darkTheme.shadows.xl,
                borderRadius: darkTheme.radius.sm,
              }"
            >
              xl
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
