export type Id = string | number;

export interface MappingStruct {
  target: string;
  expression?: string;
}

export const enum EffectType {
  ControlComponent = 'controlComponent',
  Executor = 'executor',
  Navigate = 'navigate',
  ShowAlert = 'showAlert',
  PostMessage = 'postMessage',
}

export interface BaseEffectConfig {
  type: EffectType;
  condition?: string;
}

export interface ControlComponentEffectConfig extends BaseEffectConfig {
  type: EffectType.ControlComponent;
  component: Id;
  method: string;
  mappings?: string[];
}

export interface NavigateEffectConfig extends BaseEffectConfig {
  type: EffectType.Navigate;
  page: Id;
  params?: MappingStruct[];
  target?: '_self' | '_blank';
}

export interface ExecutorEffectConfig extends BaseEffectConfig {
  type: EffectType.Executor;
  executor: Id;
  mappings?: MappingStruct[];
}

export interface ShowAlertEffectConfig extends BaseEffectConfig {
  type: EffectType.ShowAlert;
  message: string;
  messageType?: 'success' | 'error' | 'warning';
}

export interface PostMessageEffectConfig extends BaseEffectConfig {
  type: EffectType.PostMessage;
  data: string;
  origins: string;
}

export type EffectConfig =
  | ControlComponentEffectConfig
  | NavigateEffectConfig
  | ExecutorEffectConfig
  | ShowAlertEffectConfig
  | PostMessageEffectConfig;

export interface MethodConfig {
  method: string;
  label: string;
  props: string[];
}

export interface Expression {
  expression: string;
  condition?: string;
  fallback?: any;
}

export type DynamicType<T> = T | Expression;

export interface MComponent {
  id: Id;
  type: string;
  name: string;
  version?: string;
  visible?: DynamicType<boolean>;
  disabled?: DynamicType<boolean>;
  permissions?: string[];

  property: {
    [key: string]: DynamicType<any>;
  };

  event: {
    [key: string]: EffectConfig[];
  };

  method: MethodConfig[];

  style: {
    [key: string]: DynamicType<any>;
  };

  [key: string]: any;
}

export interface MContainer extends MComponent {
  layout?: {
    type: 'flex' | 'grid' | 'flow';
    props: Record<string, any>;
  };
  items: (MComponent | MContainer)[];
}

export interface MPage extends MContainer {
  type: 'page';
}

export interface MApp extends MComponent {
  type: 'app';
  items: MPage[];
  tenantId?: string;
}

export type MNode = MComponent | MContainer | MPage | MApp;

export interface Callback {
  (...args: any[]): any;
  __depends__?: string[];
}

export interface MNodeInstance {
  methods?: Record<string, Callback>;
  $el?: HTMLElement;
}

export interface ExecutorConfig {
  id: string;
  name: string;
  type: MExecutorType;
  props: ExecutorProp[];
  after?: string;
}

export type MExecutorType = 'restApi';

export interface ExecutorProp {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  default?: any;
}

export interface MRestApiExecutorConfig extends ExecutorConfig {
  type: 'restApi';
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  headers?: Record<string, string>;
  data?: Record<string, string>;
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
}

export type MExecutorConfig = MRestApiExecutorConfig;
