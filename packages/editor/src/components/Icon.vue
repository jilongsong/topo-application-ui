<template>
  <img v-if="typeof icon === 'string' && icon.startsWith('http')" class="w-full h-full" :src="icon" alt="icon" />
  <SvgIcon
    v-else-if="typeof icon === 'string'"
    class="w-full h-full"
    :symbol-id="icon"
    color="#909090"
    active-color="#ffffff"
    size="40px"
  ></SvgIcon>
  <component v-else :is="toRaw(icon)" class="w-full h-full"></component>
</template>

<script lang="ts" setup>
import { toRaw } from 'vue';

import SvgIcon from './SvgIcon.vue';

defineProps<{
  icon?: any;
}>();
</script>
