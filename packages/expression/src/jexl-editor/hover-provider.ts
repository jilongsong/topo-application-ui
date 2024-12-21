import { get } from 'lodash-es';
import * as monaco from 'monaco-editor';

import functionDocs from './function-docs.json';

export class JexlHoverProvider implements monaco.languages.HoverProvider {
  constructor(private contexts: Record<string, any>) {}

  private getDynamicHoverInfo(inputValue: string, context: Record<string, any>): monaco.languages.Hover | null {
    const parts = inputValue.split('.');
    let value: any;

    try {
      value = parts.length === 1 ? get(context, inputValue) : get(context, inputValue);
    } catch {
      return null;
    }

    if (value === undefined) {
      return null;
    }

    const hoverContents: monaco.IMarkdownString[] = [];

    // 值的类型信息
    const typeInfo = Array.isArray(value) ? 'Array' : typeof value;

    // 根据不同类型生成悬停信息
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        hoverContents.push({
          value: `**Type**: Array\n**Length**: ${value.length}\n**Content**: ${JSON.stringify(value.slice(0, 3))}${
            value.length > 3 ? '...' : ''
          }`,
        });
      } else {
        const keys = Object.keys(value);
        hoverContents.push({
          value: `**Type**: Object\n**Property Length**: ${keys.length}\n**Properties**: ${keys
            .slice(0, 5)
            .join(', ')}${keys.length > 5 ? '...' : ''}`,
        });
      }
    } else {
      hoverContents.push({
        value: `**Type**: ${typeInfo}\n**Value**: ${JSON.stringify(value)}`,
      });
    }

    return {
      contents: hoverContents,
    };
  }

  private getFunctionHoverInfo(funcName: string): monaco.languages.Hover | null {
    const funcDoc = (functionDocs as any)[funcName];
    if (!funcDoc) {
      return null;
    }

    const hoverContents: monaco.IMarkdownString[] = [
      {
        value: [
          `**${funcName}**\n`,
          `**Description**: ${funcDoc.description}\n`,
          '**Parameters**:',
          ...funcDoc.params.map((p: any) => `- \`${p.name}\`: ${p.type} - ${p.description || ''}`),
          `\n**Returns**: ${funcDoc.returns.type}\n  ${funcDoc.returns.description || ''}`,
          funcDoc.example ? `\n**Example**:\n\`\`\`\n${funcDoc.example}\n\`\`\`` : '',
        ].join('\n'),
      },
    ];

    return {
      contents: hoverContents,
    };
  }

  provideHover(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ): monaco.languages.ProviderResult<monaco.languages.Hover> {
    const wordAtPosition = model.getWordAtPosition(position);

    if (!wordAtPosition) {
      return null;
    }

    Object.keys(functionDocs).find((key) => key === wordAtPosition.word);
    if (Object.keys(functionDocs).find((key) => key === wordAtPosition.word)) {
      return this.getFunctionHoverInfo(wordAtPosition.word);
    }

    // 检查是否是上下文中的变量
    return this.getDynamicHoverInfo(wordAtPosition.word, this.contexts);
  }
}
