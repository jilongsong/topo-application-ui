import { MVertex } from '@topo/schema';

export interface ElementGroup {
  group: string;
  vertexes: MVertex[];
}

export interface CustomNode {
  group: string;
  vertex: MVertex;
}
