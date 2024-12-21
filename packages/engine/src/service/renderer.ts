import { Cell, Edge, Graph, Node, Point, Rectangle, Size } from '@antv/x6';

import { Posture } from '@topo/schema';
import { BaseService } from '@topo/utils';

import App from '../app';
import { ContextEventArgs, RendererEventArgs } from '../types';
import { defaultGraphOptions } from '../util';

Graph.registerPortLayout(
  'relative',
  (portsPositionArgs, elemBBox, groupPositionArgs) => {
    const { dx = 0, dy = 0 } = groupPositionArgs;
    return portsPositionArgs.map(({ refX, refY }) => {
      const { width, height } = elemBBox;
      const position = {
        x: Math.min(1, Math.max(refX, 0)) * width + dx,
        y: Math.min(1, Math.max(refY, 0)) * height + dy,
      };
      return {
        position,
        angle: 0,
      };
    });
  },
  true
);

export class RendererService extends BaseService<RendererEventArgs> {
  private context: App;

  public options?: Graph.Options;
  public graph?: Graph;

  constructor(context: App) {
    super();

    this.context = context;

    (['onGraphCreated'] as (keyof this)[]).forEach((method) => {
      method = method as keyof RendererService;
      this[method] = (this[method] as Function).bind(this);
    });

    context.on('graph:created', this.onGraphCreated);

    this.on('graph:resize', ({ width, height }) => {
      this.graph?.resize(width, height);
    });
  }

  private onGraphCreated({ graph, options }: ContextEventArgs['graph:created']): void {
    this.graph?.off();
    this.graph?.dispose();

    this.graph = graph;
    this.options = options;

    /** 节点/线条右键处理 */
    this.graph.on('cell:contextmenu', ({ x, y, cell }) => {
      this.emit('graph:contextmenu', { x, y, cell });
    });

    /** 画布右键处理 */
    this.graph.on('blank:contextmenu', ({ x, y }) => {
      this.emit('graph:contextmenu', { x, y });
    });

    /** 缩放处理 */
    this.graph.on('scale', ({ sx }) => {
      this.emit('graph:scale', { scale: sx });
    });
  }

  public showGrid(): void {
    this.graph?.showGrid();
  }

  public hideGrid(): void {
    this.graph?.hideGrid();
  }

  public drawGrid(type: string, color: string, size: number): void {
    this.graph?.drawGrid({
      type,
      args: {
        color,
      },
    });
    this.graph?.setGridSize(size);
  }

  public translate(x: number, y: number): void {
    this.graph?.translate(x, y);
  }

  public getZoom(): number | undefined {
    return this.graph?.zoom();
  }

  public zoom(factor: number): void {
    this.graph?.zoom(factor);
  }

  public setZoomTo(size: number): void {
    this.graph?.zoomTo(size);
  }

  public centerContent(config?: { [propName: string]: any }): void {
    this.graph?.centerContent(config);
  }

  public centerPoint(x: number, y: number | null, options?: { padding: number; animation: any }): void {
    this.graph?.centerPoint(x, y, options);
  }

  public fit(): void {
    this.graph?.zoomToFit({
      maxScale: 1,
    });
    this.graph?.centerContent();
  }

  public select(nodeId: string | string[]): void {
    // 指定选择节点时，先清空选区
    this.graph?.cleanSelection();
    this.graph?.select(nodeId);
  }

  public isSelected(nodeId: string | string[]): boolean {
    if (!Array.isArray(nodeId)) {
      nodeId = [nodeId];
    }
    return nodeId.every((id) => this.graph?.isSelected(id) ?? false);
  }

  public triggerCellsVisibility(nodes: Cell | string | (string | Cell)[], visible?: boolean): void {
    if (!Array.isArray(nodes)) {
      nodes = [nodes];
    }
    nodes.forEach((item) => {
      let node: Cell | undefined;
      if (typeof item === 'string') {
        node = this.graph?.getCellById(item);
      } else {
        node = item;
      }
      if (node) {
        node.setVisible(visible ?? !node.visible);
      }
    });
  }

  public async addNode(node: Node, parent?: Node): Promise<Node<Node.Properties> | undefined> {
    if (node.id && this.graph?.hasCell(node.id)) {
      this.graph.removeNode(node.id);
    }
    this.graph?.addNode(node);
    if (parent) {
      parent.addChild(node);
    }
    return node;
  }

  public getNodePosture(node: Node): Posture {
    return {
      ...node.position(),
      ...node.size(),
      angle: node.getAngle(),
    };
  }

  public getNodesByPoint(x: number, y: number): Node[] {
    if (!this.graph) {
      return [];
    }
    return this.graph.getNodesFromPoint(x, y);
  }

  public removeNode(nodeId: string): Node | undefined {
    return this.graph?.removeNode(nodeId) ?? undefined;
  }

  public addEdge(edgeMeta: Edge.Metadata | Edge): Edge | undefined {
    if (edgeMeta.id && this.graph?.hasCell(edgeMeta.id)) {
      this.graph?.removeEdge(edgeMeta.id);
    }
    const edge = this.graph?.addEdge(edgeMeta);
    if (!edge) {
      return;
    }
    const sourceZIndex = edge.getSourceNode()?.getZIndex() ?? 1;
    const targetZIndex = edge.getTargetNode()?.getZIndex() ?? 1;
    edge.setZIndex(Math.min(sourceZIndex, targetZIndex) - 1);
    return edge;
  }

  public removeEdge(edgeId: string): Edge | undefined {
    return this.graph?.removeEdge(edgeId) ?? undefined;
  }

  public clear(): void {
    this.graph?.clearCells();
  }

  public pageToLocal(x: number, y: number): Point {
    return this.graph?.pageToLocal(x, y) as Point;
  }

  public async exportSvg(fileName: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    const contentBBox = this.graph?.getContentBBox();
    let preserveDimensions: Size | boolean = true;
    let viewBox: Rectangle.RectangleLike | undefined = undefined;
    padding = Math.max(padding, 20);
    if (contentBBox) {
      preserveDimensions = {
        width: contentBBox.width + padding,
        height: contentBBox.height + padding,
      };
      viewBox = {
        x: contentBBox.x - padding / 2,
        y: contentBBox.y - padding / 2,
        ...preserveDimensions,
      };
    }

    this.graph?.exportSVG(fileName, {
      preserveDimensions,
      viewBox,
      beforeSerialize(svg) {
        if (backgroundColor) {
          svg.setAttribute('style', `background: ${backgroundColor}`);
        }
        return svg;
      },
    });
  }

  public async exportPNG(fileName: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    this.graph?.exportPNG(fileName, {
      quality: 0.92,
      padding: Math.max(padding, 20),
      backgroundColor,
    });
  }

  public async exportJPEG(fileName?: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    this.graph?.exportJPEG(fileName, {
      quality: 0.92,
      padding: Math.max(padding, 20),
      backgroundColor,
    });
  }

  public destroy(): void {
    this.clear();
    this.graph?.off();
    this.graph?.dispose();
    this.context.off('graph:created', this.onGraphCreated);
    this.removeAllListeners();
  }

  static createGraph(context: App, options?: Graph.Options): void {
    const graphElement = document.createElement('div');
    graphElement.setAttribute('style', 'width: 100%; height: 100%; position: relative;');
    context.domElement.appendChild(graphElement);
    const metadata = {
      container: graphElement,
      ...defaultGraphOptions(),
      ...options,
      resizing: {
        enabled: true,
        minWidth: 1,
        maxWidth: 200,
        minHeight: 1,
        maxHeight: 150,
        orthogonal: false,
        restricted: false,
        preserveAspectRatio: false,
      },
    };
    const graph = new Graph(metadata);

    context.emit('graph:created', { graph, options: metadata });
  }
}

export default RendererService;
