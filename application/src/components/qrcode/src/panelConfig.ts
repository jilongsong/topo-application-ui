import { FieldType, PanelConfig } from '@topo/panel';

import { baseStyleConfig } from '../../../configs';

import { MQrcode } from './type';

export const property: PanelConfig<MQrcode['property']> = {
  fields: {
    content: {
      type: FieldType.String,
      label: '内容',
    },
  },
};

export const style: PanelConfig<MQrcode['style']> = {
  fields: {
    ...baseStyleConfig(),
    color: {
      type: FieldType.Color,
      label: '颜色',
      defaultValue: '#000000',
    },
    bg: {
      type: FieldType.Color,
      label: '背景色',
      defaultValue: '#ffffff',
    },
  },
};

export default { property, style };
