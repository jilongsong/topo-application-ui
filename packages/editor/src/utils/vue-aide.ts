import { getCurrentInstance, inject, InjectionKey } from 'vue';

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T): T => {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`);
  }
  return resolved;
};

export const injectWithSelf = <T>(key: InjectionKey<T>, fallback?: T): T | undefined => {
  const vm = getCurrentInstance() as any;
  return vm?.provides[key as any] || inject(key, fallback);
};

export const injectStrictWithSelf = <T>(key: InjectionKey<T>, fallback?: T): T => {
  const vm = getCurrentInstance() as any;
  return vm?.provides[key as any] || injectStrict(key, fallback);
};
