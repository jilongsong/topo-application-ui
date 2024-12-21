import { get } from 'lodash-es';
import * as monaco from 'monaco-editor';

import functionDocs from './function-docs.json';

export class JexlCompletionProvider implements monaco.languages.CompletionItemProvider {
  triggerCharacters?: string[] | undefined;

  constructor(private contexts: Record<string, any>) {
    this.triggerCharacters = ['.', '|', '(']; // 允许触发补全的字符
  }

  private getDynamicSuggestions(
    inputValue: string,
    context: Record<string, any>,
    range: monaco.IRange
  ): monaco.languages.CompletionItem[] {
    const parts = inputValue.split('.');
    if (parts.length === 1) {
      return Object.keys(context).map((key) => ({
        label: key,
        kind: monaco.languages.CompletionItemKind.Field,
        insertText: key,
        documentation: `${key} 的值`,
        detail: `类型: ${typeof get(context, key)}`,
        range,
      }));
    }

    const parentPath = parts.slice(0, -1).join('.');
    const parentValue = get(context, parentPath);

    if (parentValue == null) {
      return [];
    }

    const currentPrefix = parts[parts.length - 1];
    const suggestions: monaco.languages.CompletionItem[] = [];

    if (typeof parentValue === 'object') {
      if (Array.isArray(parentValue)) {
        if ('length'.startsWith(currentPrefix)) {
          suggestions.push({
            label: 'length',
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: 'length',
            documentation: '数组长度',
            detail: `类型: number，当前值: ${parentValue.length}`,
            range,
          });
        }

        parentValue.forEach((_, index) => {
          const key = `[${index}]`;
          if (key.startsWith(currentPrefix)) {
            suggestions.push({
              label: key,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: key,
              documentation: `索引 ${index} 的值`,
              detail: `类型: ${typeof parentValue[index]}，值: ${JSON.stringify(parentValue[index])}`,
              range,
            });
          }
        });
      } else {
        Object.entries(parentValue).forEach(([key, value]) => {
          if (key.startsWith(currentPrefix)) {
            suggestions.push({
              label: key,
              kind:
                typeof value === 'function'
                  ? monaco.languages.CompletionItemKind.Function
                  : monaco.languages.CompletionItemKind.Field,
              insertText: key,
              documentation: `${key} 的值`,
              detail: `类型: ${Array.isArray(value) ? 'Array' : typeof value}，值: ${JSON.stringify(value)}`,
              range,
            });
          }
        });
      }
    }

    return suggestions;
  }

  private getTransformSuggestions(range: monaco.IRange): monaco.languages.CompletionItem[] {
    return Object.entries(functionDocs).map(([funcName, funcDoc]) => ({
      label: funcName,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: funcName, // 不加括号
      documentation: {
        value: [
          `**${funcDoc.description}**\n`,
          '**Parameters:**',
          ...funcDoc.params.map((p) => `- \`${p.name}\`: ${p.type}\n  ${p.description || ''}`),
          `\n**Returns:** ${funcDoc.returns.type}\n  ${funcDoc.returns.description || ''}`,
          funcDoc.example ? `\n**Example:**\n\`\`\`\n${funcDoc.example}\n\`\`\`` : '',
        ].join('\n'),
      },
      detail: funcDoc.description,
      range,
    }));
  }

  private getFunctionSuggestions(range: monaco.IRange): monaco.languages.CompletionItem[] {
    return Object.entries(functionDocs).map(([funcName, funcDoc]) => ({
      label: funcName,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${funcName}()`,
      documentation: {
        value: [
          `**${funcDoc.description}**\n`,
          '**Parameters:**',
          ...funcDoc.params.map((p) => `- \`${p.name}\`: ${p.type}\n  ${p.description || ''}`),
          `\n**Returns:** ${funcDoc.returns.type}\n  ${funcDoc.returns.description || ''}`,
          funcDoc.example ? `\n**Example:**\n\`\`\`\n${funcDoc.example}\n\`\`\`` : '',
        ].join('\n'),
      },
      detail: funcDoc.description,
      range,
    }));
  }

  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ): monaco.languages.ProviderResult<monaco.languages.CompletionList> {
    const wordInfo = model.getWordUntilPosition(position);
    const wordRange: monaco.IRange = {
      startLineNumber: position.lineNumber,
      startColumn: wordInfo.startColumn,
      endLineNumber: position.lineNumber,
      endColumn: wordInfo.endColumn,
    };

    const textBeforeCursor = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    if (textBeforeCursor.includes('|')) {
      // 如果出现了管道运算符，提供 Transform 提示
      return {
        suggestions: this.getTransformSuggestions(wordRange),
      };
    } else {
      // 提供函数提示（无论是否有括号）
      const match = textBeforeCursor.match(/[\w.]+$/);
      const currentPath = match ? match[0] : '';
      const suggestions = this.getDynamicSuggestions(currentPath, this.contexts, wordRange);

      // 如果字母输入，则提供函数补全提示
      if (/^[a-zA-Z]$/.test(textBeforeCursor.slice(-1))) {
        return {
          suggestions: [
            ...suggestions,
            ...this.getFunctionSuggestions(wordRange), // 继续提供函数补全
          ],
        };
      }

      return {
        suggestions,
      };
    }
  }
}
