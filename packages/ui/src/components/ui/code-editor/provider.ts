// completionProvider.ts
import { get } from 'lodash-es';
import { type IDisposable, editor, languages, Position, Range } from 'monaco-editor';

export class EditorCompletionProvider {
  private static instance: EditorCompletionProvider | null = null;
  private disposable: IDisposable | null = null;
  private readonly contextMap: Map<string, Record<string, any>> = new Map();

  private constructor() {}

  static getInstance(): EditorCompletionProvider {
    if (!EditorCompletionProvider.instance) {
      EditorCompletionProvider.instance = new EditorCompletionProvider();
    }
    return EditorCompletionProvider.instance;
  }

  // 为特定编辑器实例注册上下文
  registerContext(editorId: string, context: Record<string, any>) {
    this.contextMap.set(editorId, context);
    this.initializeProviderIfNeeded();
  }

  // 移除特定编辑器实例的上下文
  removeContext(editorId: string) {
    this.contextMap.delete(editorId);
    // 如果没有任何活动的编辑器实例，清理提供程序
    if (this.contextMap.size === 0) {
      this.dispose();
    }
  }

  private getDynamicSuggestions(
    inputValue: string,
    context: Record<string, any>,
    range: Range
  ): languages.CompletionItem[] {
    const parts = inputValue.split('.');
    if (parts.length === 1) {
      return Object.keys(context).map((key) => ({
        label: key,
        kind: languages.CompletionItemKind.Field,
        insertText: key,
        documentation: `${key} 的值`,
        detail: `类型: ${typeof get(context, key)}`,
        range,
      }));
    }

    const parentPath = parts.slice(0, -1).join('.');
    const parentValue = get(context, parentPath);

    if (parentValue == null) return [];

    const suggestions: languages.CompletionItem[] = [];

    if (typeof parentValue === 'object') {
      if (Array.isArray(parentValue)) {
        suggestions.push({
          label: 'length',
          kind: languages.CompletionItemKind.Property,
          insertText: 'length',
          documentation: '数组长度',
          detail: `类型: number，当前值: ${parentValue.length}`,
          range,
        });

        parentValue.forEach((_, index) => {
          suggestions.push({
            label: `[${index}]`,
            kind: languages.CompletionItemKind.Field,
            insertText: `[${index}]`,
            documentation: `索引 ${index} 的值`,
            detail: `类型: ${typeof parentValue[index]}，值: ${JSON.stringify(parentValue[index])}`,
            range,
          });
        });
      } else {
        Object.entries(parentValue).forEach(([key, value]) => {
          suggestions.push({
            label: key,
            kind:
              typeof value === 'function' ? languages.CompletionItemKind.Function : languages.CompletionItemKind.Field,
            insertText: key,
            documentation: `${key} 的值`,
            detail: `类型: ${Array.isArray(value) ? 'Array' : typeof value}，值: ${JSON.stringify(value)}`,
            range,
          });
        });
      }
    }

    return suggestions;
  }

  private initializeProviderIfNeeded() {
    if (!this.disposable) {
      this.disposable = languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: (model: editor.ITextModel, position: Position) => {
          const word = model.getWordUntilPosition(position);
          const range = new Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);

          const textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          // 合并所有活动编辑器实例的上下文
          const mergedContext = Array.from(this.contextMap.values()).reduce(
            (acc, context) => ({ ...acc, ...context }),
            {}
          );

          return {
            suggestions: this.getDynamicSuggestions(textUntilPosition, mergedContext, range),
          };
        },
        triggerCharacters: ['.', '('],
      });
    }
  }

  dispose() {
    if (this.disposable) {
      this.disposable.dispose();
      this.disposable = null;
    }
    this.contextMap.clear();
  }
}
