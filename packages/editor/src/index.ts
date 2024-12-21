import { App } from 'vue';

import { registerInputComponent } from '@topo/panel';

import PanelFieldUI from './fields/PanelFieldUI.vue';
import { i18nInstance } from './hooks/useI18n';
import { setConfig } from './utils/config';
import Editor from './Editor.vue';
import languages from './locales';
import type { InstallOptions } from './type';

import './globals.css';

export type { MoveableOptions } from '@topo/stage';
export * from './type';
export * from './utils';
export { default as topoEditor } from './Editor.vue';
export { default as editorService } from './services/editor';
export { default as propsService } from './services/props';
export { default as historyService } from './services/history';
export { default as storageService } from './services/storage';
export { default as uiService } from './services/ui';
export { default as ToolButton } from './components/ToolButton.vue';
export { default as ContentMenu } from './components/ContentMenu.vue';
export { default as Icon } from './components/Icon.vue';

const defaultInstallOpt: InstallOptions = {};
registerInputComponent('ui', PanelFieldUI);

export default {
  install: (app: App, opt?: InstallOptions): void => {
    const i18nSymbol = Reflect.get(app, '__VUE_I18N_SYMBOL__');
    const i18n = Reflect.get(app._context.provides, i18nSymbol);
    if (i18n) {
      i18nInstance.value = i18n;
      //将两个语言包合并
      Object.entries(languages).forEach(([lang, message]) => {
        i18nInstance.value?.global.mergeLocaleMessage(lang, message);
      });
    }

    const option = Object.assign(defaultInstallOpt, opt || {});
    app.config.globalProperties.$topo_EDITOR = option;
    setConfig(option);
    app.component('topoEditor', Editor);
  },
};
