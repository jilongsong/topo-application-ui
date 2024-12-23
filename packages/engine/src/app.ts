import { Cell } from '@antv/x6';

import { GridType, Id, MLink, MProject, MVertex } from '@topo/schema';
import { BaseService } from '@topo/utils';

import commands from './commands/index';
import CommandService from './service/command';
import RendererService from './service/renderer';
import StorageService from './service/storage';
import { Element, Link, Project, Vertex } from './core';
import { CustomNode } from './custom';
import { BaseCmd, Cmd, ContextEventArgs } from './types';
import { defaultProject } from './util';

export class App extends BaseService<ContextEventArgs> {
  public commandService: CommandService;
  public rendererService: RendererService;
  public storageService: StorageService;
  public readonly project: Project;
  public selected: Element[] = [];
  public domElement: HTMLDivElement;
  private counter: number;
  constructor() {
    super();

    this.domElement = document.createElement('div');
    this.domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    this.counter = 0;
    const resizeObserver = new ResizeObserver(([domElement]) => {
      this.rendererService.emit('graph:resize', {
        ...domElement.contentRect,
      });
    });
    resizeObserver.observe(this.domElement);

    this.storageService = new StorageService();

    this.commandService = new CommandService(this, 500);
    this.commandService.registerCommands(commands);

    this.rendererService = new RendererService(this);

    this.project = defaultProject();

    this.project.on('project:reset', ({ project }) => {
      this.emit('project:reset', {
        project,
      });
    });

    this.project.on('project:vertex:added', async (e) => {
      const { vertex } = e;
      await this.rendererService.addNode(vertex.node);
      if (vertex.parent) {
        vertex.parent.node.addChild(vertex.node);
      }
      this.counter++;
      if (this.counter === this.project.vertexes.length) {
        this.emit('project:vertex:created', {});
      }
      this.emit('project:vertex:added', e);
    });

    this.project.on('project:vertex:created', () => {
      setTimeout(() => {
        this.emit('project:vertex:created', {});
      }, 1000);
    });

    this.project.on('project:vertex:removed', (e) => {
      const { vertex } = e;
      this.rendererService.removeEdge(vertex.id);
      this.emit('project:vertex:removed', e);
    });

    this.project.on('project:vertex:updated', (e) => {
      this.emit('project:vertex:updated', e);
    });

    this.project.on('project:link:added', (e) => {
      const { link } = e;
      this.rendererService.addEdge(link.edge);
      this.emit('project:link:added', e);
    });

    this.project.on('project:link:removed', (e) => {
      const { link } = e;
      this.rendererService.removeEdge(link.id);
      this.emit('project:link:removed', e);
    });

    this.project.on('project:link:updated', (e) => {
      this.emit('project:link:updated', e);
    });

    this.commandService.on('command:changed', (e) => {
      this.emit('command:changed', e);
    });

    this.commandService.on('command:cleaned', (e) => {
      this.emit('command:cleaned', e);
    });

    this.rendererService.on('graph:contextmenu', ({ x, y, cell }) => {
      if (cell) {
        const { id } = cell;
        const vertex = this.project.getElement(id);
        vertex &&
          this.emit('graph:contextmenu', {
            x,
            y,
            vertex,
          });
      } else {
        this.emit('graph:contextmenu', {
          x,
          y,
        });
      }
    });

    this.rendererService.on('graph:scale', ({ scale }) => {
      this.emit('graph:scale', { scale });
    });
  }

  public mount(container: HTMLDivElement): void {
    container.appendChild(this.domElement);
    this.emit('graph:mounted', {
      domElement: this.domElement,
      containerElement: container,
    });
  }

  public resetProject(projectConfig: MProject): void {
    this.clearGraph();
    this.project.init(projectConfig);
    this.rendererService.fit();
    this.updateGrid(projectConfig.gridType, projectConfig.gridColor, projectConfig.gridSize);
  }

  public getVertexByPoint(x: number, y: number): Vertex[] {
    const nodes = this.rendererService.getNodesByPoint(x, y) as CustomNode[];
    return nodes.map(({ vertex }) => vertex);
  }

  public addVertex(config: MVertex): void {
    let parent: Vertex | undefined;
    if (config.parentId) {
      const elem = this.project.elementMap.get(config.parentId);
      if (elem instanceof Vertex) {
        parent = elem as Vertex;
      }
    }
    this.project.addVertex(config, parent);
  }

  public removeVertex(config: MVertex | Vertex | Id): void {
    this.project.removeVertex(config);
  }

  public updateVertex(config: MVertex | Vertex): void {
    this.project.updateVertex(config);
  }

  public addLink(config: MLink | Link): void {
    this.project.addLink(config);
  }

  public removeLink(config: MLink | Link | Id): void {
    this.project.removeLink(config);
  }

  public updateLink(config: MLink): void {
    this.project.updateLink(config);
  }

  public updateGrid(type?: GridType, color?: string, size?: number): void {
    this.project.gridType = type;
    this.project.gridColor = color;
    this.project.gridSize = size;

    if (!type || type === 'none') {
      this.rendererService.hideGrid();
    } else {
      this.rendererService.showGrid();
      this.rendererService.drawGrid(type, color ?? '#323232', size ?? 6);
    }
  }

  public triggerCellsVisible(nodes: Cell | string | (string | Cell)[], visible?: boolean): void {
    this.rendererService.triggerCellsVisibility(nodes, visible);
  }

  public async execute<T extends Cmd.Options>(command: BaseCmd | string, options: T): Promise<void> {
    await this.commandService.execute<T>(command, options);
  }

  public clearGraph(): void {
    this.project.clear();
    this.rendererService.clear();
    this.commandService.clean();
  }

  public async export(
    fileName: string = this.project.name,
    type: 'json' | 'JSON' | 'svg' | 'SVG' | 'png' | 'PNG' | 'jpg' | 'JPG' | 'jpeg' | 'JPEG',
    backgroundColor: string = '#fff'
  ): Promise<void> {
    switch (type) {
      case 'svg':
      case 'SVG':
        await this.rendererService.exportSvg(fileName, 20, backgroundColor);
        break;
      case 'png':
      case 'PNG':
        await this.rendererService.exportPNG(fileName, 20, backgroundColor);
        break;
      case 'jpg':
      case 'JPG':
      case 'jpeg':
      case 'JPEG':
        await this.rendererService.exportJPEG(fileName, 20, backgroundColor);
        break;
      case 'json':
      case 'JSON':
        try {
          const res = await Promise.resolve(JSON.parse(JSON.stringify(this.project.toJSON())));
          const blob = new Blob([JSON.stringify(res)], { type: `application/json;charset=utf-8` });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        } catch (e: any) {
          console.log(e);
        }
        break;
      default:
        break;
    }
  }

  public destroy(): void {
    this.commandService.destroy();
    this.rendererService.destroy();
    this.storageService.destroy();
    this.project.removeAllListeners();
    this.removeAllListeners();
    this.counter = 0;
  }
}

export default App;
