import { Node } from '@antv/x6';

import { MVertexPort, Position, Variable } from '@topo/schema';

import { Vertex } from '../core';
import { NodeMetadata } from '../types';

export * from './context';

export * from './math';

export * from './uid';

export * from './renderer';

export * from './svg';

export interface DiffPorts {
  addPorts: MVertexPort[];
  removePorts: MVertexPort[];
  updatePorts: MVertexPort[];
}

export type DiffPortCallback = (e: { port: MVertexPort; type: 'add' | 'remove' | 'update' }) => void;

/**
 * 对比两组端点的差异
 *
 * @param oldPorts Port[]
 * @param newPorts Port[]
 * @param callback (e: { port: Port; type: 'add' | 'remove' | 'update' }) => void
 * @returns DiffPortCallback
 */
export const diffPorts = (oldPorts: MVertexPort[], newPorts: MVertexPort[], callback?: DiffPortCallback): DiffPorts => {
  const result: DiffPorts = {
    addPorts: [],
    removePorts: [],
    updatePorts: [],
  };
  const oldPortsMap = oldPorts.reduce((oldPortsMap, oldPort) => {
    oldPortsMap.set(oldPort.id, oldPort);
    return oldPortsMap;
  }, new Map<string, MVertexPort>());

  newPorts.forEach((newPort) => {
    const oldPort = oldPortsMap.get(newPort.id);
    if (!oldPort) {
      if (typeof callback === 'function') {
        callback({
          type: 'add',
          port: newPort,
        });
      }
      result.addPorts.push(newPort);
    } else {
      if (typeof callback === 'function') {
        callback({
          type: 'update',
          port: newPort,
        });
      }
      result.updatePorts.push(newPort);
    }
    oldPortsMap.delete(newPort.id);
  });

  for (const oldPort of oldPortsMap.values()) {
    if (typeof callback === 'function') {
      callback({
        type: 'remove',
        port: oldPort,
      });
    }
    result.removePorts.push(oldPort);
  }
  return result;
};

/**
 * 对比两组坐标的差异
 *
 * @param oldPosition Position[]
 * @param newPosition Position[]
 * @returns Position[]
 */
export const diffPositions = (oldPosition: Position[], newPosition: Position[]): Position[] => {
  const uniquePoints: Position[] = [];

  // 创建点的哈希表
  const hashTable: { [key: string]: boolean } = {};
  for (const point1 of oldPosition) {
    const key = `${point1.x},${point1.y}`;
    hashTable[key] = true;
  }

  // 检查第二个数组中的每个点是否存在于哈希表中
  for (const point2 of newPosition) {
    const key = `${point2.x},${point2.y}`;
    if (!hashTable[key]) {
      uniquePoints.push(point2);
    }
    delete hashTable[key];
  }

  // 添加哈希表中剩余的点
  for (const key in hashTable) {
    const [x, y] = key.split(',').map(Number);
    uniquePoints.push({ x, y });
  }

  return uniquePoints;
};

/**
 * 根据自定义结构转换antv.x6的Node.Metadata结构
 *
 * @param metadata NodeMetadata | Vertex
 * @returns Node.Metadata
 */
export const vertexMetadata = (metadata: NodeMetadata | Vertex): Node.Metadata => {
  let width: number = 100;
  let height: number = 100;
  if (metadata instanceof Vertex) {
    width = metadata.width;
    height = metadata.height;
  }

  return {
    id: metadata.id,
    x: metadata.x,
    y: metadata.y,
    width,
    height,
    angle: metadata.angle,
    zIndex: metadata.zIndex,
    ports: {
      groups: {
        relative: {
          position: {
            name: 'relative',
            args: {
              dx: 2,
              dy: 2,
            },
          },
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              fill: 'rgb(20, 115, 230)',
              stroke: 'rgb(20, 115, 230)',
              style: {
                visibility: 'hidden',
              },
            },
            text: {
              fontSize: 12,
              fill: 'rgb(20, 115, 230)',
            },
          },
        },
      },
    },
  };
};

/**
 * 获取编码的父级编码
 *
 * 例如：
 * PGY01001_SPD01001_STKBS01001_ULQS01001_EQPD01BYQ01001_MP0000000 的父级是
 * PGY01001_SPD01001_STKBS01001_ULQS01001_EQPD01BYQ01001
 *
 * @param str 编码
 * @returns 父级编码
 */
export const concatenateNonZeroUnits = (str: string): string => {
  const units = str.split('_'); // 将输入字符串以 "_" 分割为单元数组
  const result: string[] = []; // 存储符合要求的所有单元字符

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const digits = unit.match(/\d+/g); // 匹配单元中所有数字

    if (digits !== null) {
      // 如果单元中存在数字
      const nonZeroDigit = digits.find((digit) => Number(digit) !== 0); // 找到单元中第一个不为 0 的数字

      if (nonZeroDigit !== undefined) {
        // 如果单元中存在不为 0 的数字
        result.push(unit); // 将符合要求的单元字符拼接到结果字符串中
      } else {
        // 如果单元中所有数字均为 0
        break; // 终止循环
      }
    } else {
      // 如果单元中不存在数字
      result.push(unit); // 将符合要求的单元字符拼接到结果字符串中
    }
  }

  return result.join('_'); // 返回符合要求的所有单元字符拼接成的字符串
};

export const getValidateValues = (variables: Variable[], store: Record<string, any>): Record<string, any> => {
  return (
    variables.reduce<Record<string, any>>((values, { key, property, defaultValue }) => {
      if (Array.isArray(property)) {
        property = property[property.length - 1];
      }
      return {
        ...values,
        [key]: Reflect.has(store, property) ? store[property] : defaultValue,
      };
    }, {}) ?? {}
  );
};

export const executeRule = (rule: string, values: Record<string, any>) => {
  return new Function(...Object.keys(values), `return ${rule}`)(...Object.values(values));
};
