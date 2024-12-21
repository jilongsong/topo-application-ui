export type Id = string;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Posture {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
}

export const enum PortTnodeIo {
  /** 输入 */
  In = 'I',
  /** 输出 */
  Out = 'O',
  /** 通用 */
  Normal = 'IO',
}

export const enum PortEnergyType {
  /** 电 */
  Electricity = 'E',
  /** 冷 */
  Cold = 'C',
  /** 热 */
  Hot = 'H',
  /** 水 */
  Water = 'W',
  /** 气 */
  Gas = 'G',
  EB = 'EB',
  FB = 'FB',
  PB = 'PB',
  TB = 'TB',
  CB = 'CB',
}

export interface MVertexPort {
  /** 连接桩ID */
  id: Id;
  /** 端点名称 */
  tnodeName: string;
  /** 实例编码 */
  tnodeCode: string;
  /** 是否为虚拟端点，1：虚拟，0：真实 */
  virtual?: 0 | 1;
  /** 是否必须连接 */
  needCon: 0 | 1;
  /** 连接桩标签 */
  label?: string;
  /** 连接桩类型 */
  tnodeIo: PortTnodeIo;
  /** 能源类型 */
  energyType: PortEnergyType;
  /** 描述 */
  descr: string;
  /** 连接桩位置，这里的位置是相对于节点中心的偏移量 */
  position: {
    refX: number;
    refY: number;
  };
}

export const enum Tag {
  Project = 'project',
  /** 系统 */
  System = 'system',
  /** 站 */
  Station = 'station',
  /** 单元 */
  Unit = 'unit',
  /** 管路 */
  Pipe = 'pipe',
  /** 设备 */
  Equipment = 'eq',
}

export type VertexTag = Tag.System | Tag.Station | Tag.Unit | Tag.Pipe | Tag.Equipment;

export interface State {
  name: string;
  default?: boolean;
  rule?: string;
}

export interface Variable {
  key: string;
  property: string;
  defaultValue: any;
}

export interface MElement<T extends State = State> {
  id: Id;
  /** 名称 */
  name: string;
  /** 填充颜色 */
  fill?: string;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 线条颜色 */
  stroke?: string;
  /** 线条宽度 */
  strokeWidth?: number;
  /** 线条虚实间距 0为实线 */
  strokeDasharray?: number;
  /** 线条透明度 */
  strokeOpacity?: number;
  /** 字体颜色 */
  color?: string;
  /** 字体透明度 */
  colorOpacity?: number;
  /** 字体大小 */
  fontSize?: number;
  /** 视图层级 */
  zIndex?: number;
  /** 变量配置 */
  variables?: Variable[];
  /** 状态 */
  states: T[];
}

export interface MVertexState extends State {
  src: string;
}

export interface MVertex extends MElement<MVertexState>, Posture {
  /** 节点类型 */
  type: string;
  /** 标签 */
  tag: VertexTag;
  /** 是否可用 */
  disabled?: boolean;
  /** 连接桩 */
  ports?: MVertexPort[];
}

export interface MLinkPoint {
  /** 节点 */
  vertex: Id;
  /** 节点标签 */
  tag?: VertexTag;
  /** 连接桩 */
  port: Id;
}

export interface MLinkState extends State {
  style?: Record<string, any>;
}

export interface MLink extends MElement<MLinkState> {
  /** 起始 */
  source: MLinkPoint;
  /** 目标 */
  target: MLinkPoint;
  /** 顶点 */
  vertices?: Position[];
}

export type GridType = 'none' | 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';

export interface MProject {
  /** 项目ID */
  id: Id;
  /** 项目名称 */
  name: string;
  gridType?: GridType;
  gridSize?: number;
  gridColor?: string;
  /** 所有节点 */
  vertexes: MVertex[];
  /** 所有连线 */
  links: MLink[];
  /** 变量存储，用于运行版的变量传递 */
  store?: Record<string, any>;
}

export type MNode = MVertex | MLink | MProject;
