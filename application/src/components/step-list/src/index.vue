<template>
  <div :id="`${config.id || ''}`" class="topo-ui-container">
    <div class="list-view-container">
      <div
        v-for="({ config, context }, index) in configItems"
        :key="config.id"
        :class="['topo-ui-list-item', { 'topo-ui-list-container_disabled': index > 0 }]"
      >
        <div class="step">
          <div :class="`step-circle ${value >= index + 1 ? 'step-out_active' : 'step-out_default'}`">
            <div :class="`circle ${value >= index + 1 ? 'step-in_active' : 'step-in_default'}`"></div>
            <div
              :style="{ display: configItems.length === index + 1 ? 'none' : 'block' }"
              :class="`line ${value >= index + 2 ? 'step-line_active' : 'step-line_default'}`"
            ></div>
          </div>
          <div class="step-title">
            {{ context.currentItem.time || index + 1 }}
          </div>
        </div>
        <topo-ui-component :config="config" :context="context"></topo-ui-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { ComponentProps } from '@topo/core';

import { MStepList } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MStepList>>();

const dataSource = defineRefState('dataSource', config.dataSource ?? []);

const value = defineRefState('value', config.value);

const configItems = computed(() => {
  if (!Array.isArray(dataSource.value)) {
    return [];
  } else {
    return dataSource.value?.map((item: any) => ({
      config: config.items[0],
      context: { currentItem: item },
    }));
  }
});

const lineHeight = computed(() => {
  return config.items[0]?.style?.height - 3 + 'px';
});
</script>

<style lang="scss" scoped>
.topo-ui-container {
  .list-view-container {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: calc(v-bind('config.listStyle.padding') * 1px);
    gap: calc(v-bind('config.listStyle.gap') * 1px);

    :deep(.el-divider--horizontal) {
      margin: 0 0;
    }

    .topo-ui-list-item {
      position: relative;
      .step {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 10px;
        left: 10px; /* 修正单位 */

        .step-circle {
          position: relative; /* 添加相对定位，使伪元素能够正确定位 */
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          .circle {
            width: 50%;
            height: 50%;
            border-radius: 50%;
          }

          .line {
            width: 1px;
            height: v-bind('lineHeight'); /* 改为使用CSS变量或动态值 */
            position: absolute;
            top: 21px;
            left: 50%; /* 居中伪元素 */
            transform: translateX(-50%);
          }
        }
      }
    }
  }

  .step-out_active {
    border: 1px solid v-bind('config.circleActiveColor');
  }
  .step-out_default {
    border: 1px solid v-bind('config.circleDefaultColor');
  }
  .step-in_active {
    background-color: v-bind('config.circleActiveColor');
  }
  .step-in_default {
    background-color: v-bind('config.circleDefaultColor');
  }
  .step-line_active {
    background-color: v-bind('config.lineActiveColor');
  }
  .step-line_default {
    background-color: v-bind('config.lineDefaultColor');
  }
}
</style>
