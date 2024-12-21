<script setup lang="ts">
import { computed } from 'vue';

import { INPUT_COMPONENTS } from '../config';
import useDependency from '../hooks/useDependency';
import { FieldConfig } from '../schema';

const { field, fieldName } = defineProps<{
  fieldName: string;
  field: FieldConfig;
}>();

function isValidConfig(config: any): config is FieldConfig {
  return !!config?.component;
}

const tagName = computed(() => {
  const component = isValidConfig(field) ? field.component : (field as FieldConfig).type;
  return typeof component === 'string' ? INPUT_COMPONENTS[component!] : component;
});

const fieldLabel = useDependency(fieldName, 'label', field.label);

const hidden = useDependency(fieldName, 'hidden', field.hidden);

const disabled = useDependency(fieldName, 'disabled', field.disabled);

const required = useDependency(fieldName, 'required', field.required);

const validation = useDependency(fieldName, 'validation', field.validation);
</script>

<template>
  <component
    v-if="!hidden"
    :is="tagName"
    :field-name="fieldName"
    :field="field"
    :label="fieldLabel"
    :required="required"
    :disabled="disabled"
    :validation="validation"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
