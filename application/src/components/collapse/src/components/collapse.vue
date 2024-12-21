<template>
  <div class="collapse-panel">
    <div class="header" @click="toggle">
      <topo-ui-component :config="config" :context="context" @click="toggle"></topo-ui-component>
    </div>
    <transition name="collapse">
      <div v-show="isOpen" class="content">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  index: number;
  config: Record<string, any>;
  context: Record<string, any>;
}>();

const isOpen = ref(!props.index);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
}

.collapse-enter,
.collapse-leave-to {
  height: 0;
  opacity: 0;
  padding: 0;
}
</style>
