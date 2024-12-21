import { InjectionKey } from 'vue';

import { App, Vertex } from '@topo/engine';

import {
  Command,
  Context,
  CreatePipeLine,
  ElementModel,
  GetAllEquipmentAndPipe,
  GetElementModels,
  GetInstanceInfo,
  GetInstances,
  GetInstanceTree,
  LineProperties,
  Services,
  VertexProperties,
} from '../type';

export const EditorEmitsKey: InjectionKey<{
  emits: {
    (event: 'removeVertex', vertex: Vertex): void;
    (event: 'publish', app: App): void;
    (event: 'save', app: App): void;
    (event: 'distributeCheck', app: App, data: any): void;
  };
}> = Symbol('EditorEmitsKey');

export const ContextKey: InjectionKey<Context> = Symbol('ContextKey');

export const ServicesKey: InjectionKey<Services> = Symbol('ServicesKey');

export const CommandKey: InjectionKey<Command> = Symbol('CommandKey');

export const ElementModelsKey: InjectionKey<ElementModel[]> = Symbol('ElementModelsKey');

export const ModelMethodsKey: InjectionKey<{
  getInstances: GetInstances;
  getInstanceTree: GetInstanceTree;
  getInstanceInfo: GetInstanceInfo;
  getAllEquipmentAndPipe: GetAllEquipmentAndPipe;
  createPipeLine: CreatePipeLine;
  vertexProperties: VertexProperties;
  lineProperties: LineProperties;
  getElementModels: GetElementModels;
}> = Symbol('ModelMethodsKey');
