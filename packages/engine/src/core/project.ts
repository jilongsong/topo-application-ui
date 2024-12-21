import { GridType, Id, MLink, MLinkPoint, MProject, MVertex } from '@topo/schema';
import { deepClone, EventBus } from '@topo/utils';

import { VertexAlreadyExistError } from '../error';
import { ProjectEventArgs } from '../types';
import { isLink, isVertex } from '../util';

import { Element } from './element';
import { Link } from './link';
import { LinkPoint } from './link-point';
import { Vertex } from './vertex';

export class Project extends EventBus<ProjectEventArgs> {
  public id: Id;
  public name: string;
  public gridType?: GridType;
  public gridSize?: number;
  public gridColor?: string;
  public store?: Record<string, any>;
  public vertexes: Vertex[] = [];
  public links: Link[] = [];

  public elementMap = new Map<Id, Element>();

  constructor(options: MProject) {
    super();

    this.id = options.id;
    this.name = options.name;
    this.gridType = options.gridType;
    this.gridColor = options.gridColor;
    this.gridSize = options.gridSize;

    this.init(options);
  }

  public get watchProperties(): string[] {
    const result = new Set<string>();
    for (const element of this.elementMap.values()) {
      element.variables?.forEach(({ property }) => {
        let prop: string = property;
        if (Array.isArray(property) && property.length > 0) {
          prop = property[property.length - 1];
        }
        // 过滤所有非属性变量
        if (!prop || prop.includes('_MP0000000')) {
          return;
        }
        result.add(prop);
      });
    }
    return [...result];
  }

  public init(project: MProject): void {
    this.clear();
    this.mounted(project.vertexes);
    this.id = project.id;
    this.name = project.name;
    this.store = project.store;
    this.gridColor = project.gridColor;
    this.gridSize = project.gridSize;
    this.gridType = project.gridType;
    project.vertexes?.forEach((config) => this.addVertex(config));
    project.links?.forEach((config) => this.addLink(config));
    this.emit('project:reset', {
      project: this,
    });
  }

  public setStore(store: Record<string, any>): void {
    this.store = store;
    for (const element of this.elementMap.values()) {
      if (element instanceof Vertex || element instanceof Link) {
        element.validate();
      }
    }
  }

  public addVertex(config: MVertex, parent?: Vertex): Vertex {
    if (this.elementMap.has(config.id)) {
      throw new VertexAlreadyExistError(config.id);
    }
    const handleAddVertex = (config: MVertex, parent?: Vertex): Vertex => {
      const vertex = new Vertex({
        config,
        parent: parent,
        project: this,
      });
      this.elementMap.set(vertex.id, vertex);
      if (!parent) {
        this.vertexes.push(vertex);
      } else {
        parent.addChild(vertex);
      }
      this.emit('project:vertex:added', {
        vertex,
      });
      if (config.children) {
        config.children.forEach((child) => {
          handleAddVertex(child, vertex);
        });
      }
      return vertex;
    };
    const vertex = handleAddVertex(config, parent);
    return vertex;
  }

  public updateVertex(config: MVertex | Vertex): Vertex | undefined {
    let vertexId: Id;
    if (typeof config === 'string') {
      vertexId = config;
    } else {
      vertexId = config.id;
    }
    const vertex = this.elementMap.get(vertexId);
    if (!(vertex instanceof Vertex)) {
      return;
    }
    const oldVertex = deepClone(vertex);
    vertex.update(config);
    this.emit('project:vertex:updated', {
      oldVertex,
      newVertex: vertex,
    });
    return vertex;
  }

  public removeVertex(config: MVertex | Id): Vertex | undefined {
    let vertexId: Id;
    if (typeof config === 'string') {
      vertexId = config;
    } else {
      vertexId = config.id;
    }
    if (!this.elementMap.has(vertexId) || !(this.elementMap.get(vertexId) instanceof Vertex)) {
      return;
    }
    const vertex = this.elementMap.get(vertexId) as Vertex;
    this.getVertexRelations(vertex).forEach((link) => {
      this.removeLink(link);
    });
    const index = this.vertexes.findIndex(({ id }) => id === vertexId);
    if (index > -1) {
      this.vertexes.splice(index, 1);
    }
    this.elementMap.delete(vertexId);
    this.emit('project:vertex:removed', {
      vertex,
    });
    return vertex;
  }

  public getVertexRelations(config: MVertex | Vertex | Id): Link[] {
    const vertex = this.getVertex(config);
    if (!vertex) {
      return [];
    }
    // 根据入度表，收集入度节点与vertex的连接
    const result: Link[] = [];
    vertex.ports.forEach((port) => {
      if (port.link) {
        result.push(port.link);
      }
    });
    return result;
  }

  public addLink(config: MLink | Link): Link {
    let link: Link;
    if (config instanceof Link) {
      link = config;
    } else {
      link = new Link({
        config: config,
        project: this,
      });
    }
    this.links.push(link);
    this.elementMap.set(link.id, link);
    this.emit('project:link:added', {
      link,
    });
    return link;
  }

  public updateLink(config: MLink): void {
    const link = this.elementMap.get(config.id);
    if (link instanceof Link) {
      const oldLink = deepClone(link);
      link.update(config);
      this.emit('project:link:updated', {
        oldLink,
        newLink: link,
      });
    }
  }

  public removeLink(config: MLink | Link | Id): Link | undefined {
    let linkId: Id;
    if (typeof config === 'string') {
      linkId = config;
    } else {
      linkId = config.id;
    }
    const index = this.links.findIndex((item) => item.id === linkId);
    if (index === -1) {
      return;
    }
    const link = this.links[index];
    // 解除from节点中的连接关系
    link.destroy();
    // 解除全局的连接关系
    this.links.splice(index, 1);
    this.elementMap.delete(link.id);
    this.emit('project:link:removed', {
      link,
    });
    return link;
  }

  public removeLinkByPoint(config: MLinkPoint | LinkPoint): void {
    let linkPoint: MLinkPoint;
    if (config instanceof LinkPoint) {
      linkPoint = config.toJSON();
    } else {
      linkPoint = config;
    }
    const relations = this.getVertexRelations(linkPoint.vertex);
    if (!relations) {
      return;
    }
    relations.forEach((link) => this.removeLink(link));
  }

  public hasLink(config: MLink | Link): boolean {
    const index = this.links.findIndex((item: Link) => item.id === config.id);
    return index > -1;
  }

  public getElement(config: MLink | MVertex | Id): Element | undefined {
    let elementId: Id;
    if (typeof config === 'string') {
      elementId = config;
    } else {
      elementId = config.id;
    }
    return this.elementMap.get(elementId);
  }

  public getAllElements(): Element[] {
    return [...this.elementMap.values()];
  }

  public getVertex(config: MVertex | Id): Vertex | undefined {
    const element = this.getElement(config);
    if (element instanceof Vertex) {
      return element;
    }
  }

  public getAllVertexes(): Vertex[] {
    return this.getAllElements().filter((element) => isVertex(element)) as Vertex[];
  }

  public getLink(config: MLink | Id): Link | undefined {
    const element = this.getElement(config);
    if (element instanceof Link) {
      return element;
    }
  }

  public getAllLinks(): Link[] {
    return this.getAllElements().filter((element) => isLink(element)) as Link[];
  }

  public getFrontZIndex(): number {
    return Array.from(this.elementMap.values()).reduce(
      (frontZIndex, element) => Math.max(frontZIndex, element.zIndex ?? 0),
      1
    );
  }

  public clear(): void {
    this.elementMap.clear();
    this.vertexes = [];
    this.links = [];
    this.store = {};
  }

  public mounted(vertexs: MVertex[]): void {
    if (!vertexs.length) {
      this.emit('project:vertex:created', {});
    }
  }

  public toJSON(): MProject {
    return {
      id: this.id,
      name: this.name,
      gridType: this.gridType,
      gridColor: this.gridColor,
      gridSize: this.gridSize,
      vertexes: this.vertexes.map((vertex) => vertex.toJSON()),
      links: this.links.map((link) => link.toJSON()),
      store: this.store,
    };
  }
}

export default Project;
