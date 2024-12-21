import { Id, MLinkPoint } from '@topo/schema';

import Vertex from './vertex';

interface LinkPointOptions {
  vertex: Vertex;
  port: Id;
}

export class LinkPoint {
  public vertex: Vertex;
  public port: Id;

  constructor(options: LinkPointOptions) {
    this.port = options.port;
    this.vertex = options.vertex;
  }

  public toJSON(): MLinkPoint {
    return {
      vertex: this.vertex.id,
      tag: this.vertex.tag,
      port: this.port,
    };
  }
}

export default LinkPoint;
