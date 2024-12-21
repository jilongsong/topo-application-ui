<script lang="ts" setup>
import { FieldProps, FontFieldConfig } from '../schema';

import PanelLayout from './PanelLayout.vue';

const props = defineProps<FieldProps<FontFieldConfig>>();
</script>

<template>
  <PanelLayout v-bind="props">
    <!-- 实现font等配置 -->
  </PanelLayout>
</template>
