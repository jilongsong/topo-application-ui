import { Shape } from '@antv/x6';

import { Link } from '../core';

interface Metadata {
  id: string;
  stroke?: string;
  strokeWidth?: string;
  strokeDasharray?: number;
  link?: Link;
  zIndex?: number;
}

export class CustomEdge extends Shape.Edge {
  public link?: Link;
  public isTargetChange: boolean = false;
  public isSourceChange: boolean = false;

  constructor(metadata: Link | Metadata) {
    super({
      id: metadata.id,
      zIndex: metadata.zIndex,
    });
    this.link = metadata instanceof Link ? metadata : metadata.link;
    if (this.link) {
      this.setSource({ cell: this.link.source.vertex.id, port: this.link.source.port });
      this.setTarget({ cell: this.link.target.vertex.id, port: this.link.target.port });
      this.setVertices(this.link.vertices ?? []);
    }
    this.refreshEdgeStyle();
  }

  public refreshEdgeStyle() {
    if (this.link?.isRunning) {
      if (this.link?.isReverse) {
        this.setAttrByPath(['wrap', 'style', 'animation'], 'running-line-reverse 30s infinite linear');
      } else {
        this.setAttrByPath(['wrap', 'style', 'animation'], 'running-line 30s infinite linear');
      }
    } else {
      this.setAttrByPath(['wrap', 'style', 'animation'], '');
    }
  }
}

CustomEdge.config({
  markup: {
    tagName: 'g',
    selector: 'container',
    children: [
      {
        tagName: 'path',
        selector: 'wrap',
        groupSelector: 'lines',
      },
      {
        tagName: 'path',
        selector: 'line',
        groupSelector: 'lines',
      },
    ],
  },
  attrs: {
    wrap: {
      connection: true,
      stroke: 'var(--fill)',
      strokeWidth: 'var(--fillWidth)',
      strokeDasharray: 'var(--strokeDasharray)',
      strokeLinecap: 'round',
      fill: 'none',
      style: {
        animation: '',
      },
    },
    line: {
      fill: 'none',
      stroke: 'var(--stroke)',
      connection: true,
      strokeWidth: 'var(--strokeWidth)',
      strokeLinecap: 'round',
      opacity: 'var(--strokeOpacity)',
    },
  },
});

export default CustomEdge;
