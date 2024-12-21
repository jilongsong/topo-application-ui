<script setup lang="ts">
import { RouterView } from 'vue-router';

import { Toaster } from '@topo/ui';
</script>

<template>
  <RouterView />
  <Toaster />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
