import { Id, MVertex, MVertexPort, MVertexState, Tag, VertexTag } from '@topo/schema';

import { CustomGroup } from '../custom/group';
import { CustomNode } from '../custom/node';
import { diffPorts, executeRule, getValidateValues } from '../util';

import { Element } from './element';
import { Link } from './link';
import { Project } from './project';
import { VertexPort } from './vertex-port';

interface VertexOptions {
  config: MVertex;
  parent?: Vertex;
  project: Project;
}

export class Vertex extends Element {
  public type: string;
  public tag: VertexTag;
  public ports: VertexPort[] = [];
  public disabled?: boolean;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public angle: number;
  public states: MVertexState[];
  public isCollapsed?: boolean;
  public expandWidth?: number;
  public expandHeight?: number;

  public project: Project;
  public readonly node: CustomNode;
  /** 当前状态 */
  public curState?: MVertexState;

  public parent?: Vertex;
  public children: Vertex[] = [];
  /** 出度 */
  public outDegrees: Map<Id, Link[]> = new Map();
  /** 入度 */
  public inDegrees: Vertex[] = [];

  constructor(options: VertexOptions) {
    super(options.config, options.project);
    const { type, tag, disabled, ports, states, x, y, width, height, angle } = options.config;
    this.type = type;
    this.tag = tag;
    this.disabled = disabled;
    this.ports = (ports ?? []).map((port) => new VertexPort({ port, vertex: this }));
    this.states = states;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;

    this.project = options.project;
    this.parent = options.parent;

    if ([Tag.System, Tag.Station, Tag.Unit].includes(this.tag)) {
      if (Reflect.has(options.config, 'isCollapsed')) {
        this.isCollapsed = options.config.isCollapsed;
      } else {
        this.isCollapsed = false;
      }
      if (Reflect.has(options.config, 'expandWidth')) {
        this.expandWidth = options.config.expandWidth;
      } else {
        this.expandWidth = 400;
      }

      if (Reflect.has(options.config, 'expandHeight')) {
        this.expandHeight = options.config.expandHeight;
      } else {
        this.expandHeight = 400;
      }
      this.node = new CustomGroup(this);
      this.node.setAttrByPath(['container', 'style'], this.getStyle());
    } else {
      this.node = new CustomNode(this);
      this.node.setAttrByPath(['container', 'style'], this.getStyle());
    }

    this.node.setLabel(this.name);
    this.node.on('change:collapsed', ({ cell }: { cell: CustomNode }) => {
      if (cell instanceof CustomGroup) {
        const collapsed = cell.isCollapsed();
        this.isCollapsed = collapsed;
        const collapse = (parent: CustomGroup) => {
          const cells = parent.getChildren();
          if (!cells) {
            return;
          }
          cells.forEach((cell) => {
            if (collapsed) {
              cell.hide();
            } else {
              cell.show();
            }
            if (cell instanceof CustomGroup) {
              if (!cell.isCollapsed()) {
                collapse(cell);
              }
            }
          });
        };
        collapse(cell);
      }
    });

    this.node.on('change:angle', ({ cell }: { cell: CustomNode }) => {
      this.angle = cell.getAngle();
    });

    this.node.on('change:position', ({ cell }: { cell: CustomNode }) => {
      const { x, y } = cell.getPosition();
      this.x = x;
      this.y = y;
    });

    this.node.on('change:size', ({ cell }: { cell: CustomNode }) => {
      const { width, height } = cell.getSize();
      this.width = width;
      this.height = height;
    });

    this.node.on('change:parent', ({ current }: { cell: CustomNode; current?: string }) => {
      if (this.parent) {
        this.parent.removeChild(this);
      } else {
        this.project.vertexes.splice(
          this.project.vertexes.findIndex((item) => item === this),
          1
        );
      }
      if (!current) {
        this.parent = undefined;
        this.project.vertexes.push(this);
      } else {
        const parent = this.project.elementMap.get(current);
        if (parent && parent instanceof Vertex) {
          this.parent = parent;
          const parentZIndex = parent.node.getZIndex() ?? 1;
          this.node.setZIndex(parentZIndex + 1);
          this.parent.addChild(this);
        }
      }
    });
    this.defaultImg();

    // children?.map((child) => {
    //   this.project.addVertex(child);
    //   // this.addChild(child);
    // });
  }

  public addChild(config: MVertex | Vertex): void {
    let vertex: Vertex;
    if (config instanceof Vertex) {
      vertex = config;
    } else {
      vertex = new Vertex({
        config: config,
        project: this.project,
        parent: this,
      });
    }
    this.children.push(vertex);
  }

  public removeChild(config: MVertex | Vertex | Id): void {
    let vertexId: Id;
    if (typeof config === 'string') {
      vertexId = config;
    } else {
      vertexId = config.id;
    }
    const index = this.children.findIndex(({ id }) => id === vertexId);
    if (index === -1) {
      return;
    }
    this.children.splice(index, 1);
  }

  public hasPort(id: Id): boolean {
    if (!this.ports || this.ports.length < 1) {
      return false;
    }
    const index = this.ports.findIndex((port) => port.id === id);
    return index !== -1;
  }

  public getPort(id: Id): VertexPort | undefined {
    if (!this.hasPort(id)) {
      return;
    }
    return this.ports.find((port) => port.id === id);
  }

  public addPort(portConfig: MVertexPort): void {
    this.ports.push(new VertexPort({ port: portConfig, vertex: this }));
    this.node.addPort({
      id: portConfig.id,
      group: 'relative',
      args: {
        refX: portConfig.position.refX,
        refY: portConfig.position.refY,
      },
    });
  }

  public removePort(portConfig: MVertexPort): void {
    const index = this.ports.findIndex(({ id }) => id === portConfig.id);
    if (index === -1) {
      return;
    }
    // 从图中删除该端点的连接
    this.project.removeLinkByPoint({
      vertex: this.id,
      port: portConfig.id,
    });
    this.ports.splice(index, 1);
    this.node.removePort(portConfig.id);
  }

  public updatePort(portConfig: MVertexPort): void {
    const port = this.ports.find(({ id }) => id === portConfig.id);
    if (!port) {
      return;
    }
    port.tnodeName = portConfig.tnodeName;
    port.tnodeCode = portConfig.tnodeCode;
    port.virtual = portConfig.virtual;
    port.needCon = portConfig.needCon;
    port.label = portConfig.label;
    port.tnodeIo = portConfig.tnodeIo;
    port.energyType = portConfig.energyType;
    port.descr = portConfig.descr;
    port.position = portConfig.position;
    this.node.setPortProp(port.id, 'args/refX', port.position?.refX);
    this.node.setPortProp(port.id, 'args/refY', port.position?.refY);
    this.defaultImg();
  }

  public update(config: MVertex | Vertex): void {
    super.update(config);
    this.disabled = config.disabled;
    diffPorts(this.ports, config.ports ?? [], ({ port, type }) => {
      if (type === 'add') {
        this.addPort(port);
        return;
      }
      if (type === 'remove') {
        this.removePort(port);
        return;
      }
      if (type === 'update') {
        this.updatePort(port);
        return;
      }
    });
    this.refreshNodePosture(config);
  }

  public refreshNodePosture(config: MVertex): void {
    this.node.resize(config.width, config.height);
    const { x, y } = this.node.getBBox();
    const originPosition = { x, y };
    this.node.setZIndex(config.zIndex ?? 1);
    this.node.translate(config.x - originPosition.x, config.y - originPosition.y);
    this.node.rotate(config.angle - this.node.getAngle());
    this.node.setAttrByPath(['container', 'style'], this.getStyle());

    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.angle = config.angle;
    this.validate();
  }

  public defaultImg(): void {
    let defaultState = this.states.find((item) => item.default);
    if (!defaultState) {
      defaultState = this.states[0];
    }
    if (defaultState && defaultState.src) {
      this.curState = defaultState;
      this.setNodeContent(defaultState.src);
    } else {
      //画一个矩形
      this.node.setContent(`<rect width="${this.width}" height="${this.height}" fill="#f5f5f5" />`);
    }
  }

  public validate(): void {
    const store = this.project.store ?? {};
    const values = getValidateValues(this.variables ?? [], store);
    const state = this.states?.find(({ rule }) => {
      return executeRule(rule ?? '', values);
    });
    if (!state || this.curState?.name === state?.name) {
      return;
    }
    if (state.src) {
      this.curState = state;
      this.setNodeContent(state.src);
    }
  }

  private setNodeContent(src: string) {
    this.node.setContent(src);
    // fetch(src)
    //   .then((response) => response.text())
    //   .then((res) => {
    //     if (isSVG(res)) {
    //       this.node.setContent(res);
    //     } else {
    //       this.node.setContent(src);
    //     }
    //   });
  }

  public toJSON(): MVertex {
    return {
      ...super.toJSON(),
      type: this.type,
      tag: this.tag,
      disabled: this.disabled,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      angle: this.angle,
      states: this.states,
      ports: this.ports.map((item) => item.toJSON()),
      parentId: this.parent?.id,
      children: this.children.map((item) => item.toJSON()),
    };
  }
}

export default Vertex;
