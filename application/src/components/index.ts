const components = [
  'button',
  'input',
  'select',
  'charts',
  'checkbox',
  'container',
  'list-view',
  'grid-view',
  'scroll-view',
  'carousel',
  'img',
  'overlay',
  'page',
  'qrcode',
  'text',
  'number-flow',
  'video',
  'tabs',
  'pagination',
  'radio-group',
  'date-picker',
  'level-chart',
  'color-chart',
  'view',
  'table',
  'form',
  'switch',
  'proportion-chart',
  'annular',
  'indicator-light',
  'cascader',
  'collapse',
  'iframe',
  'pie-chart-3d',
  'progress',
  'step-list',
];

function smallCamelCase(str: string, suffix = ''): string {
  if (!str) return '';
  return (
    str
      .split(/-|_|\.|\//)
      .filter((value) => {
        return value && value.trim();
      })
      .map((value) => {
        return value.replace(/^\S/, (s) => s.toUpperCase());
      })
      .join('')
      .replace(/^\S/, (s) => s.toLowerCase()) + suffix
  );
}

export const exposes = components.reduce(
  (exposes, component) => ({
    ...exposes,
    [`./${smallCamelCase(component)}`]: `./src/components/${component}/index.ts`,
  }),
  {}
);

export default exposes;
