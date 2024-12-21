import { reactive } from 'vue';
import { cloneDeep, mergeWith } from 'lodash-es';

import type { MComponent, MExecutorConfig, MNode } from '@topo/schema';

import { NodePanelConfig, PropsConfig, PropsValue, Services } from '../type';

import BaseService from './BaseService';

export const defaultNodePanelConfig: NodePanelConfig = {
  property: { fields: {} },
  style: { fields: {} },
  event: { fields: {} },
};

export class PropsService extends BaseService {
  private idPrefix: string = '';
  private propsConfig: PropsConfig = () => defaultNodePanelConfig;
  private propsValue: PropsValue = () => ({});

  public state = reactive<{ executors: MExecutorConfig[] }>({
    executors: [],
  });

  constructor() {
    super(['getPropsValue', 'getPropsConfig', 'createId', 'setNewItemId', 'getDefaultPropsValue']);
  }

  public setIdPrefix(prefix: string) {
    this.idPrefix = prefix;
  }

  public setPropsConfig(propsConfig: PropsConfig) {
    this.propsConfig = propsConfig;
  }

  public setPropsValue(propsValue: PropsValue) {
    this.propsValue = propsValue;
  }

  public async getPropsConfig(type: string, services: Services): Promise<NodePanelConfig> {
    return await this.propsConfig(type, services);
  }

  /**
   * 获取指定类型的组件初始值
   * @param type 组件类型
   * @returns 组件初始值
   */
  public async getPropsValue(type: string, { ...defaultValue }: Record<string, any> = {}) {
    if (type === 'area') {
      const value = (await this.getPropsValue('button')) as MComponent;
      value.className = 'action-area';
      value.text = '';
      if (value.style) {
        value.style.backgroundColor = 'rgba(255, 255, 255, 0)';
      }
      return value;
    }

    const [id, defaultPropsValue, data] = await Promise.all([
      this.createId(type),
      this.getDefaultPropsValue(type),
      this.setNewItemId(
        cloneDeep({
          type,
          ...defaultValue,
        } as any)
      ),
    ]);

    return {
      id,
      ...defaultPropsValue,
      ...mergeWith({}, cloneDeep((await this.propsValue(type)) || {}), data),
    };
  }

  public setExecutors(executors: MExecutorConfig[]) {
    this.state.executors = executors;
  }

  public getExecutors() {
    return this.state.executors;
  }

  public async createId(type: string | number): Promise<string> {
    return `${this.idPrefix}_${type}_${this.guid()}`;
  }

  /**
   * 将组件与组件的子元素配置中的id都设置成一个新的ID
   * @param {Object} config 组件配置
   */
  public async setNewItemId(config: MNode) {
    config.id = await this.createId(config.type);

    if (config.items && Array.isArray(config.items)) {
      for (const item of config.items) {
        await this.setNewItemId(item);
      }
    }

    return config;
  }

  /**
   * 获取默认属性配置
   * @param type 组件类型
   * @returns Object
   */
  public async getDefaultPropsValue(type: string) {
    return ['page', 'container'].includes(type)
      ? {
          type,
          layout: 'absolute',
          style: {},
          name: type,
          items: [],
        }
      : {
          type,
          style: {},
          name: type,
        };
  }

  public destroy() {
    this.removeAllListeners();
  }

  /**
   * 生成指定位数的GUID，无【-】格式
   * @param digit 位数，默认值8
   * @returns
   */
  private guid(digit = 8): string {
    return 'x'.repeat(digit).replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export default new PropsService();
