import { Jexl } from 'jexl';

import { UtilFunction } from './type';
import * as utils from './utils';

export class ExpressionParser {
  private jexl = new Jexl();

  constructor(public readonly context: Record<string, any>) {
    this.loadUtilFunctions(utils);
  }

  private loadUtilFunctions(functions: Record<string, UtilFunction>) {
    Object.entries(functions).forEach(([funName, fun]) => {
      if (fun.isFunction) {
        this.jexl.addFunction(funName, fun);
      }
      if (fun.isTransform) {
        this.jexl.addTransform(funName, fun);
      }
    });
  }

  eval(expression: string): Promise<any> {
    return this.jexl.eval(expression, this.context);
  }

  evalSync(expression: string): any {
    return this.jexl.evalSync(expression, this.context);
  }

  addTransform(name: string, fn: (...args: any[]) => any) {
    this.jexl.addTransform(name, fn);
  }

  addFunction(name: string, fn: (...args: any[]) => any) {
    this.jexl.addFunction(name, fn);
  }
}
