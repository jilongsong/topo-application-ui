import {
  ControlComponentEffectConfig,
  EffectConfig,
  EffectType,
  ExecutorEffectConfig,
  NavigateEffectConfig,
  PostMessageEffectConfig,
  ShowAlertEffectConfig,
} from '@topo/schema';
import { setUrlParam } from '@topo/utils';

import App from '../App';
import Node from '../Node';
import { EventPayload } from '../type';
import { isExpression } from '../utils/props';

export class EffectHandler {
  private fromNode: Node | undefined;

  constructor(private app: App) {}

  public handleEffect(fromNode: Node, effectConfig: EffectConfig, payload?: EventPayload) {
    if (!this.app.page) throw new Error('当前没有页面');

    const handlers: Record<EffectType, (config: any, payload?: EventPayload) => void> = {
      [EffectType.ControlComponent]: this.handleControlComponent.bind(this),
      [EffectType.Navigate]: this.handleNavigate.bind(this),
      [EffectType.Executor]: this.handleExecutor.bind(this),
      [EffectType.ShowAlert]: this.handleShowAlert.bind(this),
      [EffectType.PostMessage]: this.handlePostMessage.bind(this),
    };

    const handler = handlers[effectConfig.type];
    this.fromNode = fromNode;
    if (handler) {
      handler(effectConfig, payload);
    }
  }

  private handleControlComponent(config: ControlComponentEffectConfig, payload?: EventPayload) {
    if (!this.fromNode) {
      return;
    }
    const { component, method: methodName } = config;
    if (!component || !methodName || !this.app.page) return;

    const toNode = this.app.page.getNode(component);
    if (!toNode) {
      console.error(`ID为${component}的组件不存在`);
      return;
    }

    // if (isCommonMethod(methodName)) {
    //   return triggerCommonMethod(methodName, toNode);
    // }

    if (!toNode.instance) {
      this.app.addEffectQueueMap({ fromNode: this.fromNode, effectConfig: config, payload });
    } else if (toNode.instance.methods && typeof toNode.instance.methods[methodName] === 'function') {
      const method = toNode.instance.methods[methodName];
      const props = (config.mappings ?? []).map((val) =>
        isExpression(val) ? this.app.parseExpression(val.expression) : val
      );
      method.apply(null, props);
    }
  }

  private handleNavigate(config: NavigateEffectConfig, payload?: EventPayload) {
    const props = this.app.calculateProps({ mappings: config.params ?? [], payload });
    setUrlParam({
      page: `${config.page}`,
      ...props,
    });
  }

  private handleExecutor(config: ExecutorEffectConfig, payload?: EventPayload) {
    if (!config.executor) return;
    this.app.executorManger.runExecutor(`${config.executor}`, payload ?? {});
  }

  private handleShowAlert(config: ShowAlertEffectConfig) {
    this.app.toast?.(config.message);
  }

  private handlePostMessage(config: PostMessageEffectConfig) {
    window.parent.postMessage(config.data, config.origins);
  }
}
