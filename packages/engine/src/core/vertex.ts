import { Id, MVertex, MVertexPort, MVertexState, VertexTag } from '@topo/schema';

// import { isSVG } from '@topo/utils';
import { CustomNode } from '../custom/node';
import { diffPorts, executeRule, getValidateValues } from '../util';

import { Element } from './element';
import { Project } from './project';
import { VertexPort } from './vertex-port';

interface VertexOptions {
  config: MVertex;
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

  public project: Project;
  public readonly node: CustomNode;
  /** 当前状态 */
  public curState?: MVertexState;

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
    this.node = new CustomNode(this);
    this.node.setLabel(this.name);
    this.node.setAttrByPath(['container', 'style'], this.getStyle());

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

    this.defaultImg();
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
    this.node.setPortProp(port.id, 'args/refX', port.position.refX);
    this.node.setPortProp(port.id, 'args/refY', port.position.refY);
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
      this.setNodeContent(
        defaultState.src.startsWith('/node') ? defaultState.src : import.meta.env.VITE_BASE_API_URL + defaultState.src
      );
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
    };
  }
}

export default Vertex;
