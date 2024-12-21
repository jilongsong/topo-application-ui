import App from '../app';
import { BaseCmd, Cmd } from '../types';

export class UpdateVertexCmd extends BaseCmd<Cmd.UpdateVertex> {
  constructor(context: App, options: Cmd.UpdateVertex) {
    super(context, options);
  }

  public async execute(): Promise<void> {
    this.context.updateVertex(this.options.newVertex);
  }

  public async undo(): Promise<void> {
    this.context.updateVertex(this.options.oldVertex);
  }
}

export default UpdateVertexCmd;
