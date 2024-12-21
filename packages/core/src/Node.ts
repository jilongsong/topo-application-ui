import { EventEmitter } from 'events';

import { EffectConfig, MComponent, MContainer, MethodConfig, MNodeInstance, MPage } from '@topo/schema';

import { COMMON_EVENT_MOUNTED, COMMON_EVENT_UPDATE } from './utils/events';
import type App from './App';
import type Page from './Page';
import { NodeOptionsConfig } from './type';

class Node extends EventEmitter {
  public data: MComponent | MContainer | MPage;
  public event: { [key: string]: EffectConfig[] };
  public method: MethodConfig[];

  public instance?: MNodeInstance;
  public page?: Page;
  public parent?: Node;
  public app: App;

  constructor(options: NodeOptionsConfig) {
    super();

    this.page = options.page;
    this.parent = options.parent;
    this.app = options.app;

    this.data = options.config;

    this.event = options.config.event;
    this.method = options.config.method;

    if (typeof this.event === 'object') {
      Object.entries(this.event).forEach(([key, effects]) => {
        effects.forEach((effect) => {
          this.app.bindEvent(`${key}`, this, effect);
        });
      });
    }

    this.listenLifeSafe();

    this.once('destroy', () => {
      this.instance = undefined;
      this.off('updated', this.updateInstance);
      this.listenLifeSafe();
    });

    this.app.setState(`${options.config.id}`, options.config.property);
    this.app.setState(`${options.config.id}.style`, options.config.style);
  }

  private listenLifeSafe() {
    this.once('created', async (instance: MNodeInstance) => {
      this.instance = instance;
    });

    this.on('mounted', async (instance: MNodeInstance) => {
      this.instance = instance;
      this.app.emit(`${COMMON_EVENT_MOUNTED}_${this.data.id}`, this.instance);
      this.app.flushEffectQueue(this);
    });

    this.on('updated', this.updateInstance);
  }

  public updateInstance(instance?: MNodeInstance) {
    this.instance = instance;
    this.app.emit(`${COMMON_EVENT_UPDATE}_${this.data.id}`, this.instance);
  }
}

export default Node;
