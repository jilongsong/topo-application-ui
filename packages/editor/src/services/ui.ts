import { reactive } from 'vue';

import type StageCore from '@topo/stage';

import editorService from '../services/editor';
import type { StageRect, UiState } from '../type';
import { PageSign } from '../type';

import BaseService from './BaseService';

const state = reactive<UiState>({
  uiSelectMode: false,
  currentPage: PageSign.DEFAULT,
  showSrc: false,
  zoom: 1,
  stageContainerRect: {
    width: 0,
    height: 0,
  },
  stageRect: {
    width: 375,
    height: 817,
  },
  columnWidth: {
    left: 0,
    right: 0,
    center: 0,
  },
  showGuides: true,
  showRule: true,
  propsPanelSize: 'small',
  showAddPageButton: true,
});

export class UiService extends BaseService {
  constructor() {
    super(['zoom', 'calcZoom']);
  }

  public set<T = any>(name: keyof UiState, value: T) {
    const mask = editorService.get<StageCore>('stage')?.mask;

    if (name === 'stageRect') {
      this.setStageRect(value as unknown as StageRect);
      return;
    }

    if (name === 'showGuides') {
      mask?.showGuides(value as unknown as boolean);
    }

    if (name === 'showRule') {
      mask?.showRule(value as unknown as boolean);
    }

    (state as any)[name] = value;
  }

  public get<T>(name: keyof typeof state): T {
    return (state as any)[name];
  }

  public async zoom(zoom: number) {
    this.set('zoom', (this.get<number>('zoom') * 100 + zoom * 100) / 100);
    if (this.get<number>('zoom') < 0.1) this.set('zoom', 0.1);
  }

  public async calcZoom() {
    const { stageRect, stageContainerRect } = state;
    const { height, width } = stageContainerRect;
    if (!width || !height) return 1;

    // 30为标尺的大小
    const stageWidth = stageRect.width + 30;
    const stageHeight = stageRect.height + 30;

    if (width > stageWidth && height > stageHeight) {
      return 1;
    }
    // 60/80是为了不要让画布太过去贴住四周（这样好看些）
    return Math.min((width - 60) / stageWidth || 1, (height - 80) / stageHeight || 1);
  }

  public destroy() {
    this.removeAllListeners();
  }

  private async setStageRect(value: StageRect) {
    state.stageRect = {
      ...state.stageRect,
      ...value,
    };
    state.zoom = await this.calcZoom();
  }
}

export default new UiService();
