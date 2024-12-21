import { EventEmitter } from 'events';

import * as _ from 'lodash-es';
import * as monaco from 'monaco-editor';
import { type editor } from 'monaco-editor';

import { JexlCompletionProvider } from './completions-provider';
import { JexlHoverProvider } from './hover-provider';
import { jexlLanguageConfiguration } from './jexl-configuration';
import { dark, light } from './theme';
import { jexlTokensProvider } from './tokens-provider';
import { JexlValidator } from './validator';

const context = {};

function initializeJexlLanguage() {
  if (!monaco.languages.getLanguages().some((lang) => lang.id === 'jexl')) {
    monaco.editor.defineTheme('dark', dark);
    monaco.editor.defineTheme('light', light);
    // 注册语言
    monaco.languages.register({ id: 'jexl' });
    // 配置语言特性
    monaco.languages.setLanguageConfiguration('jexl', jexlLanguageConfiguration);
    monaco.languages.setMonarchTokensProvider('jexl', jexlTokensProvider);
    // 注册补全提供器
    monaco.languages.registerCompletionItemProvider('jexl', new JexlCompletionProvider(context));
    // 注册悬浮提示器
    monaco.languages.registerHoverProvider('jexl', new JexlHoverProvider(context));
  }
}

initializeJexlLanguage();

export type JexlEditorOptions = editor.IStandaloneEditorConstructionOptions & {
  theme?: 'dark' | 'light';
  context?: Record<string, any>;
};

export class JexlEditor extends EventEmitter {
  private editor: editor.IStandaloneCodeEditor | null = null;
  private validator: JexlValidator;

  constructor(private options: JexlEditorOptions) {
    super();
    _.merge(context, options.context);
    // 创建验证器实例
    this.validator = new JexlValidator(this.options.context);
  }

  public mount(container: HTMLDivElement): void {
    if (this.editor) {
      console.warn('Editor is already mounted.');
      return;
    }
    // 创建编辑器实例
    this.editor = monaco.editor.create(container, { ...this.options, language: 'jexl' });
    // 添加验证
    this.setupValidation();
  }

  public setContext(context: Record<string, any>): void {
    _.merge(context, this.options.context);
    this.options.context = context;
    this.validator = new JexlValidator(context);
  }

  private setupValidation() {
    let validateTimeout: NodeJS.Timeout;

    this.editor?.onDidChangeModelContent(() => {
      // 清除之前的验证标记
      monaco.editor.setModelMarkers(this.editor?.getModel()!, 'jexl', []);

      // 防抖处理验证
      clearTimeout(validateTimeout);
      validateTimeout = setTimeout(async () => {
        if (!this.editor) {
          return;
        }
        const expression = this.editor.getValue();
        const result = await this.validator.validate(expression);

        if (!result.isValid) {
          monaco.editor.setModelMarkers(this.editor.getModel()!, 'jexl', [
            {
              severity: monaco.MarkerSeverity.Error,
              message: result.error || '表达式无效',
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: expression.length + 1,
            },
          ]);
        } else {
          this.emit('change', this.getValue());
        }
      }, 500);
    });
  }

  public getValue(): string {
    return this.editor?.getValue() ?? '';
  }

  public setValue(value: string): void {
    this.editor?.setValue(value);
  }

  public dispose(): void {
    this.editor?.dispose();
  }
}
