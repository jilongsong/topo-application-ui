import * as jexl from 'jexl';

export class JexlValidator {
  private jexlInstance: any;

  constructor(context: Record<string, any> = {}) {
    this.jexlInstance = new jexl.Jexl();
    // 注册自定义函数和上下文
    Object.entries(context).forEach(([key, value]) => {
      this.jexlInstance.addTransform(key, value);
    });
  }

  async validate(expression: string): Promise<{ isValid: boolean; error?: string }> {
    try {
      // 尝试编译表达式
      this.jexlInstance.compile(expression);
      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : '表达式无效',
      };
    }
  }
}
