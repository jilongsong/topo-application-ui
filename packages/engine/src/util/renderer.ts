import { Graph } from '@antv/x6';

import { PortTnodeIo, Tag } from '@topo/schema';

import { DEFAULT_STYLE, Vertex } from '../core';
import { CustomEdge } from '../custom/edge';
import { CustomGroup } from '../custom/group';
import { CustomNode } from '../custom/node';

import { guid } from './uid';

export const defaultGraphOptions = (): Graph.Options => ({
  interacting: false,
  autoResize: true,
  scaling: {
    min: 0.01,
    max: 8,
  },
  mousewheel: {
    enabled: true,
    modifiers: ['ctrl'],
  },
  panning: {
    enabled: true,
    modifiers: ['ctrl'],
    eventTypes: ['leftMouseDown'],
  },
  background: {
    color: '#f2f7fa',
  },
  grid: {
    visible: true,
    type: 'fixedDot',
    args: {
      color: '#a0a0a0', // 网格线/点颜色
      thickness: 2, // 网格线宽度/网点大小
    },
  },
  embedding: {
    enabled: true,
    findParent({ node }: { node: any }) {
      const currentTag = node.vertex.tag;
      const groupTags = [Tag.System, Tag.Station, Tag.Unit];
      const bbox = node.getBBox();
      return this.getNodes().filter((targetNode) => {
        const targetBBox = targetNode.getBBox();
        if (targetBBox && bbox.isIntersectWithRect(targetBBox) && targetNode instanceof CustomGroup) {
          const parentTag = targetNode.vertex.tag;
          if (!groupTags.includes(currentTag)) {
            return true;
          }
          if (currentTag === Tag.Unit && groupTags.slice(0, 2).includes(parentTag)) {
            return true;
          }
          if (currentTag === Tag.Station && groupTags.slice(0, 1).includes(parentTag)) {
            return true;
          }
        } else {
          return false;
        }
      });
    },
  },
  highlighting: {
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#fff',
          stroke: '#31d0c6',
          strokeWidth: 4,
        },
      },
    },
    embedding: {
      name: 'stroke',
      args: {
        padding: -1,
        attrs: {
          stroke: '#73d13d',
        },
      },
    },
  },
  connecting: {
    snap: {
      radius: 20,
    },
    createEdge() {
      const edge = new CustomEdge({
        id: guid(),
      });
      edge.setAttrByPath(['container', 'style'], DEFAULT_STYLE);
      return edge;
    },
    validateConnection({ sourceCell, sourcePort, targetCell, targetPort }) {
      if (targetCell && sourceCell && sourcePort && targetPort) {
        return validateLink(sourceCell as CustomNode, sourcePort, targetCell as CustomNode, targetPort);
      }
      return false;
    },
  },
});

export const validateLink = (
  source: CustomNode | Vertex,
  sourcePort: string,
  target: CustomNode | Vertex,
  targetPort: string
): boolean => {
  let sourceVertex: Vertex | null = null;
  let targetVertex: Vertex | null = null;
  if (source instanceof Vertex) {
    sourceVertex = source;
  } else if (source.vertex) {
    sourceVertex = source.vertex;
  }
  if (target instanceof Vertex) {
    targetVertex = target;
  } else if (target.vertex) {
    targetVertex = target.vertex;
  }
  if (!sourceVertex || !targetVertex) {
    return false;
  }
  const sPort = sourceVertex.getPort(sourcePort);
  const tPort = targetVertex.getPort(targetPort);
  if (!sPort || !tPort) {
    // 如果起点或终点不存在，则连接关系不合法
    return false;
  }
  if (!sPort.link && tPort.link) {
    // 如果起点没有连接，但终点存在连接，则连接关系不合法
    return false;
  }
  if (sPort.link?.edge.isTargetChange && tPort.link) {
    // 如果正在改变终点，但终点存在连接，则连接关系不合法
    return false;
  }
  if (tPort.link?.edge.isSourceChange && sPort.link) {
    // 如果正在改变起点，但起点存在连接，则连接关系不合法
    return false;
  }
  if (sPort.energyType !== tPort.energyType) {
    // 如果起点的能源属性和终点的能源属性不一致，则连接关系不合法
    return false;
  }
  if (![PortTnodeIo.Out, PortTnodeIo.Normal].includes(sPort.tnodeIo)) {
    // 如果起点类型不是输出或通用类型，则连接关系不合法
    return false;
  }
  if (![PortTnodeIo.In, PortTnodeIo.Normal].includes(tPort.tnodeIo)) {
    // 如果终点类型不是输入或通用类型，则连接关系不合法
    return false;
  }
  return true;
};
