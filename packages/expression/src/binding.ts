import { computed, ref, watch } from 'vue';
import * as _ from 'lodash-es';

import { ExpressionParser } from './parser';

type Expression = {
  expression: string;
  condition?: string;
  fallback?: any;
};

type DependencyInfo = {
  variables: Set<string>; // Variables used in the expression
  functions: Set<string>; // Functions called in the expression
};

export class ExpressionBinding {
  private readonly dependencyCache = new Map<string, DependencyInfo>();

  constructor(private readonly parse: ExpressionParser) {}

  /**
   * Extract dependencies using a more sophisticated approach
   */
  private extractDependencies(expression: string): DependencyInfo {
    if (this.dependencyCache.has(expression)) {
      return this.dependencyCache.get(expression)!;
    }

    const dependencies: DependencyInfo = {
      variables: new Set(),
      functions: new Set(),
    };

    // 提取数组访问带条件的依赖 (如 items[.id == 3])
    const arrayIndexWithConditionMatches = expression.matchAll(/([a-zA-Z_$][0-9a-zA-Z_$]*)(\[[^\]]+\])/g);

    for (const match of arrayIndexWithConditionMatches) {
      const arrayName = match[1]; // 提取数组名称 (如 items)
      dependencies.variables.add(arrayName);
    }

    // 提取一般变量 (如 employee.first)
    const variableMatches = expression.matchAll(
      /(?:\b([a-zA-Z_$][0-9a-zA-Z_$]*(?:\.[a-zA-Z_$][0-9a-zA-Z_$]*)*)\b)(?!\()/g
    );

    for (const match of variableMatches) {
      const token = match[1];
      // 排除关键字和数字
      if (!/^(true|false|null|undefined|NaN|\d+)$/.test(token)) {
        dependencies.variables.add(token);
      }
    }

    // 提取函数调用 (如 max(), min())
    const functionMatches = expression.matchAll(/([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g);
    for (const match of functionMatches) {
      const funcName = match[1];
      if (!/^(max|min|sqrt)$/.test(funcName)) {
        dependencies.functions.add(funcName);
      }
    }

    // 提取管道符函数 (如 | transform)
    const pipeMatches = expression.matchAll(/\|(\s*[a-zA-Z_$][0-9a-zA-Z_$]*)/g);
    for (const match of pipeMatches) {
      const transformName = match[1].trim();
      dependencies.functions.add(transformName);
    }

    this.dependencyCache.set(expression, dependencies);
    return dependencies;
  }

  /**
   * Normalize expression input
   */
  private normalizeExpression(exp: string | Expression): Expression {
    if (typeof exp === 'string') {
      return { expression: exp };
    }
    return exp;
  }

  /**
   * Bind an expression to a Vue watch with advanced Jexl support
   */
  public bindExpression = (exp: string | Expression, callback: (value: any) => void): (() => void) => {
    const { expression, condition, fallback } = this.normalizeExpression(exp);

    // Extract dependencies
    const dependenciesInfo = this.extractDependencies(expression);
    const conditionDependenciesInfo = condition
      ? this.extractDependencies(condition)
      : { variables: new Set<string>(), functions: new Set<string>() };

    // Watch dependencies
    const dependencies = Array.from(new Set([...dependenciesInfo.variables, ...conditionDependenciesInfo.variables]));

    // Create a reactive reference to trigger watch
    const dependencyRefs = dependencies.map((dep) => {
      // Use lodash get to handle nested properties
      const value = ref(_.get(this.parse.context, dep));

      // Watch the original context for changes
      watch(
        () => _.get(this.parse.context, dep),
        (newVal) => {
          value.value = newVal;
        },
        {
          deep: true,
          immediate: true,
        }
      );

      return value;
    });

    const stop = watch(
      () => dependencyRefs.map((ref) => ref.value),
      async () => {
        try {
          // Check condition if exists
          const conditionMet = condition ? await this.parse.eval(condition) : true;

          if (conditionMet) {
            const result = await this.parse.eval(expression);
            callback(result);
          } else if (fallback) {
            callback(fallback);
          }
        } catch (error) {
          console.error('Expression evaluation error:', error);
          callback(fallback);
        }
      },
      { flush: 'post', immediate: true, deep: true }
    );

    return stop;
  };

  /**
   * Create a computed property based on a Jexl expression
   */
  public computedExpression = <T = any>(exp: string | Expression) => {
    const { expression, condition, fallback } = this.normalizeExpression(exp);

    return computed({
      get: async () => {
        try {
          const conditionMet = condition ? await this.parse.eval(condition) : true;

          if (conditionMet) {
            return (await this.parse.eval(expression)) as T;
          } else {
            return fallback as T;
          }
        } catch (error) {
          console.error('Computed expression error:', error);
          return fallback as T;
        }
      },
      set: () => undefined,
    });
  };

  /**
   * Add a custom transform to Jexl
   */
  public addTransform(name: string, fn: (...args: any[]) => any) {
    this.parse.addTransform(name, fn);
  }

  /**
   * Add a custom function to Jexl
   */
  public addFunction(name: string, fn: (...args: any[]) => any) {
    this.parse.addFunction(name, fn);
  }
}

export default ExpressionBinding;
