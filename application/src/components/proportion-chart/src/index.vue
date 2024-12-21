<template>
  <div class="topo-proportion">
    <div v-for="item in config.options" :key="item.color" :style="getStyle(item)">
      {{ item.description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

import { ComponentProps } from '@topo/core';

import { MProportion, MProportionOption } from './type';

const { config, defineRefState } = defineProps<ComponentProps<MProportion>>();

const dataSource: any = defineRefState('dataSource', config.dataSource ?? {});

const getStyle = (item: MProportionOption) => {
  let sum = 0;
  config.options.forEach((item: MProportionOption) => {
    sum += Number(dataSource.value[item.key]);
  });
  return {
    width:
      config.layout === 'column'
        ? '100%'
        : `${((dataSource.value[item.key] ? dataSource.value[item.key] : 0) * 100) / sum}%`,
    height:
      config.layout === 'row'
        ? '100%'
        : `${((dataSource.value[item.key] ? dataSource.value[item.key] : 0) * 100) / sum}%`,
    backgroundColor: item.color,
    border: `${config.borderWidth}px solid ${item.borderColor}`,
    marginRight: config.layout === 'row' ? `${config.gap}px` : 0,
    marginBottom: config.layout === 'column' ? `${config.gap}px` : 0,
    borderRadius: config.borderRadius,
  };
};
</script>

<style lang="scss" scoped>
.topo-proportion {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: v-bind('config.layout');
  font-size: calc(v-bind('config.fontSize') * 1px);
  color: v-bind('config.color');
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
