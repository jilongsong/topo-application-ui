import { Node } from '@antv/x6';

import { PortEnergyType } from '@topo/schema';
import { isSVG } from '@topo/utils';

import { PortEnergyTypeStyle } from '../constants';
import { Vertex } from '../core';
import { NodeMetadata } from '../types';
import { vertexMetadata } from '../util';
export class CustomNode extends Node {
  public vertex: Vertex;

  constructor(metadata: Vertex | NodeMetadata) {
    super(vertexMetadata(metadata));
    this.vertex = metadata instanceof Vertex ? metadata : metadata.vertex;

    if (this.vertex?.ports) {
      this.vertex.ports.forEach((port) => {
        this.addPort({
          id: port.id,
          group: 'relative',
          attrs: this.getNodePortAttrs(port.energyType)!,
          args: {
            refX: port.position?.refX || 0,
            refY: port.position?.refY || 0,
          },
        });
      });
    }
  }

  private getNodePortAttrs(energyType: PortEnergyType): Node['attrs'] {
    return {
      circle: PortEnergyTypeStyle[energyType] || {
        fill: '#fff',
        stroke: 'red',
      },
    };
  }

  public setContent(content: string): this {
    if (isSVG(content)) {
      this.setAttrByPath(['svg', 'html'], content);
    } else {
      this.setAttrByPath(['image', 'xlink:href'], content);
    }
    return this;
  }

  public setLabel(label: string): this {
    this.setAttrByPath(['label', 'text'], label);
    return this;
  }

  public triggerPortVisibility(portId: string, visible: boolean): this {
    this.setPortProp(portId, ['attrs', 'circle', 'style'], {
      visibility: visible ? 'visible' : 'hidden',
    });
    return this;
  }
}

CustomNode.config({
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
      ],
    },
  ],
  attrs: {
    body: {
      stroke: 'var(--nodeStroke)',
      strokeOpacity: 'var(--nodeStrokeOpacity)',
      fill: 'var(--nodeFill)',
      fillOpacity: 'var(--nodeFillOpacity)',
      refWidth: 1,
      refHeight: 0.9,
    },
    image: {
      refWidth: 1,
      refHeight: 0.9,
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
  attrHooks: {
    html: {
      set(val: any, node: any) {
        if (typeof val !== 'string') {
          val = `${val}`;
        }
        if (!isSVG(val)) {
          node.elem.innerHTML = '';
          return;
        }
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(val, 'image/svg+xml').documentElement;
        if (!svgDoc.getAttribute('viewBox')) {
          svgDoc.setAttribute('viewBox', `0 0 ${node.refBBox.width} ${node.refBBox.height * 0.9}`);
        }
        svgDoc.setAttribute('width', `${node.refBBox.width}`);
        svgDoc.setAttribute('height', `${node.refBBox.height * 0.9}`);

        if (node.elem.lastChild) {
          node.elem.removeChild(node.elem.lastChild);
        }
        node.elem.appendChild(svgDoc);
      },
    },
  },
});

export default CustomNode;
