import * as monaco from 'monaco-editor';

export interface JexlCompletion {
  label: string;
  kind: monaco.languages.CompletionItemKind;
  detail?: string;
  documentation?: string;
  insertText: string;
}
