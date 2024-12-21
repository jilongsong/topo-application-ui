<script lang="ts" setup>
import { computed, ref } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../alert-dialog';
import { Input } from '../input';

const props = defineProps<{
  visible: boolean;
  title: string;
  description?: string;
  inputValue?: string;
  onConfirm?: (value?: any) => void;
  onCancel?: () => void;
}>();

const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void;
  (event: 'close'): void;
}>();

const dialogVisible = computed<boolean>({
  get: () => props.visible,
  set: (visible: boolean) => {
    emit('update:visible', visible);
    if (!visible) {
      emit('close');
    }
  },
});

const value = ref(props.inputValue);
</script>

<template>
  <div>
    <AlertDialog v-model:open="dialogVisible">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> {{ title }} </AlertDialogTitle>
          <AlertDialogDescription v-if="description"> {{ description }} </AlertDialogDescription>
        </AlertDialogHeader>
        <Input v-model="value" />
        <AlertDialogFooter class="sm:justify-start">
          <AlertDialogCancel @click="onCancel"> 取消 </AlertDialogCancel>
          <AlertDialogAction @click="onConfirm && onConfirm(value)"> 确认 </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
