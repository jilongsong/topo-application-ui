import { FieldType, PanelConfig } from '@topo/panel';

import { MPage } from './type';

export const property: PanelConfig<MPage['property']> = {
  fields: {
    title: {
      type: FieldType.String,
      label: '标题',
    },
  },
};

export const style: PanelConfig<MPage['style']> = {
  fields: {
    background: {
      type: FieldType.Color,
      label: '背景',
    },
  },
};

export const event: PanelConfig = { fields: {} };

export default {
  property,
  style,
  event,
};
