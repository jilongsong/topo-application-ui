import { computed, Ref, ref, watch } from 'vue';
import { useFieldValue, useFormValues } from 'vee-validate';

import { Dependency, Dynamic } from '../schema';
import { getFromPath, getIndexIfArray } from '../utils';

const isDependency = (dep: any): dep is Dependency<any> => {
  return typeof dep === 'object' && 'source' in dep && 'effect' in dep;
};

export default function useDependency<T>(
  fieldName: string,
  property: string,
  dynamic?: Dynamic<T>
): Ref<T | undefined> {
  const value = ref<T>();
  if (!isDependency(dynamic)) {
    value.value = dynamic;
    return value;
  }
  const form = useFormValues();
  const currentFieldValue = useFieldValue<any>(fieldName);
  const index = getIndexIfArray(fieldName) ?? -1;

  function getSourceValue(source: string) {
    const resolvedSource = source.replace('[i]', index >= 0 ? `[${index}]` : '');
    const [sourceLast, ...sourceInitial] = resolvedSource.split('.').toReversed();
    const [_targetLast, ...targetInitial] = property.split('.').toReversed();

    if (index >= 0 && sourceInitial.join(',') === targetInitial.join(',')) {
      const [_currentLast, ...currentInitial] = fieldName.split('.').toReversed();
      return getFromPath(form.value, currentInitial.join('.') + sourceLast);
    }

    return getFromPath(form.value, resolvedSource);
  }

  const sourceFieldValues = computed(() => dynamic.source.map((dep) => getSourceValue(dep)));

  watch(
    sourceFieldValues,
    async (sourceFieldValues) => {
      value.value = await dynamic.effect(sourceFieldValues, currentFieldValue.value, fieldName);
    },
    { immediate: true, deep: true }
  );
  return value;
}
