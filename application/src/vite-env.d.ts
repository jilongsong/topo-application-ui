import Core from '@topo/core';
import { topo } from '@topo/stage';

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface Window {
    topo: topo;
    topoInstance: Core;
  }
}
