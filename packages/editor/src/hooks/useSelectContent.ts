import { ref, watch } from 'vue';

import { SelectFileError, useSelectFile } from './useSelectFile';

export const useSelectContent = () => {
  const loading = ref<boolean>(false);

  const error = ref<SelectFileError | any>();

  const { error: selectError, execute: selectExecute } = useSelectFile();

  watch(
    () => selectError,
    (e) => {
      error.value = e;
    }
  );

  const execute = async (accepts: string[]): Promise<string | undefined> => {
    try {
      loading.value = true;
      const files = (await selectExecute(accepts)) ?? [];
      if (!Array.isArray(files)) {
        loading.value = false;
        throw selectError.value;
      }
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.addEventListener('load', ({ target }) => {
          resolve(target?.result as string);
        });
        fileReader.addEventListener('error', (e) => {
          error.value = e;
          reject(error.value);
        });
        fileReader.readAsText(files[0]);
      });
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    execute,
  };
};

export default useSelectContent;
