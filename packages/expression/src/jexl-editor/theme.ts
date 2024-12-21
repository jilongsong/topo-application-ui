import { editor } from 'monaco-editor';

export const dark: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'identifier', foreground: '61CFFF', fontStyle: 'normal' }, // 高亮标识符
    { token: 'number', foreground: 'D19A66' },
    { token: 'string', foreground: '98C379' },
    { token: 'keyword', foreground: 'E5C07B', fontStyle: 'bold' },
    { token: 'operator', foreground: 'C678DD' },
    { token: '@brackets', foreground: '56B6C2' },
    { token: 'delimiter', foreground: 'ABB2BF' },
  ],
  colors: {
    'editor.background': '#282C34',
    'editor.foreground': '#ABB2BF',
    'editor.selectionBackground': '#3E4451',
    'editor.lineHighlightBackground': '#2C313A',
    'editorCursor.foreground': '#528BFF',
  },
};

export const light: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'number.float', foreground: 'C18401' }, // 浮点数
    { token: 'number', foreground: 'C18401' }, // 整数
    { token: 'string', foreground: '50A14F' }, // 字符串
    { token: 'string.escape', foreground: '4078F2', fontStyle: 'italic' }, // 转义字符
    { token: 'string.invalid', foreground: 'E45649', fontStyle: 'underline' }, // 非法字符串
    { token: 'operator', foreground: '986801' }, // 运算符
    { token: 'keyword', foreground: '986801', fontStyle: 'bold' }, // 关键字
    { token: 'identifier', foreground: '0366D6' }, // 标识符（变量）
    { token: '@brackets', foreground: '4078F2' }, // 括号
    { token: 'delimiter', foreground: '383A42' }, // 分隔符
  ],
  colors: {
    'editor.background': '#FFFFFF', // 编辑器背景色（白色）
    'editor.foreground': '#383A42', // 默认字体颜色
    'editor.selectionBackground': '#D7D9D8', // 选中背景色
    'editor.lineHighlightBackground': '#FAFAFA', // 行高亮背景色
    'editorCursor.foreground': '#007ACC', // 光标颜色
  },
};
