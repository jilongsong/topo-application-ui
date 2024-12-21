<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { FieldContextKey, useField } from 'vee-validate';

import { XIcon } from '@topo/icon';
import {
  Button,
  Label,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@topo/ui';

import useDependency from '../hooks/useDependency';
import { ContainerLayoutConfig, ObjectFieldConfig } from '../schema';

import PanelField from './PanelField.vue';

const props = defineProps<{
  fieldName: string;
  field: ObjectFieldConfig;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  handleReset?: () => void;
}>();

const open = ref<boolean>(false);

const fieldContext = useField(props.fieldName);

const trigger = useDependency(props.fieldName, 'trigger', props.field.trigger);

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);

function getLayoutStyles(layout?: ContainerLayoutConfig) {
  if (!layout) return {};

  const styles: Record<string, any> = {
    display: layout.type === 'flex' ? 'flex' : layout.type === 'grid' ? 'grid' : 'flex',
  };

  if (layout.type === 'grid') {
    if (layout.grid?.columns) {
      styles.gridTemplateColumns = `repeat(${layout.grid.columns}, 1fr)`;
    }
    if (layout.grid?.gap) {
      styles.gap = typeof layout.grid.gap === 'number' ? `${layout.grid.gap}px` : layout.grid.gap;
    }
    if (layout.grid?.rowGap) {
      styles.rowGap = typeof layout.grid.rowGap === 'number' ? `${layout.grid.rowGap}px` : layout.grid.rowGap;
    }
    if (layout.grid?.columnGap) {
      styles.columnGap =
        typeof layout.grid.columnGap === 'number' ? `${layout.grid.columnGap}px` : layout.grid.columnGap;
    }
    if (layout.grid?.autoFlow) {
      styles.gridAutoFlow = layout.grid.autoFlow;
    }
  } else if (layout.type === 'flex') {
    if (layout.flex?.direction) {
      styles.flexDirection = layout.flex.direction;
    }
    if (layout.flex?.wrap) {
      styles.flexWrap = 'wrap';
    }
    if (layout.flex?.gap) {
      styles.gap = typeof layout.flex.gap === 'number' ? `${layout.flex.gap}px` : layout.flex.gap;
    }
    if (layout.flex?.alignItems) {
      styles.alignItems = layout.flex.alignItems;
    }
    if (layout.flex?.justifyContent) {
      styles.justifyContent = layout.flex.justifyContent;
    }
  } else if (layout.type === 'flow') {
    styles.display = 'flex';
    styles.flexWrap = 'wrap';
    if (layout.flow?.gap) {
      styles.gap = typeof layout.flow.gap === 'number' ? `${layout.flow.gap}px` : layout.flow.gap;
    }
    if (layout.flow?.minWidth) {
      styles.minWidth = typeof layout.flow.minWidth === 'number' ? `${layout.flow.minWidth}px` : layout.flow.minWidth;
    }
  }

  return styles;
}

function getFieldGridStyles(field: any, layout?: ContainerLayoutConfig) {
  if (!field.grid || layout?.type !== 'grid') return {};

  const styles: Record<string, any> = {};

  // 处理基本的跨行跨列
  if (field.grid.columnSpan) {
    styles.gridColumn = `span ${field.grid.columnSpan}`;
  }
  if (field.grid.rowSpan) {
    styles.gridRow = `span ${field.grid.rowSpan}`;
  }

  // 处理精确的开始和结束位置
  if (field.grid.columnStart) {
    styles.gridColumnStart = field.grid.columnStart;
  }
  if (field.grid.columnEnd) {
    styles.gridColumnEnd = field.grid.columnEnd;
  }
  if (field.grid.rowStart) {
    styles.gridRowStart = field.grid.rowStart;
  }
  if (field.grid.rowEnd) {
    styles.gridRowEnd = field.grid.rowEnd;
  }

  // 处理区域配置
  if (field.grid.area && layout?.grid?.areas?.[field.grid.area]) {
    const [colStart, colEnd, rowStart, rowEnd] = layout.grid.areas[field.grid.area];
    styles.gridColumnStart = colStart;
    styles.gridColumnEnd = colEnd;
    styles.gridRowStart = rowStart;
    styles.gridRowEnd = rowEnd;
  }

  return styles;
}

const popoverWidth = computed(() => {
  if (!props.field.layout) return undefined;

  if (props.field.layout.type === 'grid' && props.field.layout.grid?.columns) {
    // 根据列数计算宽度，每列至少需要 280px，再加上 padding
    const minWidth = props.field.layout.grid.columns * 280 + 32;
    return `min-w-[${minWidth}px]`;
  }

  if (props.field.layout.type === 'flow' && props.field.layout.flow?.minWidth) {
    const columns = Math.floor(
      600 /
        (typeof props.field.layout.flow.minWidth === 'number'
          ? props.field.layout.flow.minWidth
          : parseInt(props.field.layout.flow.minWidth))
    );
    const minWidth =
      columns *
        (typeof props.field.layout.flow.minWidth === 'number'
          ? props.field.layout.flow.minWidth
          : parseInt(props.field.layout.flow.minWidth)) +
      32;
    return `min-w-[${minWidth}px]`;
  }

  return undefined;
});
</script>

<template>
  <div>
    <slot v-bind="props">
      <Popover v-if="field.display === 'popup'" :open="open">
        <div class="flex flex-col px-2">
          <Label v-if="!field.hideLabel && label" class="mb-2" :for="fieldName" :required="required">
            {{ label }}
          </Label>
          <PopoverTrigger
            class="w-full min-h-8 text-xs rounded-sm grid grid-cols-[1fr,auto] gap-2 p-2 border-[1px]"
            @click="open = true"
          >
            <div v-if="trigger" class="w-full h-full p-2 justify-items-start space-y-2">
              <div class="flex" :title="trigger.title">{{ trigger.title }}</div>

              <div v-if="trigger.description" class="flex" :title="trigger.description">
                {{ trigger.description }}
              </div>
            </div>
            <div v-else class="w-full h-full px-2 flex justify-start items-center">点击设置</div>
            <Button
              class="w-8 h-8"
              variant="ghost"
              @click.stop="() => (handleReset ? handleReset() : fieldContext.resetField())"
            >
              <XIcon />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverAnchor />
        <PopoverContent side="left" :side-offset="24" :class="[popoverWidth, 'max-w-[90vw]']">
          <div class="flex justify-between p-2">
            <Label class="text-sm font-bold" :for="fieldName" :required="required">
              {{ label }}
            </Label>
            <PopoverClose aria-label="Close" @click="open = false">
              <XIcon :size="16" />
            </PopoverClose>
          </div>
          <ScrollArea class="h-[500px]">
            <div class="p-4 w-full" :style="getLayoutStyles(field.layout)">
              <template v-for="(item, key) in field.fields" :key="key">
                <PanelField
                  class="min-w-0"
                  :style="getFieldGridStyles(item, field.layout)"
                  :field-name="`${fieldName}.${key.toString()}`"
                  :field="item"
                />
              </template>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div v-else>
        <Label v-if="!field.hideLabel && label" class="mb-2" :for="fieldName" :required="required">
          {{ label }}
        </Label>
        <div class="p-2 w-full" :style="getLayoutStyles(field.layout)">
          <template v-for="(item, key) in field.fields" :key="key">
            <PanelField
              class="min-w-0"
              :style="getFieldGridStyles(item, field.layout)"
              :field-name="`${fieldName}.${key.toString()}`"
              :field="item"
            />
          </template>
        </div>
      </div>
    </slot>
  </div>
</template>
