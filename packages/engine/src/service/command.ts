import { BaseService, isSubclass } from '@topo/utils';

import App from '../app';
import { CmdNotRegisterError } from '../error';
import { BaseCmd, Cmd, CmdClass, CommandEventArgs, History } from '../types';

export class CommandService extends BaseService<CommandEventArgs> {
  public disabled?: boolean = false;

  private context: App;
  private commands: Record<string, CmdClass> = {};
  private undoStack: BaseCmd[] = [];
  private redoStack: BaseCmd[] = [];
  private idCounter: number = 0;
  private maxStackSize: number;

  constructor(context: App, maxStackSize: number = 500, disabled: boolean = false) {
    super();
    this.context = context;
    this.maxStackSize = maxStackSize;
    this.disabled = disabled;
  }

  public registerCommands<T extends BaseCmd>(commandClasses: CmdClass<T> | Array<CmdClass<T>>): void {
    if (!Array.isArray(commandClasses)) {
      commandClasses = [commandClasses];
    }
    commandClasses.forEach((commandClass) => {
      if (isSubclass(commandClass, BaseCmd)) {
        this.commands[commandClass.name] = commandClass;
      }
    });
  }

  public getCommandClass(command: BaseCmd | string): CmdClass {
    let result: CmdClass;
    if (command instanceof BaseCmd) {
      result = this.commands[command.name];
    } else {
      result = this.commands[command];
    }
    if (!result) {
      throw new CmdNotRegisterError(command);
    }
    return result;
  }

  public async execute<T extends Cmd.Options>(command: BaseCmd | string, options: T): Promise<void> {
    let executeCommand: BaseCmd;
    const Cmd = this.getCommandClass(command);
    if (command instanceof BaseCmd) {
      executeCommand = command;
    } else {
      executeCommand = new Cmd(this.context, options);
    }

    // 如果栈长度超过最大长度，则清空最早的命令
    if (this.undoStack.length >= this.maxStackSize) {
      this.undoStack.shift();
    }

    executeCommand.id = ++this.idCounter;

    await executeCommand.execute();
    executeCommand.executed = true;
    executeCommand.executeTime = new Date().getTime();
    this.undoStack.push(executeCommand);
    this.redoStack = [];
    this.emit('command:changed', {
      cmd: executeCommand,
      canRedo: this.canRedo(),
      canUndo: this.canUndo(),
    });
  }

  public undo(step: number = 1): BaseCmd | undefined {
    if (this.disabled) {
      return;
    }

    let command: BaseCmd | undefined;
    while (step) {
      if (this.undoStack.length > 0) {
        command = this.undoStack.pop();

        if (command) {
          command.undo();
          this.redoStack.push(command);
          this.emit('command:changed', {
            cmd: command,
            canRedo: this.canRedo(),
            canUndo: this.canUndo(),
          });
        }
      }
      --step;
    }
    return command;
  }

  public redo(step: number = 1): BaseCmd | undefined {
    if (this.disabled) {
      return;
    }
    let command: BaseCmd | undefined;
    while (step) {
      if (this.redoStack.length > 0) {
        command = this.redoStack.pop();
        if (command) {
          command.execute();
          this.undoStack.push(command);
          this.emit('command:changed', {
            cmd: command,
            canRedo: this.canRedo(),
            canUndo: this.canUndo(),
          });
        }
      }
      --step;
    }
    return command;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public jump(id: number): void {
    if (this.disabled) {
      return;
    }

    let command: BaseCmd | undefined =
      this.undoStack.length > 0 ? this.undoStack[this.undoStack.length - 1] : undefined;

    if (command === undefined || id > command.id) {
      command = this.redo();

      while (command !== undefined && id > command.id) {
        command = this.redo();
      }
    } else {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        command = this.undoStack[this.undoStack.length - 1];

        if (command === undefined || id === command.id) {
          break;
        }
        this.undo();
      }
    }

    this.emit('command:changed', {
      cmd: command,
      canRedo: this.canRedo(),
      canUndo: this.canUndo(),
    });
  }

  public clean(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.emit('command:cleaned', {
      canRedo: this.canRedo(),
      canUndo: this.canUndo(),
    });
  }

  public destroy(): void {
    this.clean();
    this.removeAllListeners();
  }

  public toJSON(): History {
    const history: History = {
      undoStack: [],
      redoStack: [],
    };

    for (const command of this.undoStack) {
      history.undoStack.push(command.toJSON());
    }
    for (const command of this.redoStack) {
      history.redoStack.push(command.toJSON());
    }

    return history;
  }

  public fromJSON(json: History): void {
    this.undoStack = [];
    this.redoStack = [];
    for (const commandJson of json.undoStack) {
      const Command: CmdClass = this.commands[commandJson.name];
      if (Command) {
        const command = new Command(this.context, commandJson.options);
        command.fromJSON(commandJson);
        this.undoStack.push(command);
        this.idCounter = Math.max(command.id, this.idCounter);
      }
    }

    for (const commandJson of json.redoStack) {
      const Command = this.commands[commandJson.name];
      if (Command) {
        const command = new Command(this.context, commandJson.options);
        command.fromJSON(commandJson);
        this.redoStack.push(command);
        this.idCounter = Math.max(command.id, this.idCounter);
      }
    }

    this.emit('command:changed', {
      cmd: this.undoStack[this.undoStack.length - 1],
      canRedo: this.canRedo(),
      canUndo: this.canUndo(),
    });
  }
}

export default CommandService;
