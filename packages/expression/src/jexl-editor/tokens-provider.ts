import * as monaco from 'monaco-editor';

export const jexlTokensProvider: monaco.languages.IMonarchLanguage = {
  defaultToken: 'invalid',
  tokenizer: {
    root: [
      [/\b(in|and|or|not|if|else|true|false|null)\b/, 'keyword'],
      // 标识符（变量）
      [/[a-zA-Z_]\w*/, 'identifier'],
      // Numbers
      [/\d*\.\d+([eE][-+]?\d+)?/, 'number.float'],
      [/\d+/, 'number'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/'([^'\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],

      // Operators
      [/[!<>=]=|[<>]|\+|-|\*|\/|\^|==|!=/, 'operator'],

      // Keywords
      [/\b(in|and|or|not)\b/, 'keyword'],

      // Identifiers
      [/[a-zA-Z_]\w*/, 'identifier'],

      // Whitespace
      [/[ \t\r\n]+/, 'white'],

      // Punctuation
      [/[{}()[\]]/, '@brackets'],
      [/[,.]/, 'delimiter'],
    ],

    string_double: [
      [/[^\\"]+/, 'string'],
      [/"/, 'string', '@pop'],
      [/\\./, 'string.escape'],
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/'/, 'string', '@pop'],
      [/\\./, 'string.escape'],
    ],
  },
};
