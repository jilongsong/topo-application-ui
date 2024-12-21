import { Cell, Graph } from '@antv/x6';

import { GridType, MElement, MLink, MProject, MVertex } from '@topo/schema';

import App from './app';
import { Element, Link, Project, Vertex } from './core';
import { CmdNotOptionsError } from './error';

export interface NodeMetadata {
  id: string;
  vertex: Vertex;
  name?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  angle?: number;
  zIndex?: number;
}

export type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? `${K}.${PathImpl<T[K], keyof T[K]> & string}`
    : K
  : never;

export type Path<T> = PathImpl<T, keyof T>;

export const CONFIG_NAME = 'topo';

export interface Config {
  width: number;
  height: number;
  backgroundColor: string;
  command: {
    disabled: boolean;
    maxStackSize: number;
  };
  grid: {
    visible: boolean;
    color: string;
    subColor: string;
    factor: number;
  };
}

export namespace Cmd {
  export interface Options {
    [key: string]: any;
  }

  export interface ClearGraph extends Options {
    project?: MProject;
  }

  export interface AddElement extends Options {
    element: MElement | MLink | MVertex;
  }

  export interface UpdateVertex extends Options {
    newVertex: MVertex;
    oldVertex: MVertex;
  }

  export interface UpdateLink extends Options {
    newLink: MLink;
    oldLink: MLink;
  }

  export interface DelElement extends Options {
    element: MElement[] | MLink[] | MVertex[];
    links?: MLink[];
  }

  export interface UpdateCanvas extends Options {
    gridType: GridType;
    gridColor: string;
    gridSize: number;
  }
}

export interface Command<T extends Cmd.Options = Cmd.Options> {
  id: number;
  name: string;
  options: T;
  executed: boolean;
  executeTime: number;
}

export abstract class BaseCmd<T extends Cmd.Options = Cmd.Options> implements Command<T> {
  public name: string;
  public context: App;
  public id: number = 0;
  public executed: boolean = false;
  public options: T;
  public executeTime: number = new Date().getTime();

  constructor(context: App, options: T) {
    if (!options) {
      throw new CmdNotOptionsError(this);
    }
    this.name = this.constructor.name;
    this.context = context;
    this.options = options;
  }

  public async execute(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async undo(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public toJSON(): Command<T> {
    return {
      id: this.id,
      name: this.name,
      options: this.options,
      executed: this.executed,
      executeTime: this.executeTime,
    };
  }

  public fromJSON(json: Command<T>): void {
    this.id = json.id;
    this.name = json.name;
    this.options = json.options;
    this.executed = json.executed;
    this.executeTime = json.executeTime;
  }
}

export type CmdClass<T extends BaseCmd = BaseCmd, O extends Cmd.Options = Cmd.Options> = new (
  context: App,
  options: O
) => T;

export interface History {
  undoStack: Command[];
  redoStack: Command[];
}

export interface ProjectEventArgs {
  'project:reset': {
    project: Project;
  };
  'project:vertex:added': {
    vertex: Vertex;
  };
  'project:vertex:created': {};
  'project:vertex:removed': {
    vertex: Vertex;
  };
  'project:vertex:updated': {
    newVertex: Vertex;
    oldVertex: Vertex;
  };
  'project:link:added': {
    link: Link;
  };
  'project:link:removed': {
    link: Link;
  };
  'project:link:updated': {
    newLink: Link;
    oldLink: Link;
  };
}

export type ProjectEvent<K extends keyof ProjectEventArgs> = ProjectEventArgs[K];

export interface CommandEventArgs {
  'command:changed': {
    cmd?: BaseCmd;
    canUndo: boolean;
    canRedo: boolean;
  };
  'command:cleaned': {
    canUndo: boolean;
    canRedo: boolean;
  };
}

export type CommandEvent<K extends keyof CommandEventArgs> = CommandEventArgs[K];

export interface RendererEventArgs {
  'graph:contextmenu': {
    x: number;
    y: number;
    cell?: Cell;
  };
  'graph:resize': {
    width: number;
    height: number;
  };
  'graph:scale': {
    scale: number;
  };
}

export type RendererEvent<K extends keyof RendererEventArgs> = RendererEventArgs[K];

export interface EditorEventArgs {
  'selection:changed': {
    selected: Element[];
  };
  'vertex:changing': {
    vertex: Vertex;
  };
  'vertex:transformed': {
    oldVertex: MVertex;
    newVertex: MVertex;
  };
}

export type EditorEvent<K extends keyof EditorEventArgs> = EditorEventArgs[K];

export interface PropEventArgs {
  'prop:configs:changed': undefined;
}

export type PropEvent<K extends keyof PropEventArgs> = PropEventArgs[K];

export interface ContextEventArgs extends ProjectEventArgs, CommandEventArgs {
  'graph:created': {
    graph: Graph;
    options: Graph.Options;
  };
  'graph:mounted': {
    domElement: HTMLDivElement;
    containerElement: HTMLDivElement;
  };
  'graph:contextmenu': {
    x: number;
    y: number;
    vertex?: Element;
  };
  'graph:scale': {
    scale: number;
  };
}

export type ContextEvent<K extends keyof ContextEventArgs> = ContextEventArgs[K];
