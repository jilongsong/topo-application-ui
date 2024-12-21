/**
 * @description 获取文件扩展名
 * @param fileName
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.match(/\.([0-9a-z]+)(?:[\\?#]|$)/i)![1] ?? '';
};

/**
 * 选择文件
 *
 * @param accepts
 * @param multiple
 * @returns
 */
export const selectFile = (accepts: string[] = ['*'], multiple: boolean = false): Promise<File[]> => {
  if (!globalThis.document || !(globalThis.document instanceof Document)) {
    throw new Error('This is not a browser environment');
  }
  const inputElem = globalThis.document.createElement('input');
  inputElem.setAttribute('type', 'file');
  inputElem.setAttribute('visibility', 'hidden');
  if (Array.isArray(accepts) && accepts.length > 0) {
    inputElem.setAttribute('accept', accepts.join(','));
  }
  if (multiple) {
    inputElem.setAttribute('multiple', 'true');
  }
  inputElem.click();
  return new Promise((resolve, reject) => {
    globalThis.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
          if (!inputElem.files || inputElem.files?.length == 0) {
            reject({
              type: 'CancelSelect',
            });
          }
        }, 1000);
      },
      { once: true }
    );
    inputElem.addEventListener('change', () => {
      if (!inputElem.files || inputElem.files?.length == 0) {
        reject({
          type: 'CancelSelect',
        });
      } else {
        const fileList = Array.from(inputElem.files);
        if (!accepts.includes('*') && fileList.some(({ name }) => !accepts.includes(`.${name.split('.').pop()}`))) {
          reject({
            message: `Please select files in ${accepts} format`,
            type: 'WrongFormat',
            accepts,
          });
        }
        resolve(fileList);
      }
    });
  });
};

export function dataURItoBlob(dataURI: string): Blob {
  // 提取数据的头部信息，包括数据类型
  const type = dataURI.split(';')[0].split(':')[1];
  // 分离数据的头部信息
  const byteString = atob(dataURI.split(',')[1]);
  // 创建一个数组缓冲区以存放二进制数据
  const ab = new ArrayBuffer(byteString.length);
  // 创建一个视图，并将缓冲区复制进来
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // 返回Blob对象
  return new Blob([ab], { type: type });
}
