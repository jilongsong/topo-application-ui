import 'vue-router';

export type LeaveCaches = string[];

export interface Params {
  required: string[];
  catchPath?: string;
}

declare module 'vue-router' {
  interface RouteMeta {
    leaveCaches?: LeaveCaches;
    params?: Params;
  }
}
