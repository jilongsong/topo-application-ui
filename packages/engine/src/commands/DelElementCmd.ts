import { MLink, MVertex } from '@topo/schema';

import App from '../app';
import { BaseCmd, Cmd } from '../types';
import { isLink, isVertex } from '../util';

export default class DelElementCmd extends BaseCmd<Cmd.DelElement> {
  constructor(context: App, options: Cmd.DelElement) {
    super(context, options);
    const links = new Map<string, MLink>();
    this.options.element.forEach((el) => {
      if (isVertex(el)) {
        const element = el as MVertex;
        this.context.project.getVertexRelations(element).forEach((link) => {
          links.set(link.id, link.toJSON());
        });
      }
    });
    this.options.links = [];
  }

  public async execute(): Promise<void> {
    const { element } = this.options;
    element.forEach((el) => {
      if (isVertex(el)) {
        this.context.removeVertex(el as MVertex);
      } else if (isLink(el)) {
        this.context.removeLink(el as MLink);
      }
    });
  }

  public async undo(): Promise<void> {
    const { element } = this.options;
    element.forEach((el) => {
      if (isVertex(el)) {
        const vertex = el as MVertex;
        this.context.addVertex(vertex);
      } else if (isLink(el)) {
        const link = el as MLink;
        this.context.addLink(link);
      }
    });
    this.options.links?.forEach((link) => this.context.addLink(link));
  }
}
