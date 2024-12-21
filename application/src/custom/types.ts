import { MVertex } from '@gmct/schema';

export interface ElementGroup {
  group: string;
  vertexes: MVertex[];
}

export interface CustomNode {
  group: string;
  vertex: MVertex;
}
