import { MElement, MLink, MVertex } from '@topo/schema';

import { Link, Project, Vertex } from '../core';

import { guid } from './uid';

export const COPY_STORAGE_KEY = '$topoContextCopyData';

export const KEYBOARD_SCOPE = '$topoContextDomElement';

/**
 * 生成默认的空项目
 *
 * @param id
 * @returns Project
 */
export const defaultProject = (id: string = guid()): Project =>
  new Project({
    id,
    name: 'Demo Empty',
    vertexes: [],
    links: [],
  });

/**
 * 判断结构是否为节点
 *
 * @param config MElement | MVertex | Vertex
 * @returns boolean
 */
export const isVertex = (config: MElement | MVertex | Vertex): boolean => {
  if (config instanceof Vertex) {
    return true;
  } else {
    const item = config as MVertex;
    return 'type' in item && 'tag' in item && typeof item.type === 'string' && typeof item.tag === 'string';
  }
};

/**
 * 判断结构是否为连线
 *
 * @param config MElement | MLink | Link
 * @returns boolean
 */
export const isLink = (config: MElement | MLink | Link): boolean => {
  if (config instanceof Link) {
    return true;
  } else {
    const item = config as MLink;
    return 'source' in item && 'target' in item && typeof item.source === 'object' && typeof item.target === 'object';
  }
};
