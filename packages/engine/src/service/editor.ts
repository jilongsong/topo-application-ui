import { Cell, Edge, Graph } from '@antv/x6';
import { Export } from '@antv/x6-plugin-export';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';

import { MLink, MVertex, Position } from '@topo/schema';
import { BaseService } from '@topo/utils';

import { App } from '../app';
import { Vertex } from '../core';
import { CustomEdge, CustomNode } from '../custom';
import { Cmd, ContextEventArgs, EditorEventArgs } from '../types';
import { diffPositions, distance, generateCirclePath, scale, validateLink } from '../util';

export const enum EditorAbility {
  Selection = 1 << 0,
  NodeMove = 1 << 1,
  NodeResizing = 1 << 2,
  NodeRotate = 1 << 3,
  HightLight = 1 << 4,
  EdgeMove = 1 << 5,
  EdgeVertexAdd = 1 << 6,
  EdgeVertexDel = 1 << 7,
  EdgeVertexMove = 1 << 8,
  EdgeHeadMove = 1 << 9,
}

export interface EditorOptions {
  context: App;
  graph?: Graph;
  ability?: EditorAbility;
}

export const AllAbility: EditorAbility =
  EditorAbility.Selection |
  EditorAbility.NodeMove |
  EditorAbility.NodeResizing |
  EditorAbility.NodeRotate |
  EditorAbility.HightLight |
  EditorAbility.EdgeMove |
  EditorAbility.EdgeVertexAdd |
  EditorAbility.EdgeVertexDel |
  EditorAbility.EdgeVertexMove |
  EditorAbility.EdgeHeadMove;

export class EditorService extends BaseService<EditorEventArgs> {
  public ability: EditorAbility = AllAbility;

  private context: App;
  private graph?: Graph;

  constructor({ context, graph, ability }: EditorOptions) {
    super();
    this.context = context;
    this.graph = graph;
    this.setAbility(ability ?? AllAbility);

    (
      [
        'onGraphCreated',
        'onSelectionChanged',
        'onNodeMousedown',
        'onNodeResize',
        'onNodeRotate',
        'onNodeMouseenter',
        'onNodeMouseleave',
        'onEdgeSelected',
        'onEdgeMousemove',
        'onEdgeMouseenter',
        'onEdgeMouseleave',
        'onEdgeConnected',
      ] as (keyof this)[]
    ).forEach((method) => {
      method = method as keyof EditorService;
      this[method] = (this[method] as Function).bind(this);
    });

    context.on('graph:created', this.onGraphCreated);
  }

  private abilityIsEnable(ability: EditorAbility): boolean {
    return (this.ability & ability) === ability;
  }

  private onGraphCreated({ graph }: ContextEventArgs['graph:created']): void {
    this.graph = graph;
    // 判断是否具备移动|改变线条能力
    this.setAbility(this.ability);

    this.graph.on('selection:changed', this.onSelectionChanged);
    this.graph.on('node:mousedown', this.onNodeMousedown);
    this.graph.on('node:resize', this.onNodeResize);
    this.graph.on('node:rotate', this.onNodeRotate);
    this.graph.on('node:mouseenter', this.onNodeMouseenter);
    this.graph.on('node:mouseleave', this.onNodeMouseleave);
    this.graph.on('edge:selected', this.onEdgeSelected);
    this.graph.on('edge:mousemove', this.onEdgeMousemove);
    this.graph.on('edge:mouseenter', this.onEdgeMouseenter);
    this.graph.on('edge:mouseleave', this.onEdgeMouseleave);
    this.graph.on('edge:connected', this.onEdgeConnected);
  }

  public setAbility(ability: EditorAbility): void {
    this.ability = ability;
    this.initGraph();
  }

  public initGraph(): void {
    if (!this.graph) {
      return;
    }
    this.graph.disposePlugins('export');
    this.graph.use(new Export());

    this.usePlugin(
      new Selection({
        enabled: this.abilityIsEnable(EditorAbility.Selection),
        movable: false,
        strict: true,
        rubberband: true,
        rubberNode: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        pointerEvents: 'none',
      })
    );

    this.usePlugin(
      new Snapline({
        enabled: true,
        resizing: true,
      })
    );

    this.usePlugin(
      new Transform({
        resizing: {
          enabled: this.abilityIsEnable(EditorAbility.NodeResizing),
          preserveAspectRatio: false,
          minWidth: 1,
          minHeight: 1,
        },
        rotating: {
          enabled: this.abilityIsEnable(EditorAbility.NodeRotate),
        },
      })
    );

    this.graph.options.interacting = {
      nodeMovable: this.abilityIsEnable(EditorAbility.NodeMove),
      edgeMovable: this.abilityIsEnable(EditorAbility.EdgeMove),
      magnetConnectable: this.abilityIsEnable(EditorAbility.EdgeMove),
      vertexAddable: this.abilityIsEnable(EditorAbility.EdgeVertexAdd),
      vertexDeletable: this.abilityIsEnable(EditorAbility.EdgeVertexDel),
      vertexMovable: this.abilityIsEnable(EditorAbility.EdgeVertexMove),
      arrowheadMovable: this.abilityIsEnable(EditorAbility.EdgeHeadMove),
    };
  }

  public usePlugin(plugin: Graph.Plugin): void {
    if (!this.graph) {
      return;
    }
    this.graph.disposePlugins(plugin.name);
    this.graph.use(plugin);
  }

  public triggerPortVisibility(
    node: CustomNode,
    visible: boolean,
    callback?: (node: CustomNode, port?: string) => boolean
  ): void {
    node.getPorts().forEach((port) => {
      const canTrigger = typeof callback === 'function' ? callback(node, port.id) : true;
      if (!canTrigger || !port.id) {
        return;
      }
      node.triggerPortVisibility(port.id, visible);
    });
  }

  public destroy(): void {
    this.graph?.off('selection:changed', this.onSelectionChanged);
    this.graph?.off('node:mousedown', this.onNodeMousedown);
    this.graph?.off('node:resize', this.onNodeResize);
    this.graph?.off('node:rotate', this.onNodeRotate);
    this.graph?.off('node:mouseenter', this.onNodeMouseenter);
    this.graph?.off('node:mouseleave', this.onNodeMouseleave);
    this.graph?.off('edge:selected', this.onEdgeSelected);
    this.graph?.off('edge:mousemove', this.onEdgeMousemove);
    this.graph?.off('edge:mouseenter', this.onEdgeMouseenter);
    this.graph?.off('edge:mouseleave', this.onEdgeMouseleave);
    this.graph?.off('edge:connected', this.onEdgeConnected);
    this.context.off('graph:created', this.onGraphCreated);
    this.removeAllListeners();
  }

  private onSelectionChanged({ selected }: { selected: Cell[] }) {
    this.context.selected = [];
    for (const { id } of selected) {
      const element = this.context.project.getElement(id);
      if (element) {
        this.context.selected.push(element);
      }
    }
    this.emit('selection:changed', {
      selected: this.context.selected,
    });
  }

  private transformVertex({ oldVertex, newVertex }: { oldVertex: MVertex; newVertex: MVertex }) {
    this.context.execute<Cmd.UpdateVertex>('UpdateVertexCmd', { oldVertex, newVertex });
    this.emit('vertex:transformed', { oldVertex, newVertex });
  }

  private changeVertex({ vertex }: { vertex: Vertex }) {
    this.emit('vertex:changing', { vertex });
  }

  private onNodeMousedown({ node: oldNode }: { node: CustomNode }) {
    const oldVertex = oldNode.vertex.toJSON();
    const oldPosture = this.context.rendererService.getNodePosture(oldNode);

    const handleNodeMoving = ({ node }: { node: CustomNode }) => {
      this.changeVertex({ vertex: node.vertex });
    };

    const handleNodeMouseup = ({ node: newNode }: { node: CustomNode }) => {
      const newVertex = newNode.vertex.toJSON();
      const newPosture = this.context.rendererService.getNodePosture(newNode);
      if (distance(oldPosture, newPosture) > 0.001) {
        this.transformVertex({ oldVertex, newVertex });
      }
      this.graph?.off('node:moving', handleNodeMoving);
    };

    this.graph?.on('node:moving', handleNodeMoving);
    this.graph?.once('node:mouseup', handleNodeMouseup);
  }

  private onNodeResize({ node: oldNode }: { node: CustomNode }) {
    const oldVertex = oldNode.vertex.toJSON();
    const oldPosture = this.context.rendererService.getNodePosture(oldNode);

    const handleNodeResizing = ({ node }: { node: CustomNode }) => {
      this.changeVertex({ vertex: node.vertex });
    };

    const handleNodeResized = ({ node: newNode }: { node: CustomNode }) => {
      const newVertex = newNode.vertex.toJSON();
      const newPosture = this.context.rendererService.getNodePosture(newNode);
      if (scale(newPosture, oldPosture) > 0.01) {
        this.transformVertex({ oldVertex, newVertex });
      }
      this.graph?.off('node:resizing', handleNodeResizing);
    };

    this.graph?.on('node:resizing', handleNodeResizing);
    this.graph?.once('node:resized', handleNodeResized);
  }

  private onNodeRotate({ node: oldNode }: { node: CustomNode }) {
    const oldVertex = oldNode.vertex.toJSON();

    const handleNodeRotating = ({ node }: { node: CustomNode }) => {
      this.changeVertex({ vertex: node.vertex });
    };

    const handleNodeRotated = ({ node: newNode }: { node: CustomNode }) => {
      const newVertex = newNode.vertex.toJSON();
      this.transformVertex({ oldVertex, newVertex });
      this.graph?.off('node:rotating', handleNodeRotating);
    };

    this.graph?.on('node:rotating', handleNodeRotating);
    this.graph?.once('node:rotated', handleNodeRotated);
  }

  private onNodeMouseenter({ node }: { node: CustomNode }) {
    // 判断是否具备高亮能力
    if (!this.abilityIsEnable(EditorAbility.HightLight)) {
      return;
    }
    node.getPorts().forEach((port) => {
      if (!port.id) {
        return;
      }
      node.setPortProp(port.id, 'attrs/circle/style', {
        visibility: 'visible',
      });
    });
  }

  private onNodeMouseleave({ node }: { node: CustomNode }) {
    node.getPorts().forEach((port) => {
      if (!port.id) {
        return;
      }
      node.setPortProp(port.id, 'attrs/circle/style', {
        visibility: 'hidden',
      });
    });
  }

  private onEdgeMousemove({ edge }: { edge: CustomEdge }) {
    const sourceNode = edge.getSourceNode();
    if (!sourceNode) {
      return;
    }
    const sourcePort = edge.getSourcePortId() ?? '';

    this.graph?.getNodes().forEach((itemNode) => {
      if (itemNode.id !== sourceNode.id) {
        this.triggerPortVisibility(itemNode as CustomNode, true, (node, port) =>
          validateLink(sourceNode as CustomNode, sourcePort, node, port ?? '')
        );
      }
    });
  }

  private onEdgeMouseenter({ edge }: { edge: CustomEdge }) {
    // 判断是否具备高亮能力
    if (!this.abilityIsEnable(EditorAbility.HightLight)) {
      return;
    }
    edge.prop('zIndex', 10);
    edge.setAttrs({
      line: {
        stroke: '#fff',
        targetMarker: {
          fill: 'none',
          stroke: 'none',
        },
      },
      arrow: {
        fill: '#fff',
        stroke: '#fff',
      },
    });
  }

  private onEdgeConnected({ edge }: { edge: CustomEdge }) {
    this.graph?.getNodes().forEach((itemNode) => {
      this.triggerPortVisibility(itemNode as CustomNode, false);
    });

    if (edge.link) {
      return;
    }

    const sourceNode = edge.getSourceNode();
    const sourcePort = edge.getSourcePortId();
    const targetNode = edge.getTargetNode();
    const targetPort = edge.getTargetPortId();

    if (!sourceNode || !targetNode || !sourcePort || !targetPort) {
      return;
    }

    const sourceVertex = this.context.project.getVertex(sourceNode.id);
    const targetVertex = this.context.project.getVertex(targetNode.id);
    if (!sourceVertex || !targetVertex) {
      return;
    }
    const link: MLink = {
      id: edge.id,
      name: `${sourceVertex.id}::${sourcePort}=>${targetVertex.id}::${targetPort}`,
      source: {
        vertex: sourceVertex.id,
        port: sourcePort,
      },
      target: {
        vertex: targetVertex.id,
        port: targetPort,
      },
      states: [
        {
          name: '连通',
          style: {
            'line/strokeDasharray': 5,
            'line/style/animation': 'running-line 30s infinite linear',
          },
        },
        {
          name: '阻塞',
          default: true,
          style: {
            'line/strokeDasharray': 0,
            'line/style/animation': '',
          },
        },
      ],
    };
    this.context.execute<Cmd.AddElement>('AddElementCmd', {
      element: link,
    });
  }

  private onEdgeMouseleave({ edge }: { edge: CustomEdge }) {
    edge.prop('zIndex', 0);
    edge.setAttrs({
      line: {
        stroke: 'var(--stroke)',
        targetMarker: {
          fill: 'none',
          stroke: 'none',
        },
      },
      arrow: {
        fill: 'var(--stroke)',
        stroke: 'var(--stroke)',
      },
    });
  }

  private onEdgeSelected({ edge }: { edge: CustomEdge }) {
    const originVertices: Position[] = edge.getVertices();
    let downVertices: Position[] = [];
    let upVertices: Position[] = [];
    let oldLink: MLink | undefined;
    let newLink: MLink | undefined;

    const handleEdgeMousedown = ({ edge }: { edge: CustomEdge }) => {
      if (edge.link) {
        if (originVertices.length === 0 && edge.getVertices().length === 1) {
          downVertices = [];
        } else {
          downVertices = edge.getVertices();
        }
        oldLink = edge.link?.toJSON();
      }
      this.graph?.once('edge:mouseup', handleEdgeMouseup);
    };

    const handleEdgeMouseup = ({ edge }: { edge: CustomEdge }) => {
      upVertices = edge.getVertices();
      if (edge.link) {
        if (diffPositions(downVertices, upVertices).length > 0) {
          edge.link.vertices = edge.getVertices();
          newLink = edge.link?.toJSON();
          if (newLink && oldLink) {
            this.context.execute<Cmd.UpdateLink>('UpdateLinkCmd', {
              newLink,
              oldLink,
            });
          }
        }
      }
    };

    const handleEdgeTargetChange = ({ edge }: { edge: CustomEdge }) => {
      edge.isTargetChange = true;
    };

    const handleEdgeSourceChange = ({ edge }: { edge: CustomEdge }) => {
      edge.isSourceChange = true;
    };

    const handelEdgeUpdate = ({ edge }: { edge: CustomEdge }) => {
      if (!edge.link) {
        return;
      }
      const target = edge.target as Edge.TerminalCellLooseData;
      const source = edge.source as Edge.TerminalCellLooseData;
      if (!target.port || !source.port) {
        return;
      }
      const oldLink = edge.link.toJSON();
      const newLink = {
        ...oldLink,
        target: {
          vertex: typeof target.cell === 'string' ? target.cell : target.cell.id,
          port: target.port,
        },
        source: {
          vertex: typeof source.cell === 'string' ? source.cell : source.cell.id,
          port: source.port,
        },
      };

      this.context.execute<Cmd.UpdateLink>('UpdateLinkCmd', {
        newLink,
        oldLink,
      });
    };

    const handleEdgeConnected = ({ edge }: { edge: CustomEdge }) => {
      if (edge.isTargetChange) {
        edge.isTargetChange = false;
      } else if (edge.isSourceChange) {
        edge.isSourceChange = false;
      }
      handelEdgeUpdate({ edge });
    };

    const handleEdgeUnselected = ({ edge }: { edge: CustomEdge }) => {
      edge.removeTools();
      this.graph?.getNodes().forEach((itemNode) => {
        this.triggerPortVisibility(itemNode as CustomNode, false);
      });
      this.graph?.off('edge:change:target', handleEdgeTargetChange);
      this.graph?.off('edge:change:source', handleEdgeSourceChange);
      this.graph?.off('edge:connected', handleEdgeConnected);
      this.graph?.off('edge:mousedown', handleEdgeMousedown);
      this.graph?.off('edge:unselected', handleEdgeUnselected);
    };

    // 判断是否具备高亮能力
    if (
      this.abilityIsEnable(EditorAbility.EdgeVertexAdd) ||
      this.abilityIsEnable(EditorAbility.EdgeVertexDel) ||
      this.abilityIsEnable(EditorAbility.EdgeVertexMove)
    ) {
      edge.addTools([
        {
          name: 'vertices',
          args: {
            attrs: { fill: '#ffffff', stroke: edge.link?.stroke },
            stopPropagation: false,
          },
        },
        {
          name: 'segments',
          args: {
            attrs: { fill: '#ffffff', stroke: edge.link?.stroke },
            stopPropagation: false,
          },
        },
      ]);
      this.graph?.on('edge:mousedown', handleEdgeMousedown);
    }
    if (this.abilityIsEnable(EditorAbility.EdgeHeadMove)) {
      edge.addTools([
        {
          name: 'source-arrowhead',
          args: {
            attrs: { fill: '#ffffff', stroke: edge.link?.stroke, d: generateCirclePath(6) },
          },
        },
        {
          name: 'target-arrowhead',
          args: {
            attrs: { fill: '#ffffff', stroke: edge.link?.stroke, d: generateCirclePath(6) },
          },
        },
      ]);
      this.graph?.on('edge:change:target', handleEdgeTargetChange);
      this.graph?.on('edge:change:source', handleEdgeSourceChange);
      this.graph?.on('edge:connected', handleEdgeConnected);
    }
    this.graph?.on('edge:unselected', handleEdgeUnselected);
  }
}

export default EditorService;
