import { ref } from 'vue';

export const i18nInstance = ref<any>(null);

export const useI18n = () => {
  return {
    t: i18nInstance.value?.global.t ?? ((str: string) => str),
  };
};

export default useI18n;
