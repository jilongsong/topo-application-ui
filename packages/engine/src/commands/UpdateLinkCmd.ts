import App from '../app';
import { BaseCmd, Cmd } from '../types';

export class UpdateLinkCmd extends BaseCmd<Cmd.UpdateLink> {
  constructor(context: App, options: Cmd.UpdateLink) {
    super(context, options);
  }

  public async execute(): Promise<void> {
    this.context.updateLink(this.options.newLink);
  }

  public async undo(): Promise<void> {
    this.context.updateLink(this.options.oldLink);
  }
}

export default UpdateLinkCmd;
