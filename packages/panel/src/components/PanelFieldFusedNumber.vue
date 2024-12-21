<script lang="ts" setup>
import { computed, provide } from 'vue';
import { FieldContextKey, useField } from 'vee-validate';

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@topo/ui';
import { FormControl, FormField, FormItem, Tabs, TabsList, TabsTrigger } from '@topo/ui';
import { Label } from '@topo/ui';

import { FieldProps, FusedNumberFieldConfig } from '../schema';

const props = defineProps<FieldProps<FusedNumberFieldConfig<any>>>();

const fieldContext = useField(props.fieldName);

const toggle = computed(() => (fieldContext.value.value as any)?.[String(props.field.toggleKey)]);

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);
</script>

<template>
  <div class="py-2">
    <Label v-if="!field.hideLabel && label" :for="fieldName" :required="required">
      {{ label }}
    </Label>
    <section class="flex justify-between gap-2 items-center mt-2">
      <FormField :name="`${fieldName}.value`" v-slot="slotProps">
        <FormItem>
          <FormControl>
            <NumberField v-bind="slotProps.componentField" as-child class="flex-1 flex justify-center">
              <NumberFieldContent>
                <NumberFieldIncrement />
                <NumberFieldInput class="h-8" />
                <NumberFieldDecrement />
              </NumberFieldContent>
            </NumberField>
          </FormControl>
        </FormItem>
      </FormField>
      <FormField :name="`${fieldName}.${String(props.field.toggleKey)}`" v-slot="slotProps">
        <FormItem>
          <FormControl>
            <Tabs
              :model-value="+slotProps.componentField.modelValue"
              as-child
              class="w-14 h-8 px-0 py-0.5"
              @update:model-value="(value: number | string) => {
                slotProps.componentField['onUpdate:modelValue']?.(!!value);
              }
                "
            >
              <TabsList>
                <TabsTrigger
                  class="h-6 w-6 p-1 flex justify-center items-center"
                  :value="0"
                  :title="field.toggleTitles?.[0]"
                >
                  <component v-if="field.toggleTitleIcons" :is="field.toggleTitleIcons[0]" :size="14" />
                  <span v-else>{{ field.toggleTitles?.[0] }}</span>
                </TabsTrigger>
                <TabsTrigger
                  class="h-6 w-6 p-1 justify-center items-center"
                  :value="1"
                  :title="field.toggleTitles?.[1]"
                >
                  <component v-if="field.toggleTitleIcons" :is="field.toggleTitleIcons[1]" :size="14" />
                  <span v-else>{{ field.toggleTitles?.[1] }}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </FormControl>
        </FormItem>
      </FormField>
    </section>
    <section v-if="toggle && field.valueKeys" class="grid grid-cols-4 gap-1 pt-1">
      <div v-for="(key, index) in field.valueKeys" :key="key" class="flex flex-col items-center">
        <FormField :name="`${fieldName}.${String(key)}`" v-slot="slotProps">
          <FormItem>
            <FormControl>
              <NumberField v-bind="slotProps.componentField">
                <NumberFieldContent>
                  <NumberFieldInput class="h-8" />
                </NumberFieldContent>
              </NumberField>
              <Label class="pt-1">{{ field.valueLabels?.[index] }}</Label>
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </section>
  </div>
</template>
