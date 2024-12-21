import { ref } from 'vue';

import { selectFile } from '@topo/utils';

import { MessageError } from '../constants/error';

import { useI18n } from './useI18n';

export class SelectFileError extends MessageError {
  constructor(accepts: string[], cause?: any) {
    const { t } = useI18n();
    super({
      type: cause.type === 'CancelSelect' ? 'warning' : 'error',
      message:
        cause.type === 'WrongFormat'
          ? t(`请选择accepts文件`, { accepts })
          : cause.type === 'CancelSelect'
          ? t('取消文件选择')
          : t('文件选择异常'),
      cause,
    });
  }
}

export const useSelectFile = () => {
  const loading = ref<boolean>(false);

  const error = ref<SelectFileError>();

  const execute = async (accepts: string[], multiple?: boolean): Promise<File[]> => {
    try {
      loading.value = true;
      return await selectFile(accepts, multiple);
    } catch (e: any) {
      error.value = new SelectFileError(accepts, e);
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  return {
    execute,
    loading,
    error,
  };
};

export default useSelectFile;
