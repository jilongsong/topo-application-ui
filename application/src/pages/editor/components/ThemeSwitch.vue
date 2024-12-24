<script setup lang="ts">
import { useTheme } from '../../../hooks/useTheme';

const { theme, setTheme } = useTheme();
</script>

<template>
  <div class="cursor-pointer" @click="setTheme(theme === 'light' ? 'dark' : 'light')">{{ theme }}</div>
</template>
