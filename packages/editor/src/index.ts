import { App } from 'vue';

import { i18nInstance } from './hooks/useI18n';
import Editor from './Editor.vue';
import languages from './locales';

import './globals.css';

export * from './type';

export default {
  install: (app: App): void => {
    const i18nSymbol = Reflect.get(app, '__VUE_I18N_SYMBOL__');
    const i18n = Reflect.get(app._context.provides, i18nSymbol);
    if (i18n) {
      i18nInstance.value = i18n;
      //将两个语言包合并
      Object.entries(languages).forEach(([lang, message]) => {
        i18nInstance.value?.global.mergeLocaleMessage(lang, message);
      });
    }

    app.component('TopoEditor', Editor);
  },
};
