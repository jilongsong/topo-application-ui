import { CSSProperties, Ref } from 'vue';

import type {
  Callback,
  ControlComponentEffectConfig,
  ExecutorEffectConfig,
  Id,
  MApp,
  MappingStruct,
  MComponent,
  MContainer,
  MExecutorConfig,
  MPage,
} from '@topo/schema';

import type App from './App';
import type Node from './Node';
import type Page from './Page';

export type EventPayload = Record<string | number | symbol, any>;

export type MethodPayload = EventPayload;

export interface EffectCache {
  fromNode: Node;
  effectConfig: ControlComponentEffectConfig;
  payload?: EventPayload;
}

export interface CalculatePropsArgs {
  mappings: MappingStruct[];
  payload?: EventPayload;
}

export interface EventOption {
  label: string;
  value: string;
}

export interface MethodOption extends EventOption {
  props?: string[];
}

export interface AppOptions {
  env?: 'development' | 'production';
  config?: MApp;
  designWidth?: number;
  curPage?: Id;
  toast?: (message: string) => void;
}

export interface PageOptionsConfig {
  config: MPage;
  app: App;
}

export interface NodeOptionsConfig {
  config: MComponent | MContainer;
  page?: Page;
  parent?: Node;
  app: App;
}

export interface ExecutorOptionsConfig {
  app: App;
  node: Node;
  eventConfig: ExecutorEffectConfig;
  data: MExecutorConfig;
}

export type ExecutorHandler<T extends MExecutorConfig = MExecutorConfig> = (
  payload: {
    config: T;
    props?: Record<string, any>;
  },
  resolve: (payload?: Record<string, any>) => void,
  reject: (error?: Record<string, any>) => void
) => Promise<void> | void;

export interface ExecutorState {
  config: MExecutorConfig;
  data: Record<string, any>;
  error: Error | null;
  isLoading: boolean;
}

export type ProvideMethod = (methodName: string, callback: Callback, depends?: string[] | undefined) => Callback;
export type DefineRefState = <T>(name: string, initValue?: T) => any;
export type Emit = (event: string, payload?: Record<string, any>) => boolean;

export interface UseAppResult {
  themeMode: Ref<string>;
  createClass: (styles: Record<string, any>) => string;
  emit: Emit;
  provideMethod: ProvideMethod;
  defineRefState: DefineRefState;
}

export interface UseAppProps<T extends MComponent> {
  config: T;
  context?: Record<any, any>;
}

export type UseApp = <T extends MComponent>(props: UseAppProps<T>) => UseAppResult;

export type ComponentProps<T extends MComponent> = UseAppProps<T> & UseAppResult;

// Theme Type

// 定义基础规范 Token
export const STANDARD_COLOR_TOKENS = [
  'primary',
  'secondary',
  'success',
  'info',
  'danger',
  'warning',
  'backgroundPrimary',
  'backgroundSecondary',
  'backgroundElement',
  'backgroundBorder',
  'textPrimary',
  'textInverted',
  'focus',
  'transparent',
  'backgroundLanding',
  'backgroundLandingBorder',
  'backgroundSidebar',
  'accent',
  'muted',
] as const;

export const STANDARD_SPACING_TOKENS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const STANDARD_RADIUS_TOKENS = ['none', 'sm', 'md', 'lg', 'full'] as const;

export const STANDARD_SHADOW_TOKENS = ['none', 'sm', 'md', 'lg', 'xl'] as const;

export const styleCompoundNaming = {
  position: 'positionCompound',
  padding: 'paddingCompound',
  margin: 'marginCompound',
} as const;

// 定义可扩展的主题类型
export type StandardColorToken = (typeof STANDARD_COLOR_TOKENS)[number];
export type StandardSpacingToken = (typeof STANDARD_SPACING_TOKENS)[number];
export type StandardRadiusToken = (typeof STANDARD_RADIUS_TOKENS)[number];
export type StandardShadowToken = (typeof STANDARD_SHADOW_TOKENS)[number];

export interface Theme {
  colors: Record<StandardColorToken, string> & Record<string, string>;
  spacing: Record<StandardSpacingToken, string> & Record<string, string>;
  radius: Record<StandardRadiusToken, string> & Record<string, string>;
  shadows: Record<StandardShadowToken, string> & Record<string, string>;
}

export type ThemeMode = 'light' | 'dark';

export type ThemeCategory = 'color' | 'spacing' | 'radius' | 'shadows';

// Style System Types
export interface StyleState {
  state: 'default' | 'hover' | 'pressed' | 'focus';
  styles: Partial<Record<keyof CSSProperties, any>>;
}

export interface CompoundVariant {
  name: string;
  states: StyleState[];
}

export type StyleValue = string | number | undefined;
export type ThemeVariables = Record<string, string>;
