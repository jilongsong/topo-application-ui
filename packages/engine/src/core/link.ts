import { MLink, MLinkState, Position } from '@topo/schema';

import { CustomEdge } from '../custom/edge';
import { IllegalLinkError, PortNotExistError, VertexNotExistError } from '../error';
import { executeRule, getValidateValues, validateLink } from '../util';

import { Element } from './element';
import { LinkPoint } from './link-point';
import { Project } from './project';

interface LinkOptions {
  config: MLink;
  project: Project;
}

export class Link extends Element {
  public source: LinkPoint;
  public target: LinkPoint;
  public vertices?: Position[];
  public states: MLinkState[];
  public isReverse?: boolean;
  public isRunning?: boolean;
  public project: Project;
  public edge: CustomEdge;

  constructor(options: LinkOptions) {
    super(options.config, options.project);
    this.vertices = options.config.vertices;
    this.states = options.config.states;
    this.project = options.project;
    const { source, target } = this.init(options.config);
    this.source = source;
    this.target = target;
    this.source.vertex.getPort(this.source.port)?.setLink(this);
    this.target.vertex.getPort(this.target.port)?.setLink(this);
    this.isReverse = options.config.isReverse ?? false;
    this.isRunning = options.config.isRunning ?? false;
    this.edge = new CustomEdge(this);
    this.edge.setAttrByPath(['container', 'style'], this.getStyle());
  }

  private init(config: MLink) {
    const { source, target } = config;
    const sourceVertex = this.project.getVertex(source.vertex);
    if (!sourceVertex) {
      throw new VertexNotExistError(source.vertex);
    } else if (!sourceVertex.hasPort(source.port)) {
      throw new PortNotExistError(source.vertex, source.port);
    }

    const targetVertex = this.project.getVertex(target.vertex);
    if (!targetVertex) {
      throw new VertexNotExistError(target.vertex);
    } else if (!targetVertex.hasPort(target.port)) {
      throw new PortNotExistError(target.vertex, target.port);
    }

    if (!validateLink(sourceVertex, source.port, targetVertex, target.port)) {
      throw new IllegalLinkError(this);
    }

    return {
      source: new LinkPoint({
        vertex: sourceVertex,
        port: source.port,
      }),
      target: new LinkPoint({
        vertex: targetVertex,
        port: target.port,
      }),
    };
  }

  public update(config: MLink): void {
    super.update(config);
    this.vertices = config.vertices;
    this.refreshLinkPath(config);
  }

  public refreshLinkPath(config: MLink): void {
    this.edge.setZIndex(this.zIndex ?? 1);
    this.edge.setVertices(this.vertices ?? []);
    this.edge.setAttrByPath(['container', 'style'], this.getStyle());
    this.isRunning = config.isRunning ?? false;
    this.isReverse = config.isReverse ?? false;
    this.edge.refreshEdgeStyle();
    const { source, target } = this.init(config);
    this.source = source;
    this.edge.setSource(this.source.vertex.node, {
      port: this.source.port,
    });
    this.target = target;
    this.edge.setTarget(this.target.vertex.node, {
      port: this.target.port,
    });
  }

  public validate(): void {
    const values = getValidateValues(this.variables ?? [], this.project.store ?? {});
    const state = this.states?.find(({ rule }) => {
      return executeRule(rule ?? '', values);
    });
    if (state?.style) {
      for (const [key, value] of Object.entries(state.style)) {
        this.edge.setAttrByPath(key, value);
      }
    }
  }

  public destroy(): void {
    this.source.vertex.getPort(this.source.port)?.removeLink();
    this.target.vertex.getPort(this.target.port)?.removeLink();
  }

  public toJSON(): MLink {
    return {
      ...super.toJSON(),
      states: this.states,
      source: this.source.toJSON(),
      target: this.target.toJSON(),
      vertices: this.vertices,
      isReverse: this.isReverse,
      isRunning: this.isRunning,
    };
  }
}

export default Link;
