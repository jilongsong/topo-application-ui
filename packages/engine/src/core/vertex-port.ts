import { MVertexPort, PortEnergyType, PortTnodeIo, Tag } from '@topo/schema';

import { Link } from './link';
import { Vertex } from './vertex';

export interface VertexPortOptions {
  port: MVertexPort;
  vertex: Vertex;
}

export class VertexPort implements MVertexPort {
  public id: string;
  public tnodeName: string;
  public tnodeCode: string;
  public virtual?: 0 | 1 | undefined;
  public needCon: 0 | 1;
  public label?: string | undefined;
  public tnodeIo: PortTnodeIo;
  public energyType: PortEnergyType;
  public descr: string;
  public position: { refX: number; refY: number };

  public vertex: Vertex;
  public link?: Link;

  constructor(options: VertexPortOptions) {
    this.vertex = options.vertex;
    const { id, tnodeName, tnodeCode, virtual, needCon, label, tnodeIo, energyType, descr, position } = options.port;

    this.id = id;
    this.tnodeName = tnodeName;
    this.tnodeCode = tnodeCode;
    this.virtual = virtual;
    this.needCon = needCon;
    this.label = label;
    this.tnodeIo = tnodeIo;
    this.energyType = energyType;
    this.descr = descr;
    this.position = typeof position === 'string' ? JSON.parse(position) : position || { refX: 0, refY: 0 };
  }

  public setLink(link: Link): void {
    if (this.link) {
      console.warn(`${this.id}该端点存在连线`);
    }
    this.link = link;
  }

  public removeLink(): void {
    this.link = void 0;
  }

  public toJSON(): MVertexPort {
    const { id, tnodeName, tnodeCode, needCon, label, tnodeIo, energyType, descr, position } = this;
    return {
      id,
      tnodeName,
      tnodeCode,
      virtual: [Tag.Equipment, Tag.Pipe].includes(this.vertex.tag) ? 0 : 1,
      needCon,
      label,
      tnodeIo,
      energyType,
      descr,
      position,
    };
  }
}
