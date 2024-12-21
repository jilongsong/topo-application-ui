<script setup lang="ts">
import { ref } from 'vue';

// import { MProject } from '@topo/schema';
import { TopoEditorInstance } from '@topo/editor';

import { elementGroups } from '../../custom/index';

const topoEditor = ref<TopoEditorInstance>();

// const projectData = ref<MProject>();

// const addVertex = (vertex: any) => {};

// const removeVertex = (vertex: any) => {};

// const save = () => {};
</script>

<template>
  <div id="#app-dev" class="w-full h-full flex flex-col">
    <div class="h-12 p-2 border-b"></div>
    <div class="flex-1">
      <TopoEditor ref="topoEditor" :element-models="elementGroups" />
    </div>
  </div>
</template>
