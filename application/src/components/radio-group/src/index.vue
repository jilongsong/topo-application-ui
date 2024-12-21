<template>
  <div class="topo-radio">
    <div v-if="config.showLabel" class="label">
      <span>{{ config.label }}</span>
    </div>
    <div class="wrap-tab">
      <template v-if="config.layout === 'divide'">
        <div v-for="(item, index) in config.options" :key="index" class="divide-tabs">
          <div :class="['tab', { active: value === item.value }]" @click="onSelectedChange(item.value)">
            {{ item.label }}
          </div>
          <div
            class="divide"
            :style="`background: ${index !== config.options.length - 1 ? config.selectedBackColor : 'transparent'}`"
          ></div>
        </div>
      </template>
      <template v-else-if="config.layout === 'default'">
        <div
          v-for="(item, index) in config.options"
          :key="index"
          :class="['default-tab', { active: value === item.value }]"
          @click="onSelectedChange(item.value)"
        >
          {{ item.label }}
        </div>
      </template>
      <template v-else-if="config.layout === 'radioGroup'">
        <el-radio-group
          v-model="value"
          :text-color="config.selectedColor"
          :fill="config.selectedBackColor"
          @change="changeRadio"
        >
          <el-radio v-for="item in config.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="config.layout === 'borderGroup'">
        <div
          v-for="(item, index) in config.options"
          :key="index"
          :class="['border-tab', { active: value === item.value }]"
          @click="onSelectedChange(item.value)"
        >
          <div class="border-label">{{ item.label }}</div>
          <div class="wrap-circle">
            <div :class="['circle', { active: value === item.value }]">
              <div v-if="value === item.value" class="inner-circle"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ElRadio, ElRadioGroup } from 'element-plus';

import { ComponentProps } from '@topo/core';

import 'element-plus/es/components/input/style/css';

import { MRadioGroup } from './type';

const { config, defineRefState, emit } = defineProps<ComponentProps<MRadioGroup>>();

const tabWidth = computed<string>(() => `${config.tabWidth}%`);
const divideHeight = computed<string>(() => `${config.divideHeight}%`);
const value = defineRefState<string | number>('value', config.value);

const changeRadio = () => {
  emit('radiogroup:change', { value: value.value });
};

const onSelectedChange = (activeValue: any) => {
  if (value.value === activeValue) return;
  value.value = activeValue;
  emit('radiogroup:change', { value: activeValue });
};
</script>

<style lang="scss" scoped>
.topo-radio {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: calc(v-bind('config.fontSize') * 1px);
  .label {
    width: calc(v-bind('config.labelWidth') * 1px);
    height: 100%;
    text-align: v-bind('config.labelAlignment');
    display: flex;
    align-items: center;
    font-size: calc(v-bind('config.labelFontSize') * 1px);
    color: v-bind('config.labelFontColor');
    span {
      width: 98%;
      font-family: MicrosoftYaHei, MicrosoftYaHei;
      font-weight: normal;
    }
  }
  .wrap-tab {
    flex: 1;
    height: 100%;
    // border-radius: 4px;
    // border: v-bind(border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    :deep(.el-radio-group) {
      flex: 1;
    }
    :deep(.el-radio) {
      flex: 1;
    }
    :deep(.el-radio__label) {
      font-size: calc(v-bind('config.fontSize') * 1px);
    }

    .default-tab {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: MicrosoftYaHei, MicrosoftYaHei;
      font-weight: normal;
      color: v-bind('config.color');
      background: v-bind('config.backColor');
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid v-bind('config.defaultBorderColor');
      }
      &.active {
        color: v-bind('config.selectedColor');
        background: v-bind('config.selectedBackColor');
      }
    }
    .divide-tabs {
      width: 100%;
      height: 100%;
      flex: 1;

      display: flex;
      align-items: center;
      justify-content: space-around;
      .tab {
        width: v-bind(tabWidth);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei, MicrosoftYaHei;
        font-weight: normal;
        color: v-bind('config.color');
        background: v-bind('config.backColor');
        cursor: pointer;

        &.active {
          color: v-bind('config.selectedColor');
          background: v-bind('config.selectedBackColor');
          border: 1px solid v-bind('config.activeBorderColor');
        }
      }
      .divide {
        width: 1px;
        height: v-bind(divideHeight);
        background-color: #268aff;
      }
    }
    .border-tab {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-weight: normal;
      color: v-bind('config.color');
      background: v-bind('config.backColor');
      cursor: pointer;
      padding-left: 15px;
      padding-right: 15px;
      &:not(:last-child) {
        margin-right: 20px;
      }
      &.active {
        color: v-bind('config.selectedColor');
        background: v-bind('config.selectedBackColor');
      }
      .border-label {
        width: 85%;
      }
      .wrap-circle {
        box-sizing: border-box;
        width: calc(v-bind('config.fontSize') * 1px);
        height: calc(v-bind('config.fontSize') * 1px);
        // background: #fff;
        // border: 1px solid rgba($color: #000000, $alpha: 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        // border-radius: 50%;
        .circle {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          background: #fff;
          border: 1px solid rgba($color: #000000, $alpha: 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          .inner-circle {
            box-sizing: border-box;
            border-radius: 50%;
            width: calc(v-bind('config.fontSize') * 0.6px);
            height: calc(v-bind('config.fontSize') * 0.6px);
            min-width: calc(v-bind('config.fontSize') * 0.6px);
            min-height: calc(v-bind('config.fontSize') * 0.6px);
            background: rgba(38, 138, 255, 1);
          }
          &.active {
            border: 1px solid rgba(38, 138, 255, 1);
          }
        }
      }
    }
  }
}
</style>
