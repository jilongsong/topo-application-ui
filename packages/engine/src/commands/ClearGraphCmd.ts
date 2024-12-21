import App from '../app';
import { BaseCmd, Cmd } from '../types';

export default class ClearGraphCmd extends BaseCmd<Cmd.ClearGraph> {
  constructor(context: App, options: Cmd.ClearGraph) {
    super(context, options);
  }

  public async execute(): Promise<void> {
    this.options.project = this.context.project.toJSON();
    this.context.clearGraph();
  }
  public async undo(): Promise<void> {
    this.options.project && this.context.resetProject(this.options.project);
  }
}
