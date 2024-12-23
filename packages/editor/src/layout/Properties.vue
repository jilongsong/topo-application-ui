<template>
  <div class="w-full h-full flex flex-col">
    <div class="pb-2">
      <div v-if="!selectedElement" class="font-bold">画布属性</div>
      <div v-else>
        <div class="py-1">
          <span>Id: </span><span class="font-bold">{{ selectedElement.id }}</span>
        </div>
        <div class="py-1">
          <span>名称: </span><span class="font-bold">{{ selectedElement.name }}</span>
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-y-scroll">
      <Panel ref="panelRef" :panel-config="panelConfig" @change="handleConfigChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { isLink, isVertex, Link, Project, Vertex } from '@topo/engine';
import { Panel } from '@topo/panel';
import { MLink, MVertex } from '@topo/schema';

import { CommandKey, ContextKey, ServicesKey } from '../constants/inject-keys';
import { canvasConfig, edgeConfig, nodeConfig } from '../constants/propConfig';
import { injectStrict } from '../utils/vue-aide';

const { app, selectedElement } = injectStrict(ContextKey);
const { editorService: editor } = injectStrict(ServicesKey);
const { updateVertex, updateCanvas, updateLink } = injectStrict(CommandKey);

const panelRef = ref<InstanceType<typeof Panel>>();
const panelConfig = ref();

const handleSelectedCanvas = (project: Project) => {
  const values = {
    gridType: project.gridType || 'dot',
    gridColor: project.gridColor,
    gridSize: project.gridSize,
  };
  panelConfig.value = canvasConfig;
  panelRef.value?.resetForm({ values }, { force: true });
};

const handleSelectedVertex = async () => {
  const currentNode = selectedElement.value as Vertex;
  console.log('handleSelectedVertex', currentNode);
  const values = {
    width: currentNode.width,
    height: currentNode.height,
    ports: currentNode.ports.map((port) => {
      return {
        tnodeName: port.tnodeName,
        tnodeCode: port.tnodeCode,
        descr: port.descr,
      };
    }),
  };
  panelConfig.value = nodeConfig;
  panelRef.value?.resetForm({ values }, { force: true });
};

const handleSelectedLink = async () => {
  const currentLink = selectedElement.value as Link;
  const values = {
    isReverse: currentLink.isReverse,
    isRunning: currentLink.isRunning,
  };
  panelConfig.value = edgeConfig;
  panelRef.value?.resetForm({ values }, { force: true });
};

const handleConfigChange = (values: any) => {
  if (!selectedElement.value) {
    updateCanvas({ ...values });
  } else if (selectedElement.value instanceof Vertex) {
    const oldVertex: MVertex = selectedElement.value.toJSON();
    updateVertex({
      oldVertex: oldVertex,
      newVertex: { ...oldVertex, ...values },
    });
  } else if (selectedElement.value instanceof Link) {
    const oldLink: MLink = selectedElement.value.toJSON();
    updateLink({
      oldLink: oldLink,
      newLink: { ...oldLink, ...values },
    });
  }
};

editor.on('vertex:changing', ({ vertex }) => {
  console.log('vertex:changing', vertex);
});

watchEffect(async () => {
  if (!selectedElement.value) {
    handleSelectedCanvas(app.project);
  } else if (isVertex(selectedElement.value)) {
    handleSelectedVertex();
  } else if (isLink(selectedElement.value)) {
    handleSelectedLink();
  }
});
</script>
