<script setup lang="ts">
import { ref } from 'vue';

import { TopoEditorInstance } from '@topo/editor';

import { elementGroups } from '../../custom/index';

import NavMenu from './components/NavMenu.vue';

const topoEditor = ref<TopoEditorInstance>();
</script>

<template>
  <div id="#app-dev" class="w-full h-full flex flex-col overflow-hidden">
    <div class="h-12 p-2 border-b"><NavMenu /></div>
    <div class="flex-1 overflow-y-scroll">
      <TopoEditor ref="topoEditor" :element-models="elementGroups" />
    </div>
  </div>
</template>
