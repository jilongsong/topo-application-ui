import { SquareDashedBottomIcon, SquareIcon } from '@topo/icon';
import { FieldType } from '@topo/panel';
export const baseStyleConfig = () => {
  return {
    position: {
      type: FieldType.Enum,
      label: '定位',
      options: ['absolute', 'relative', 'fixed', 'static', 'sticky'],
      optionTitles: ['绝对定位', '相对定位', '固定定位', '无定位', '粘性定位'],
      value: 'absolute',
    },
    positionCompound: {
      type: FieldType.Position,
      label: '位置',
      valueKeys: ['top', 'right', 'bottom', 'left'],
      valueLabels: ['T', 'R', 'B', 'L'],
    },
    width: {
      type: FieldType.Number,
      label: '宽度',
    },
    height: {
      type: FieldType.Number,
      label: '高度',
    },
    paddingCompound: {
      type: FieldType.FusedNumber,
      label: '内间距',
      toggleKey: 'perSide',
      toggleTitles: ['Padding', 'Padding pre side'],
      toggleTitleIcons: [SquareIcon, SquareDashedBottomIcon],
      valueKeys: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      valueLabels: ['T', 'R', 'B', 'L'],
      min: 0,
    },
    marginCompound: {
      type: FieldType.FusedNumber,
      label: '外间距',
      toggleKey: 'perSide',
      toggleTitles: ['margin', 'margin pre side'],
      toggleTitleIcons: [SquareIcon, SquareDashedBottomIcon],
      valueKeys: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      valueLabels: ['T', 'R', 'B', 'L'],
      min: 0,
    },
  };
};

export const fontStyleConfig = () => {
  return {
    fontSize: {
      type: FieldType.Number,
      label: '字体大小',
    },
    fontWeight: {
      type: FieldType.Enum,
      label: '字体粗细',
      options: ['normal', 'bold', 'bolder', 'lighter'],
      optionTitles: ['正常', '粗体', '更粗', '更细'],
    },
    fontFamily: {
      type: FieldType.Enum,
      label: '字体',
      options: [
        'Arial',
        'Verdana',
        'Helvetica',
        'Tahoma',
        'Trebuchet MS',
        'Times New Roman',
        'Georgia',
        'Courier New',
        'Lucida Console',
        'Monaco',
        'Comic Sans MS',
        'Impact',
        'Palatino Linotype',
        'Garamond',
        'Segoe UI',
        'sans-serif',
        'serif',
        'monospace',
        'cursive',
        'fantasy',
      ],
      optionTitles: [
        'Arial',
        'Verdana',
        'Helvetica',
        'Tahoma',
        'Trebuchet MS',
        '新罗马字体',
        'Georgia',
        'Courier New（等宽字体）',
        'Lucida Console',
        'Monaco（等宽字体）',
        'Comic Sans MS（手写体）',
        'Impact（粗体）',
        'Palatino Linotype',
        'Garamond',
        'Segoe UI',
        '无衬线体',
        '衬线体',
        '等宽字体',
        '手写体',
        '幻想体',
      ],
      value: 'serif',
    },
  };
};

export const borderStyleConfig = () => {
  return {
    borderWidth: {
      type: FieldType.Number,
      label: '边框宽度',
    },
    borderStyle: {
      type: FieldType.Enum,
      label: '边框样式',
      options: ['solid', 'dashed', 'dotted', 'double'],
      optionTitles: ['实线', '虚线', '点线', '双线'],
    },
    borderColor: {
      type: FieldType.Color,
      label: '边框颜色',
    },
    borderRadius: {
      type: FieldType.Number,
      label: '圆角',
    },
  };
};

export const boxShadowStyleConfig = () => {
  return {
    boxShadow: {
      type: FieldType.Enum,
      label: '阴影',
      options: [
        '0 1px 3px rgba(0, 0, 0, 0.1)',
        '0 4px 6px rgba(0, 0, 0, 0.1)',
        '0 10px 15px rgba(0, 0, 0, 0.2)',
        '0 20px 25px rgba(0, 0, 0, 0.3)',
        '0 25px 50px rgba(0, 0, 0, 0.4)',
      ],
      optionTitles: ['无', '小阴影', '中等阴影', '大阴影', '最大阴影'],
    },
  };
};
