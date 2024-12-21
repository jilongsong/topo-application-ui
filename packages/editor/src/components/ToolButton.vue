<template>
  <div
    v-if="display"
    @click="clickHandler(data, $event)"
    @mousedown="mousedownHandler(data, $event)"
    @mouseup="mouseupHandler(data, $event)"
  >
    <div v-if="data.type === 'divider'" class="w-full h-[1px] bg-accent"></div>
    <div v-if="data.type === 'text'" class="flex text-xs items-center">{{ data.text }}</div>

    <template v-else-if="data.type === 'button'">
      <TooltipProvider v-if="data.tooltip" :delay-duration="400">
        <Tooltip>
          <TooltipTrigger class="w-6 h-6 p-1 rounded-md cursor-pointer" :class="{ 'hover:bg-accent': !disabled }">
            <MIcon
              v-if="data.icon"
              :icon="data.icon"
              :class="{ 'cursor-not-allowed opacity-50': disabled }"
              :disabled="disabled"
            ></MIcon>
            <span>{{ data.text }}</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ data.tooltip }}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        v-else
        class="flex items-center cursor-pointer"
        :class="{ 'cursor-not-allowed opacity-50': disabled }"
        :disabled="disabled"
      >
        <div class="w-4 h-4"><MIcon v-if="data.icon" :icon="data.icon"></MIcon></div>
        <span class="ml-2">{{ data.text }}</span>
      </div>
    </template>
    <DropdownMenu v-else-if="data.type === 'dropdown'">
      <DropdownMenuTrigger>
        <span>{{ data.text }}</span>
        <ArrowDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent v-if="data.items && data.items.length">
        <DropdownMenuItem v-for="(subItem, index) in data.items" :key="index" @click="dropdownHandler(subItem)">{{
          subItem.text
        }}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <component
      v-else-if="data.type === 'component'"
      v-bind="data.props || {}"
      :is="data.component"
      class="w-4 h-4"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { ArrowDownIcon } from '@topo/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@topo/ui';

import MIcon from '../components/Icon.vue';
import type { MenuButton, MenuComponent } from '../type';
import { ServicesKey } from '../utils/inject-keys';

const props = withDefaults(
  defineProps<{
    data?: MenuButton | MenuComponent;
    eventType?: 'mousedown' | 'mouseup' | 'click';
  }>(),
  {
    data: () => ({
      type: 'text',
      display: false,
    }),
    eventType: 'click',
  }
);
const services = injectStrict(ServicesKey);

const disabled = computed(() => {
  if (typeof props.data === 'string') return false;
  if (props.data.type === 'component') return false;
  if (typeof props.data.disabled === 'function') {
    return props.data.disabled(services);
  }
  return props.data.disabled;
});

const display = computed(() => {
  if (!props.data) return false;
  if (typeof props.data === 'string') return true;
  if (typeof props.data.display === 'function') {
    return props.data.display(services);
  }
  return props.data.display ?? true;
});

const buttonHandler = (item: MenuButton | MenuComponent, event: MouseEvent) => {
  if (disabled.value) return;
  if (typeof (item as MenuButton).handler === 'function' && services) {
    (item as MenuButton).handler?.(services, event);
  }
};

const dropdownHandler = (command: any) => {
  if (command.item.handler) {
    command.item.handler(services);
  }
};

const clickHandler = (item: MenuButton | MenuComponent, event: MouseEvent) => {
  if (props.eventType !== 'click') return;
  if (item.type === 'button') {
    buttonHandler(item, event);
  }
};

const mousedownHandler = (item: MenuButton | MenuComponent, event: MouseEvent) => {
  if (props.eventType !== 'mousedown') return;
  if (item.type === 'button') {
    buttonHandler(item, event);
  }
};

const mouseupHandler = (item: MenuButton | MenuComponent, event: MouseEvent) => {
  if (props.eventType !== 'mouseup') return;
  if (item.type === 'button') {
    buttonHandler(item, event);
  }
};
</script>
