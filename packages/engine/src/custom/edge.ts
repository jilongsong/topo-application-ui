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
    this.setRouter({
      name: 'manhattan',
    });

    if (this.link) {
      this.setSource({ cell: this.link.source.vertex.id, port: this.link.source.port });
      this.setTarget({ cell: this.link.target.vertex.id, port: this.link.target.port });
      this.setVertices(this.link.vertices ?? []);
    }
    // 线条流动配置
    // this.setAttrByPath(['line', 'strokeDasharray'], 5);
    // this.setAttrByPath(['line', 'style', 'animation'], 'running-line 30s infinite linear');
  }
}

const generateArrowPath = (width: number, height: number): string => `M 0 ${-height / 2} ${width} 0 0 ${height / 2} z`;

CustomEdge.config({
  markup: [
    {
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
        {
          tagName: 'path',
          groupSelector: 'arrow',
          selector: 'middleArrow',
        },
      ],
    },
  ],
  attrs: {
    wrap: {
      cursor: 'pointer',
      fill: 'none',
      stroke: 'transparent',
      strokeLineCap: 'round',
    },
    line: {
      fill: 'none',
      'pointer-events': 'none',
      stroke: 'var(--stroke)',
      strokeWidth: 'var(--strokeWidth)',
      strokeOpacity: 'var(--strokeOpacity)',
      strokeDasharray: 'var(--strokeDasharray)',
      targetMarker: {
        name: 'block',
        fill: 'none',
      },
    },
    arrow: {
      d: generateArrowPath(12, 10),
      fill: 'var(--stroke)',
      fillOpacity: 'var(--strokeOpacity)',
      stroke: 'var(--stroke)',
      strokeOpacity: 'var(--strokeOpacity)',
      pointerEvents: 'none',
    },
    middleArrow: {
      atConnectionRatio: 0.5,
    },
  },
});

export default CustomEdge;
