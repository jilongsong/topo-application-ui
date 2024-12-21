<script lang="ts" setup>
import { provide } from 'vue';
import { FieldContextKey, useField } from 'vee-validate';

import { Input } from '@topo/ui';
import { FormControl, FormField, FormItem } from '@topo/ui';
import { Label } from '@topo/ui';

import { FieldProps, FusedNumberFieldConfig } from '../schema';

const props = defineProps<FieldProps<FusedNumberFieldConfig<any>>>();

const fieldContext = useField(props.fieldName);

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);
</script>

<template>
  <div class="py-2">
    <Label v-if="!field.hideLabel && label" :for="fieldName" :required="required">
      {{ label }}
    </Label>
    <section v-if="field.valueKeys" class="grid grid-cols-4 gap-2 pt-1">
      <div v-for="(key, index) in field.valueKeys" :key="key" class="flex flex-col items-center text-center">
        <FormField :name="`${fieldName}.${String(key)}`" v-slot="slotProps">
          <FormItem>
            <FormControl>
              <Input v-bind="slotProps.componentField" as-child />
              <Label class="pt-1">{{ field.valueLabels?.[index] }}</Label>
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </section>
  </div>
</template>
