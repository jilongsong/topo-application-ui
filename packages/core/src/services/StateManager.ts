import { reactive } from 'vue';
import * as _ from 'lodash-es';

import { Expression } from '@topo/schema';

import { isExpression } from '../utils/props';

export class StateManager {
  public readonly state: Record<string, any> = reactive({});

  public getState<T>(path: string, defaultValue?: T): T {
    return _.get<typeof this.state, string, T | undefined>(this.state, path, defaultValue);
  }

  public setState<T>(path: string, value: T, bindExpression?: (value: Expression) => void): T {
    if (isExpression(value)) {
      _.set(this.state, path, value.expression);
      bindExpression?.(value);
      return this.getState(path);
    }

    if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          this.setState(`${path}.${key}`, value[key]);
        }
      }
    } else {
      _.set(this.state, path, value);
    }

    return this.getState(path);
  }

  public deleteState(path: string): void {
    _.unset(this.state, path);
  }
}
