import { MExecutorConfig } from '@topo/schema';

import { App } from '../App';
import { handler } from '../executor';
import { ExecutorState } from '../type';

export class ExecutorManager {
  constructor(private readonly app: App) {}

  public initExecutor(executorConfig: MExecutorConfig): void {
    this.app.setState(`${executorConfig.id}`, {
      config: executorConfig,
      data: {},
      error: null,
      isLoading: false,
    });
  }

  public deleteExecutor(id: string): void {
    this.app.deleteState(id);
  }

  public getExecutor(id: string): ExecutorState {
    return this.app.getState(id);
  }

  public async runExecutor(id: string, payload: Record<string, any>): Promise<void> {
    const executor = this.getExecutor(id);
    executor.isLoading = true;
    await handler(
      { config: executor.config, props: payload },
      (data = {}) => {
        executor.data = data;
      },
      (error) => {
        executor.error = error as any;
      }
    );
    executor.isLoading = false;
  }
}

export default ExecutorManager;
