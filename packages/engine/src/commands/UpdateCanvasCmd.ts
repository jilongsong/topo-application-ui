import App from '../app';
import { BaseCmd, Cmd } from '../types';

export class UpdateCanvasCmd extends BaseCmd<Cmd.UpdateCanvas> {
  constructor(context: App, options: Cmd.UpdateCanvas) {
    super(context, options);
    this.options.oldGrid = {};
  }

  public async execute(): Promise<void> {
    this.options.oldGrid = {
      gridType: this.context.project.gridType,
      gridColor: this.context.project.gridColor,
      gridSize: this.context.project.gridSize,
    };
    const { gridType, gridColor, gridSize } = this.options;
    this.context.updateGrid(gridType, gridColor, gridSize);
  }

  public async undo(): Promise<void> {
    const { gridType, gridColor, gridSize } = this.options.oldGrid;
    this.context.updateGrid(gridType, gridColor, gridSize);
  }
}

export default UpdateCanvasCmd;
