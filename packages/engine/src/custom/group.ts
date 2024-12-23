import { isSVG } from '@topo/utils';

import { Vertex } from '../core';
import { NodeMetadata } from '../types';

import { CustomNode } from './node';

export class CustomGroup extends CustomNode {
  private collapsed: boolean = false;

  constructor(metadata: Vertex | NodeMetadata) {
    super(metadata);
    this.toggleCollapsed(this.vertex.isCollapsed);

    const { markup, attrs } = CustomGroup.getMarkupAndAttrs(this.vertex.tag);
    this.setMarkup(markup);
    this.setAttrs(attrs);
  }

  public isCollapsed(): boolean {
    return this.collapsed;
  }

  public toggleCollapsed(collapsed?: boolean) {
    const target = collapsed === undefined ? !this.collapsed : collapsed;
    if (target) {
      this.setAttrByPath(['buttonSign'], { d: 'M 1 5 9 5 M 5 1 5 9' });
      this.collapsed = Boolean(target);
      this.resize(this.vertex.expandWidth ?? 400, this.vertex.expandHeight ?? 400);
      this.setAttrByPath(['buttonGroup'], { visibility: 'hidden' });
    } else {
      this.setAttrByPath('buttonSign', { d: 'M 2 5 8 5' });
      this.collapsed = Boolean(target);
      this.resize(this.vertex.width, this.vertex.height);
      this.setProp('originSize', this.getSize);
      this.setAttrByPath(['body'], { visibility: 'visible' });
    }
    this.emit('change:collapsed' as any, { cell: this });
  }

  static getMarkupAndAttrs(shape: string = 'rect') {
    switch (shape) {
      case 'circle':
        return {
          markup: [
            {
              tagName: 'g',
              selector: 'circle',
              children: [
                {
                  tagName: 'ellipse',
                  selector: 'body',
                },
                {
                  tagName: 'image',
                  selector: 'image',
                },
                {
                  tagName: 'text',
                  selector: 'label',
                },
              ],
            },
          ],
          attrs: {
            body: {
              stroke: 'var(--nodeStroke)',
              strokeOpacity: 'var(--nodeOpacity)',
              fill: '#ffffff',
              fillOpacity: 'var(--nodeOpacity)',
              refRx: '50%',
              refRy: '50%',
              refCx: '50%',
              refCy: '50%',
              style: {
                pointerEvents: 'auto',
              },
            },
            image: {
              refWidth: 1,
              refHeight: 1,
            },
            label: {
              fill: 'var(--color)',
              fillOpacity: 'var(--colorOpacity)',
              textAnchor: 'middle',
              fontSize: 'var(--fontSize)',
              refX: 0.5,
              refY: 0.999,
            },
          },
        };
      default: // 默认是矩形
        return {
          markup: [
            {
              tagName: 'g',
              selector: 'container',
              children: [
                {
                  tagName: 'rect',
                  selector: 'body',
                },
                {
                  tagName: 'image',
                  selector: 'image',
                },
                {
                  tagName: 'text',
                  selector: 'label',
                },
              ],
            },
          ],
          attrs: {
            body: {
              stroke: 'var(--nodeStroke)',
              strokeOpacity: 'var(--nodeOpacity)',
              fill: 'var(--nodeFill)',
              fillOpacity: 'var(--nodeOpacity)',
              refWidth: 1,
              refHeight: 1,
              style: {
                pointerEvents: 'auto',
              },
            },
            image: {
              refWidth: 1,
              refHeight: 1,
            },
            label: {
              fill: 'var(--color)',
              fillOpacity: 'var(--colorOpacity)',
              textAnchor: 'middle',
              fontSize: 'var(--fontSize)',
              refX: 0.5,
              refY: 0.999,
            },
          },
        };
    }
  }
}

CustomGroup.config({
  markup: [
    {
      tagName: 'g',
      selector: 'container',
      children: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
          selector: 'image',
        },
        {
          tagName: 'g',
          selector: 'svg',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
        {
          tagName: 'g',
          selector: 'buttonGroup',
          children: [
            {
              tagName: 'rect',
              selector: 'button',
              attrs: {
                'pointer-events': 'visiblePainted',
              },
            },
            {
              tagName: 'path',
              selector: 'buttonSign',
              attrs: {
                fill: 'none',
                'pointer-events': 'none',
              },
            },
          ],
        },
      ],
    },
  ],
  attrs: {
    body: {
      refWidth: 1,
      refHeight: 1,
      fill: 'var(--nodeFill)',
      fillOpacity: 'var(--nodeFillOpacity)',
      stroke: 'var(--nodeStroke)',
      strokeWidth: 'var(--fillWidth)',
      strokeOpacity: 'var(--nodeStrokeOpacity)',
      color: 'var(--color)',
      colorOpacity: 'var(--colorOpacity)',
      fontSize: 'var(--fontSize)',
    },
    buttonGroup: {
      refX: 8,
      refY: 8,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: '#f5f5f5',
      stroke: '#ccc',
      cursor: 'pointer',
      event: 'node:click:collapse',
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: '#808080',
    },
    image: {
      refWidth: 0.4,
      refHeight: 0.4,
    },
    label: {
      fill: 'var(--color)',
      fillOpacity: 'var(--colorOpacity)',
      fontSize: 'var(--fontSize)',
      textAnchor: 'middle',
      refX: 0.5,
      refY: 0.999,
    },
  },
  attrHooks: {
    html: {
      set(val: any, { elem, refBBox, cell }: { elem: Element; refBBox: any; cell: any }) {
        if (typeof val !== 'string') {
          val = `${val}`;
        }
        if (!isSVG(val)) {
          elem.innerHTML = '';
          return;
        }
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(val, 'image/svg+xml').documentElement;
        if (!svgDoc.getAttribute('viewBox')) {
          svgDoc.setAttribute(
            'viewBox',
            `0 0 ${svgDoc.getAttribute('width')?.replace('px', '')} ${svgDoc.getAttribute('height')?.replace('px', '')}`
          );
        }
        if ((cell as CustomGroup).isCollapsed()) {
          svgDoc.setAttribute('width', `${refBBox.width}`);
          svgDoc.setAttribute('height', `${refBBox.height * 0.9}`);
        } else {
          svgDoc.setAttribute('width', `${25}`);
          svgDoc.setAttribute('height', `${25 * 0.9}`);
          svgDoc.setAttribute('x', `${refBBox.width - 25}`);
          svgDoc.setAttribute('y', `0`);
        }
        if (elem.lastChild) {
          elem.removeChild(elem.lastChild);
        }
        elem.appendChild(svgDoc);
      },
    },
  },
});

export default CustomGroup;
