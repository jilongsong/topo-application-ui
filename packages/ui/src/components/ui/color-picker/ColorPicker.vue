<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { CheckIcon } from 'lucide-vue-next';

import 'vanilla-colorful/hex-alpha-color-picker.js';

import { Button } from '../button';
import { Input } from '../input';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    modelValue?: string;
    recommends?: string[];
  }>(),
  {
    defaultValue: () => '#ffffff',
    recommends: () => [
      '#FF5733', // 鲜艳橙色
      '#FFBD33', // 明亮黄橙色
      '#33FF57', // 生机绿
      '#33FFBD', // 青绿色
      '#3385FF', // 亮蓝色
      '#8A33FF', // 紫罗兰色
      '#FF33A8', // 樱花粉
      '#FF3333', // 热情红
      '#33FFF2', // 浅蓝绿
      '#FF8633', // 暖橙色
      '#3333FF', // 深蓝色
      '#8B4513', // 棕褐色
    ],
  }
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

function updateColor(event: MouseEvent) {
  modelValue.value = (event.target as any)?.color;
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-full flex rounded-md h-8 p-1">
        <span class="h-5 w-5 rounded ring-1 ring-inset ring-black/10" :style="{ backgroundColor: modelValue }" />
        {{ modelValue }}
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="grid gap-4">
        <hex-alpha-color-picker
          class="w-full"
          :color="modelValue"
          @mouseup="updateColor"
          @mouseout="updateColor"
        ></hex-alpha-color-picker>
        <div class="flex flex-row items-center gap-2">
          <Input id="custom-color" v-model="modelValue" class="h-8" placeholder="#000000" />
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="item in recommends"
            :key="item"
            variant="outline"
            :style="{ backgroundColor: item }"
            class="h-6 w-6 rounded-md p-0"
            @click="modelValue = item"
          >
            <CheckIcon v-if="item === modelValue" />
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style>
.hex-color-picker {
  height: 160px;
}

.hex-color-picker::part(saturation) {
  bottom: 2px;
  border-radius: 3px 3px 0 0;
}

.hex-color-picker::part(hue) {
  height: 18px;
  border-radius: 3px;
  flex: none;
  margin-bottom: 2px;
}

.hex-color-picker::part(alpha) {
  height: 18px;
  border-radius: 3px;
  flex: none;
}

.hex-color-picker::part(saturation-pointer) {
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

.hex-color-picker::part(hue-pointer) {
  border-radius: 50%;
  width: 18px;
  height: inherit;
}

.hex-color-picker::part(alpha-pointer) {
  border-radius: 50%;
  width: 18px;
  height: inherit;
}
</style>
