import type { MNode } from '@topo/schema';

export * from './dom';

export * from './request';

export * from './topo-request';

export * from './date';

export * from './url';

export * from './func';

export * from './object';

export * from './file';

// 驼峰转换横线
export const toLine = (name = '') => name.replace(/\B([A-Z])/g, '-$1').toLowerCase();

export const toHump = (name = ''): string => name.replace(/-(\w)/g, (_all, letter) => letter.toUpperCase());

/**
 * 通过id获取组件在应用的子孙路径
 * @param {number | string} id 组件id
 * @param {Array} data 要查找的根容器节点
 * @return {Array} 组件在data中的子孙路径
 */
export const getNodePath = (id: number | string, data: MNode[] = []): MNode[] => {
  const path: MNode[] = [];

  const get = function (id: number | string, data: MNode[]): MNode | null {
    if (!Array.isArray(data)) {
      return null;
    }

    for (let i = 0, l = data.length; i < l; i++) {
      const item: any = data[i];

      path.push(item);
      if (`${item.id}` === `${id}`) {
        return item;
      }

      if (item.items) {
        const node = get(id, item.items);
        if (node) {
          return node;
        }
      }

      path.pop();
    }

    return null;
  };

  get(id, data);

  return path;
};

export const isPop = (node: MNode): boolean => Boolean(node.type?.toLowerCase().endsWith('pop'));

export const isPage = (node: MNode | undefined): boolean => {
  if (!node) return false;
  return Boolean(node.type?.toLowerCase() === 'page');
};

export const formatPrecision = (num: number, precision: string | number) => {
  if (!precision) {
    return Number(num) ? String(num) : '-';
  }

  if (typeof precision === 'number') {
    precision = String(precision);
  }

  const precisionLength = precision.indexOf('.') === -1 ? 0 : precision.length - precision.indexOf('.') - 1;

  // 计算精度倍数
  const multiplier = Math.pow(10, precisionLength);

  // 将数字乘以精度倍数，取整后再除以精度倍数，保留指定位数
  const result = Math.round(num * multiplier) / multiplier || 0;

  return result.toFixed(precisionLength);
};
