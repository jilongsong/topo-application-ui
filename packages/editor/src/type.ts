import { Ref } from 'vue';

import { App, Cmd, EditorService, Vertex } from '@topo/engine';
import { MElement, MVertex } from '@topo/schema';

type FormConfig = Record<string, any>;

export const enum EditorLayout {
  Sidebar = 1 << 0,
  Workspace = 1 << 1,
  Properties = 1 << 2,
  TopBar = 1 << 3,
  ContextMenu = 1 << 4,
}

export interface Context {
  app: App;
  layout: Ref<EditorLayout>;
  selected: Ref<MElement[]>;
  selectedElement: Ref<MElement | undefined>;
}

export interface Services {
  editorService: EditorService;
}

export interface Command {
  updateVertex: (payload: Cmd.UpdateVertex) => void;
  updateLink: (payload: Cmd.UpdateLink) => void;
  addElement: (payload: Cmd.AddElement) => void;
  deleteElement: (payload: Cmd.DelElement) => void;
  updateCanvas: (payload: Cmd.UpdateCanvas) => void;
}

export interface ElementModel {
  group: string;
  vertexes: MVertex[];
}

export interface CustomNode {
  group: string;
  vertex: MVertex;
}

export interface InstanceTree {
  dataCode: string;
  insCode: string;
  insId: string;
  insName: string;
  nodeType: string;
  parentDataCode: string;
  show?: boolean;
  light?: boolean;
  children: InstanceTree[] | null;
}
export interface InstanceListItem {
  insId: string;
  insName: string;
  dataCode: string;
  nodeType: string;
}

export type InstanceList = InstanceListItem[];

export interface EquipmentAndPipe {
  selected: false;
  insId: string;
  insName: string;
  insCode: string;
  nodeType: string;
  dataCode: string;
  parentDataCode: null;
  children: null;
}

export interface DefineProperties {
  //数字化编码
  dataCode: string;
  //实例名称
  insName: string;
  //实例编码
  insCode: string;
  //实例id
  insId: number;
  //节点类型
  nodeType: string;
}

export interface NormalProperties {
  id: number;
  //属性取值
  propVal: string;
  //下拉列表
  propValSelect: any[];
  //模型dataCOde
  modelDataCode: string;
  //模型id
  modelId: number;
  //实例dataCode
  insDataCode: string;
  //实例id
  insId: number;
  //属性数字化编码
  dataCode: string;
  //属性编码
  propCode: string;
  //序号
  serial: number;
  //属性名称
  propName: string;
  //数据类型
  dataType: string;
  //二值分类
  tfGroup: string;
  //二值类型
  tfType: string;
  //菜单分类
  menuGroup: string;
  //菜单类型
  menuType: string;
  //单选标记（1单选 0多选）
  singleFlag: number;
  //数值类型
  numType: string;
  //其他类型
  otherType: string;
  //精度
  p: number;
  //属性类型
  propType: string;
  //转换比率
  ratio: number;
  //字符长度
  maxLen: number;
  //结构化数据定义
  structDef: string;
  //公式
  formula: string;
  //单位
  unit: string;
  //约束类型
  consType: string;
  //最大值
  maxVal: number;
  //最小值
  minVal: number;
  //取值列表
  valArr: string;
  //必选/可选
  mo: string;
  //读/写/读写
  rw?: string;
  //英文全称
  allName: string;
  //中文描述
  zhDesc: string;
}

export interface TnodeIns {
  id: number;
  //端点模型id
  modelId: string;
  //端点所属实例id
  insId: number;
  //节点类型(system系统 station站点 unit单元 eq设备 pipe管路)
  nodeType: string;
  //端点编码
  tnodeCode: string;
  //端点名称
  tnodeName: string;
  //汇聚点id
  cnodeId: number;
  //能源类型
  energyType: string;
  //端点类型
  tnodeIo: string;
  //连接判断
  needCon: number;
  //描述
  descr: string;
}

export interface InstanceInfo {
  baseProperties: NormalProperties[];
  staticProperties: NormalProperties[];
  dynamicProperties: NormalProperties[];
  definitionProperty: DefineProperties;
  tnodeInsVOS: TnodeIns[];
}

export type GetInstances = (payload: { modelDataCode: string; app: App }) => Promise<InstanceList> | InstanceList;

export type GetInstanceTree = (payload: { app: App }) => Promise<InstanceTree[]> | InstanceTree[];

export type GetElementModels = () => Promise<ElementModel[]> | ElementModel[];

export type GetInstanceInfo = (payload: {
  dataCode: string;
  tag: string;
  app: App;
}) => Promise<InstanceInfo | void> | InstanceInfo | void;

export type GetAllEquipmentAndPipe = (payload: {
  dataCode: string;
  hasEq: boolean;
  hasPipe: boolean;
  app: App;
}) => Promise<EquipmentAndPipe[]> | EquipmentAndPipe[];

export type CreatePipeLine = (payload: {
  dataCode: string;
  descr: string;
  modelDataCode: string;
  pipeCode: string;
  pipeName: string;
  app: App;
}) => Promise<string> | string;

export type VertexProperties = (payload: {
  vertex: Vertex;
  instanceInfo: InstanceInfo;
  app: App;
}) => Promise<FormConfig> | FormConfig;

export type LineProperties = (payload: {
  source: Vertex;
  sourceFillConfig: InstanceInfo;
  target: Vertex;
  targetFillConfig: InstanceInfo;
  app: App;
}) => Promise<FormConfig> | FormConfig;
