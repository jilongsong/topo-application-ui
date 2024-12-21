import { cloneDeep, get, has, isEqual, set } from 'lodash';

export const isNumber = (value: string) => /^(-?\d+)(\.\d+)?$/.test(value);

export function typeOf(value: any, type: Function) {
  const functionNameReg = /(?<=(function )).*(?=(\())/g;
  const valueTypeReg = /(?<=(\[object )).*(?=(\]))/g;
  const functionNameMatch = (type.toString() ?? '').match(functionNameReg) ?? [];
  const valueTypeMatch = (Object.prototype.toString.call(value) ?? '').match(valueTypeReg) ?? [];
  return functionNameMatch[0] === valueTypeMatch[0];
}

export function deepClone<T>(obj: T): T {
  return cloneDeep(obj);
}

export function deepEqual<T, Q>(var1: T, var2: Q): boolean {
  return isEqual(var1, var2);
}

export const equals = (newValue: unknown, oldValue: unknown): boolean => Object.is(newValue, oldValue);

export const hasOwn = (val: object, key: string | symbol | number): key is keyof typeof val =>
  Object.prototype.hasOwnProperty.call(val, key);

export const getByPath = (object: object, path: string | symbol | number, defaultValue?: any): any => {
  return get(object, path, defaultValue);
};

export const setByPath = (object: object, path: string | symbol | number, value?: any): void => {
  set(object, path, value);
};

export const hasByPath = (object: object, path: string | symbol | number): boolean => {
  return has(object, path);
};
