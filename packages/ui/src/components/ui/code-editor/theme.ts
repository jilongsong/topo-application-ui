import { editor } from 'monaco-editor';

export const dark: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'identifier.js', foreground: '61CFFF', fontStyle: 'normal' }, // 蓝色
    { token: 'literal.js', foreground: 'F78C6C' }, // 橙色
    { token: 'binaryExpression.js', foreground: 'A6E22E' }, // 绿色
    { token: 'unaryExpression.js', foreground: '66D9EF' }, // 青色
    { token: 'callExpression.js', foreground: 'F92672' }, // 红色
    { token: 'conditionalExpression.js', foreground: 'FD971F' }, // 橙色
    { token: 'logicalExpression.js', foreground: 'F8F8F2' }, // 白色
    { token: 'memberExpression.js', foreground: 'A6E22E' }, // 绿色
  ],
  colors: {
    'editor.background': '#282C34', // 背景色
    'editor.foreground': '#ABB2BF', // 默认字体颜色
    'editor.selectionBackground': '#3E4451', // 选中背景色
    'editor.lineHighlightBackground': '#2C313A', // 行高亮背景色
    'editorCursor.foreground': '#528BFF', // 光标颜色
  },
};

export const light: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'identifier.js', foreground: '005CC5', fontStyle: 'normal' }, // 蓝色
    { token: 'literal.js', foreground: 'D50000' }, // 红色
    { token: 'binaryExpression.js', foreground: '008000' }, // 绿色
    { token: 'unaryExpression.js', foreground: '007C92' }, // 青色
    { token: 'callExpression.js', foreground: 'D50000' }, // 红色
    { token: 'conditionalExpression.js', foreground: 'C77CFF' }, // 紫色
    { token: 'logicalExpression.js', foreground: '3E3E3E' }, // 深灰色
    { token: 'memberExpression.js', foreground: '008000' }, // 绿色
  ],
  colors: {
    'editor.background': '#FFFFFF', // 背景色
    'editor.foreground': '#383A42', // 默认字体颜色
    'editor.selectionBackground': '#D7D9D8', // 选中背景色
    'editor.lineHighlightBackground': '#FFFFFF', // 行高亮背景色
    'editorCursor.foreground': '#005CC5', // 光标颜色
  },
};
