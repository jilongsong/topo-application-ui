import { createApp } from 'vue';

import topoEditor from '@topo/editor';

import 'core-js';

import topoUiComponent from './components/ComponentPlayground.vue';
import App from './App.vue';
import i18n from './locales';
import router from './router';

import './assets/index.scss';
import './assets/iconfont/iconfont.css';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(topoEditor);
app.component(`topoUiComponent`, topoUiComponent);
app.mount('#app-dev');
