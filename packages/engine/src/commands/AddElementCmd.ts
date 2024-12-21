import { MElement, MLink, MVertex } from '@topo/schema';

import App from '../app';
import { BaseCmd, Cmd } from '../types';
import { guid, isLink, isVertex } from '../util';

export default class AddElementCmd extends BaseCmd<Cmd.AddElement> {
  public element: MElement;

  constructor(context: App, options: Cmd.AddElement) {
    super(context, options);
    this.element = options.element;
    if (!this.element.id) {
      this.element.id = guid();
    }
  }

  public async execute(): Promise<void> {
    if (isVertex(this.element)) {
      this.context.addVertex(this.element as MVertex);
    } else if (isLink(this.element)) {
      this.context.addLink(this.element as MLink);
    }
  }

  public async undo(): Promise<void> {
    if (isVertex(this.element)) {
      this.context.removeVertex(this.element as MVertex);
    } else if (isLink(this.element)) {
      this.context.removeLink(this.element as MLink);
    }
  }
}
