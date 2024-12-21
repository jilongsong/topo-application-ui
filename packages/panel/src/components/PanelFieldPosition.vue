<script lang="ts" setup>
import { provide } from 'vue';
import { FieldContextKey, useField } from 'vee-validate';

import { FormControl, FormField, FormItem, Label, NumberField, NumberFieldContent, NumberFieldInput } from '@topo/ui';

import { FieldProps, PositionFieldConfig } from '../schema';

const props = defineProps<FieldProps<PositionFieldConfig<any>>>();

const fieldContext = useField(props.fieldName);

// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);
</script>

<template>
  <div class="py-2">
    <Label v-if="!field.hideLabel && label" :for="fieldName" :required="required">
      {{ label }}
    </Label>
    <section class="w-full flex justify-center gap-2 items-center relative" style="aspect-ratio: 4/3">
      <div class="w-3/4 h-3/4 bg-accent rounded-sm flex justify-center items-center relative">
        <div class="w-10 h-10 bg-background rounded-sm shadow-xl absolute">
          <div class="w-3.5 h-0.5 bg-blue-300 absolute -left-4 top-1/2">
            <div class="absolute -top-3 -left-3.5">L</div>
          </div>
          <div class="w-3.5 h-0.5 bg-blue-300 absolute -right-4 top-1/2">
            <div class="absolute -top-3 -right-3.5">R</div>
          </div>
          <div class="w-0.5 h-3.5 bg-blue-300 absolute -top-4 left-1/2">
            <div class="absolute -top-5 -left-1">T</div>
          </div>
          <div class="w-0.5 h-3.5 bg-blue-300 absolute -bottom-4 left-1/2">
            <div class="absolute -bottom-5 -left-1">B</div>
          </div>
        </div>
        <div class="w-16 absolute -top-4">
          <FormField v-slot="slotProps" :name="`${fieldName}.${String(field.valueKeys[0])}`">
            <FormItem>
              <FormControl>
                <NumberField v-bind="slotProps.componentField">
                  <NumberFieldContent>
                    <NumberFieldInput class="h-8" />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="w-16 absolute -right-8">
          <FormField v-slot="slotProps" :name="`${fieldName}.${String(field.valueKeys[1])}`">
            <FormItem>
              <FormControl>
                <NumberField v-bind="slotProps.componentField">
                  <NumberFieldContent>
                    <NumberFieldInput class="h-8" />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="w-16 absolute -bottom-4">
          <FormField v-slot="slotProps" :name="`${fieldName}.${String(field.valueKeys[2])}`">
            <FormItem>
              <FormControl>
                <NumberField v-bind="slotProps.componentField">
                  <NumberFieldContent>
                    <NumberFieldInput class="h-8" />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="w-16 absolute -left-8">
          <FormField v-slot="slotProps" :name="`${fieldName}.${String(field.valueKeys[3])}`">
            <FormItem>
              <FormControl>
                <NumberField v-bind="slotProps.componentField">
                  <NumberFieldContent>
                    <NumberFieldInput class="h-8" />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>
    </section>
  </div>
</template>
