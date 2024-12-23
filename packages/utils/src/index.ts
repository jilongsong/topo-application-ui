import { MVertex, Tag } from '@topo/schema';

export * from './dom';

export * from './request';

export * from './topo-request';

export * from './date';

export * from './url';

export * from './func';

export * from './object';

export * from './file';

export * from './base-service';

export * from './event';

export const isProject = (map: any): boolean => {
  if (!map) {
    return false;
  }
  if (typeof map !== 'object') {
    return false;
  }
  if (
    !Reflect.has(map, 'id') ||
    !Reflect.has(map, 'name') ||
    !Reflect.has(map, 'vertexes') ||
    !Reflect.has(map, 'links')
  ) {
    return false;
  }
  return true;
};

export const guid = (digit: number = 12): string => {
  return 'x'.repeat(digit).replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const isSystemVertex = (vertex: MVertex) => vertex.tag === Tag.System;

export const isStationVertex = (vertex: MVertex) => vertex.tag === Tag.Station;

export const isUnitVertex = (vertex: MVertex) => vertex.tag === Tag.Unit;

export const isEquipmentVertex = (vertex: MVertex) => vertex.tag === Tag.Equipment;

// 驼峰转换横线
export const toLine = (name = '') => name.replace(/\B([A-Z])/g, '-$1').toLowerCase();

export const toHump = (name = ''): string => name.replace(/-(\w)/g, (_all, letter) => letter.toUpperCase());

export const formatPrecision = (num: number, precision: string | number) => {
  if (!precision) {
    return String(num);
  }
  if (typeof precision === 'number') {
    precision = String(precision);
  }
  const precisionLength = precision.indexOf('.') === -1 ? 0 : precision.length - precision.indexOf('.') - 1;
  return parseFloat(`${num}`).toFixed(precisionLength);
};
