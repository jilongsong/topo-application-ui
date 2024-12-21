import type { InjectionKey } from 'vue';

import type { MenuButton, MenuComponent, Services, StageOptions } from '../type';

export const ServicesKey: InjectionKey<Services> = Symbol('services');

export const StageOptionsKey: InjectionKey<StageOptions> = Symbol('stageOptions');

export const LayerContentMenuKey: InjectionKey<Array<MenuButton | MenuComponent>> = Symbol('layerContentMenu');

export const StageContentMenuKey: InjectionKey<Array<MenuButton | MenuComponent>> = Symbol('stageContentMenu');

export const ComponentListMenuKey: InjectionKey<Array<MenuButton | MenuComponent>> = Symbol('componentListMenu');

export const ContentMenuKey: InjectionKey<Array<MenuButton | MenuComponent>> = Symbol('contentMenu');

export const StageRuntimeReadyKey: InjectionKey<(el: HTMLIFrameElement) => void> = Symbol('stageRuntimeReady');
