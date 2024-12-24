import { FieldType, PanelConfig } from '@topo/panel';

export const canvasConfig: PanelConfig = {
  fields: {
    gridType: {
      type: FieldType.Enum,
      options: ['none', 'dot', 'fixedDot', 'mesh'],
      optionTitles: ['无', '点', '固定点', '网格'],
      label: '网格类型',
    },
    gridColor: {
      type: FieldType.Color,
      label: '网格颜色',
    },
    gridSize: {
      type: FieldType.Number,
      label: '网格大小',
    },
  },
};

export const nodeConfig: PanelConfig = {
  fields: {
    width: {
      type: FieldType.Number,
      label: '宽度',
    },
    height: {
      type: FieldType.Number,
      label: '高度',
    },
    ports: {
      type: FieldType.Array,
      label: '端口',
      field: {
        type: FieldType.Object,
        hideLabel: true,
        fields: {
          tnodeName: {
            type: FieldType.String,
            label: '端口名称',
          },
          tnodeCode: {
            type: FieldType.String,
            label: '端口编码',
          },
          descr: {
            type: FieldType.String,
            label: '端口描述',
            displayTextArea: true,
          },
        },
      },
    },
  },
};

export const edgeConfig: PanelConfig = {
  fields: {
    isReverse: {
      type: FieldType.Boolean,
      label: '反向',
      enabledTitle: '是',
      disableTitle: '否',
    },
    isRunning: {
      type: FieldType.Boolean,
      label: '流动',
      enabledTitle: '是',
      disableTitle: '否',
    },
  },
};
