import { reactive } from 'vue';

import type { ComponentGroup, ComponentGroupState, ComponentItem } from '../type';

import BaseService from './BaseService';

export class ComponentListService extends BaseService {
  private state = reactive<ComponentGroupState>({
    list: [],
  });

  constructor() {
    super([]);
  }

  public setCur(cur?: ComponentItem): void {
    this.state.cur = cur;
  }

  public getCur(): ComponentItem | undefined {
    return this.state.cur;
  }

  /**
   * @param componentGroupList 组件列表配置
   */
  public setList(componentGroupList: ComponentGroup[]): void {
    this.state.list = componentGroupList;
  }

  public getList(): ComponentGroup[] {
    return this.state.list;
  }

  public destroy() {
    this.state.list = [];
    this.state.cur = undefined;
    this.removeAllListeners();
  }
}

export default new ComponentListService();
