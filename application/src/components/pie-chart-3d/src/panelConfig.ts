export default () => [
  {
    title: '属性',
    labelWidth: '70px',
    items: [
      // 组件类型，必须要有
      {
        text: 'type',
        name: 'type',
        type: 'hidden',
      },
      {
        type: 'fieldset',
        legend: '通用属性',
        items: [
          // 组件id，必须要有
          {
            name: 'id',
            type: 'display',
            text: 'id',
          },
          {
            name: 'title',
            text: '标题',
          },
        ],
      },
      {
        type: 'fieldset',
        legend: '图象属性',
        items: [
          {
            text: '数据源',
            name: 'data',
            type: 'codeEditor',
            disabled: true,
            extra: '在多页面的情况下用来指定要打开的页面',
          },
          {
            name: 'verticalAngle',
            type: 'number',
            text: '水平角度',
            default: 35,
          },
          {
            name: 'horizontalAngle',
            type: 'number',
            text: '垂直角度',
            default: 35,
          },
        ],
      },
      {
        type: 'fieldset',
        legend: '图例配置',
        items: [
          {
            name: 'legendAlign',
            text: '水平',
            type: 'select',
            labelWidth: '60px',
            options: [
              {
                text: '居左',
                value: 'left',
              },
              {
                text: '居中',
                value: 'center',
              },
              {
                text: '居右',
                value: 'right',
              },
            ],
          },
          {
            name: 'legendVerticalAlign',
            text: '垂直',
            type: 'select',
            labelWidth: '60px',
            options: [
              {
                text: '顶部',
                value: 'top',
              },
              {
                text: '居中',
                value: 'middle',
              },
              {
                text: '居中',
                value: 'bottom',
              },
            ],
          },
          {
            name: 'legendLayout',
            text: '布局',
            type: 'select',
            labelWidth: '60px',
            options: [
              {
                text: '垂直',
                value: 'vertical',
              },
              {
                text: '水平',
                value: 'horizontal',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '样式',
    labelWidth: '70px',
    items: [
      {
        name: 'style',
        items: [
          {
            name: 'visibility',
            text: '可见性',
            type: 'select',
            options: [
              {
                value: 'inherit',
                text: '继承',
              },
              {
                value: 'visible',
                text: '显示',
              },
              {
                value: 'hidden',
                text: '隐藏',
              },
            ],
          },
          {
            type: 'fieldset',
            legend: '位置',
            items: [
              {
                name: 'left',
                text: '距左边',
              },
              {
                name: 'top',
                text: '距顶部',
              },
              {
                name: 'right',
                text: '距右边',
              },
              {
                name: 'bottom',
                text: '距底部',
              },
            ],
          },
          {
            type: 'fieldset',
            legend: '尺寸',
            items: [
              {
                name: 'width',
                text: '宽度',
              },
              {
                name: 'height',
                text: '高度',
              },
              {
                name: 'backgroundColor',
                text: '背景色',
                type: 'colorPicker',
              },
            ],
          },
        ],
      },
    ],
  },
];
