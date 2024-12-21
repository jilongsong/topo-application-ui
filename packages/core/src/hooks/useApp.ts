import { computed, getCurrentInstance, InjectionKey, onMounted, onUnmounted, onUpdated, Ref } from 'vue';
import { injectStrict } from '@pictode/vue-aide';

import { Callback, MComponent, MNodeInstance } from '@topo/schema';

import App from '../App';
import { UseAppProps, UseAppResult } from '../type';
import { getProvideMethodName } from '../utils';

export const topoAppKey: InjectionKey<App> = Symbol('topoApp');

export const useApp = (props: UseAppProps<MComponent>): UseAppResult => {
  const vm = getCurrentInstance();

  if (!vm) {
    throw new Error('useApp can only be used in the setup function of a Vue component');
  }

  const app = injectStrict(topoAppKey);
  const node = app.page?.getNode(props.config.id);

  if (!node) {
    throw new Error(`Node with id ${props.config.id} not found`);
  }

  const instance: MNodeInstance = {
    methods: {},
  };

  node.emit('created', instance);

  onMounted(() => {
    instance.$el = vm.proxy?.$el;
    node.emit('mounted', instance);
  });

  onUpdated(() => {
    node.emit('updated', instance);
  });

  onUnmounted(() => {
    node.emit('destroy');
  });

  function provideMethod(methodName: string, callback: Callback, depends?: string[] | undefined): Callback {
    if (!instance.methods) {
      instance.methods = {};
    }
    if (depends) {
      callback.__depends__ = depends;
    }
    instance.methods[methodName] = callback;
    return callback;
  }

  function defineRefState<T>(name: string, initValue?: T): Ref<T> {
    const value = computed({
      get() {
        return app.getState<T>(`${props.config.id}.${name}`);
      },
      set(value) {
        app.setState(`${props.config.id}.${name}`, value);
      },
    });
    const setValue = provideMethod(getProvideMethodName(name), (val) => (value.value = val), [name]);
    setValue(initValue);
    return value;
  }

  function emit(event: string, payload?: Record<string, any>): boolean {
    return app.emit(`${String(event)}_${props.config.id}`, {
      ...payload,
      ...(props.context ?? {}),
    });
  }

  return {
    themeMode: app.themeManager.currentMode,
    createClass: app.styleManager.createStyles(props.config.type),
    emit,
    provideMethod,
    defineRefState,
  };
};

export default useApp;
