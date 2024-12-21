<template>
  <ScrollArea class="w-full text-sm h-full overflow-y-scroll">
    <div class="w-full">
      <div class="flex justify-between mb-2">
        <div>Images</div>
        <div><PlusIcon class="w-4 cursor-pointer" /></div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="h-24 bg-purple-100">
          <img
            class="w-full h-full object-fill cursor-pointer rounded-md hover:scale-105 duration-300"
            src="https://tailwindcss.com/_next/static/media/3.19759950.jpg"
            alt=""
            draggable="true"
            @dragstart="dragstartHandler('https://tailwindcss.com/_next/static/media/3.19759950.jpg', $event)"
          />
        </div>
        <div class="h-24 bg-purple-100">
          <img
            class="w-full h-full object-fill cursor-pointer rounded-md hover:scale-105 duration-300"
            src="https://tailwindcss.com/_next/static/media/4.a2ed7a78.jpg"
            alt=""
            draggable="true"
            @dragstart="dragstartHandler('https://tailwindcss.com/_next/static/media/4.a2ed7a78.jpg', $event)"
          />
        </div>
        <div class="h-24 bg-purple-100">
          <img
            class="w-full h-full object-fill cursor-pointer rounded-md hover:scale-105 duration-300"
            src="https://tailwindcss.com/_next/static/media/2.86c4c41e.jpg"
            alt=""
            draggable="true"
            @dragstart="dragstartHandler('https://tailwindcss.com/_next/static/media/2.86c4c41e.jpg', $event)"
          />
        </div>
      </div>
    </div>
  </ScrollArea>
</template>

<script lang="ts" setup>
import serialize from 'serialize-javascript';

import { styleCompoundNaming } from '@topo/core';
import { PlusIcon } from '@topo/icon';
import { ScrollArea } from '@topo/ui';
const dragstartHandler = (src: string, e: DragEvent) => {
  const data = {
    type: 'img',
    name: '图片',
    componentType: 0,
    saveId: '1762725596449529857',
    property: {
      src,
      imageSource: 'url',
    },
  };
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'data',
      serialize({
        style: {
          [styleCompoundNaming.position]: {
            left: e.offsetX,
            top: e.offsetY,
          },
          width: 200,
          height: 120,
        },
        ...data,
      }).replace(/"(\w+)":\s/g, '$1: ')
    );
    // Create a ghost image
    const ghostElement = e.target as HTMLElement;
    const ghost = ghostElement.cloneNode(true) as HTMLElement;
    ghost.style.width = '200px';
    ghost.style.height = '120px';
    ghost.style.backgroundColor = '#F3EEFF';
    ghost.style.border = '1px dashed #c5b1f5';

    ghost.style.opacity = '0.5';
    ghost.style.position = 'absolute';
    ghost.style.left = '-1000px';
    ghost.style.top = '-1000px';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, e.offsetX, e.offsetY);

    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 0);
  }
};
</script>
