import { EventEmitter } from 'events';

import { ExpressionBinding, ExpressionParser } from '@topo/expression';
import { EffectConfig, Expression, Id, MApp, MappingStruct } from '@topo/schema';

import { EffectHandler } from './services/EffectHandler';
import { ExecutorManager } from './services/ExecutorsManager';
import { StateManager } from './services/StateManager';
import { StyleManager } from './services/StyleManager';
import { ThemeManager } from './services/ThemeManager';
import Node from './Node';
import Page from './Page';
import type { AppOptions, CalculatePropsArgs, EffectCache, EventPayload, MethodPayload } from './type';

export class App extends EventEmitter {
  public env: 'development' | 'production' = 'development';
  public designWidth = 375;
  public toast?: (message: string) => void;
  public config?: MApp;
  public page?: Page;
  public pages = new Map<Id, Page>();
  public expressionParser: ExpressionParser;
  public effectQueueMap: Record<string, EffectCache[]> = {};

  public readonly executorManger: ExecutorManager;
  public readonly themeManager: ThemeManager;
  public readonly styleManager: StyleManager;
  private readonly stateManager: StateManager;
  private readonly effectHandler: EffectHandler;
  private readonly expressionBinding: ExpressionBinding;

  constructor(options: AppOptions) {
    super();
    this.initializeApp(options);

    this.stateManager = new StateManager();
    this.effectHandler = new EffectHandler(this);
    this.executorManger = new ExecutorManager(this);
    this.expressionParser = new ExpressionParser(this.state);
    this.expressionBinding = new ExpressionBinding(this.expressionParser);
    this.themeManager = new ThemeManager();
    this.styleManager = new StyleManager();

    options.config && this.setConfig(options.config, options.curPage);
    this.setMaxListeners(200);
  }

  private initializeApp(options: AppOptions) {
    this.env = options.env ?? this.env;
    this.designWidth = options.designWidth ?? this.designWidth;
    this.toast = options.toast;
  }

  public toggleTheme() {
    this.themeManager.toggle();
  }

  public get state(): Record<string, any> {
    return this.stateManager.state;
  }

  public getState<T>(path: string, defaultValue?: T): T {
    return this.stateManager.getState(path, defaultValue);
  }

  public setState<T>(path: string, value: T): T {
    return this.stateManager.setState(path, value, (expression) => {
      this.bindExpression(expression, (val) => {
        this.setState(path, val);
      });
    });
  }

  public deleteState(path: string): void {
    this.stateManager.deleteState(path);
  }

  public setConfig(config: MApp, curPage?: Id) {
    this.removeAllListeners();
    this.config = config;
    this.pages = new Map();

    config.items?.forEach((page) => {
      this.pages.set(
        page.id,
        new Page({
          config: page,
          app: this,
        })
      );
    });
    this.setPage(curPage ?? this.page?.data.id);
  }

  public setPage(id?: Id) {
    let page = id ? this.pages.get(id) : undefined;

    if (!page) {
      const pageId = this.pages.keys().next().value;
      page = pageId ? this.pages.get(pageId) : undefined;
    }

    this.page = page;
  }

  public bindEvent(name: string, node: Node, effectConfig: EffectConfig): void {
    this.on(`${name}_${node.data.id}`, (payload?: EventPayload) =>
      this.effectHandler.handleEffect(node, effectConfig, payload)
    );
  }

  public emit(name: string | symbol, payload?: EventPayload): boolean {
    return super.emit(name, payload);
  }

  public addEffectQueueMap(effect: EffectCache) {
    const { component } = effect.effectConfig;
    if (!component) return;

    this.effectQueueMap[component] = this.effectQueueMap[component] || [];
    this.effectQueueMap[component].push(effect);
  }

  public flushEffectQueue(node: Node) {
    const eventConfigQueue = this.effectQueueMap[node.data.id] || [];
    for (let eventConfig = eventConfigQueue.shift(); eventConfig; eventConfig = eventConfigQueue.shift()) {
      this.effectHandler.handleEffect(eventConfig.fromNode, eventConfig.effectConfig, eventConfig.payload);
    }
  }

  public parseExpression(expression: string): any {
    return this.expressionParser.eval(expression);
  }

  public calculateProps({ mappings }: CalculatePropsArgs): MethodPayload {
    if (!mappings) return {};

    return mappings.reduce(
      (props: Record<string, any>, mapping: MappingStruct) => ({
        ...props,
        [mapping.target]: this.parseExpression(mapping.expression ?? ''),
      }),
      {}
    );
  }

  public bindExpression(expression: string | Expression, callback: (value: any) => void): () => void {
    return this.expressionBinding.bindExpression(expression, callback);
  }

  public computedExpression<T = any>(expression: string | Expression) {
    return this.expressionBinding.computedExpression<T>(expression);
  }

  public destroy() {
    this.removeAllListeners();
    this.pages.clear();
  }
}

export default App;
