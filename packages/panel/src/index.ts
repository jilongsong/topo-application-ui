import { App, Component, Plugin } from 'vue';

import { registerInputComponent } from './config';
import Panel from './Panel.vue';

export * from 'zod';
export * from 'vee-validate';
export * from './schema';
export * from './utils';
export { default as Panel } from './Panel.vue';
export { default as PanelLayout } from './components/PanelLayout.vue';
export { default as PanelLabel } from './components/PanelLabel.vue';
export { registerInputComponent } from './config';

export interface Options {
  [key: string]: Component;
}

export default {
  install: (app: App, options?: Options): void => {
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        registerInputComponent(key, value);
      });
    }
    app.component('Panel', Panel);
  },
} as Plugin;
