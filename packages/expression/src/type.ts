export interface UtilFunction {
  (...args: any[]): any;
  isTransform?: boolean;
  isFunction?: boolean;
}

export type Comparator<T> = (a: T, b: T) => boolean;

export type Comparator2<T1, T2> = (a: T1, b: T2) => boolean;
