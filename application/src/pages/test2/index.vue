<script lang="ts" setup>
import { button, themeClass } from './test.css';
</script>

<template>
  <div :class="themeClass">
    <!-- 按钮 -->
    <button :class="button">Button</button>
  </div>
</template>
