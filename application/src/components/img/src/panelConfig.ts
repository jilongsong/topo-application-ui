import { Services } from '@topo/editor';
import { FieldType, PanelConfig } from '@topo/panel';

import { baseStyleConfig } from '../../../configs';

import { MImg } from './type';

export const property = (services: Services): PanelConfig<MImg['property']> => {
  services.editorService.getApp().then(console.log);
  return {
    fields: {
      src: {
        type: FieldType.String,
        label: '地址',
      },
      imageSource: {
        type: FieldType.Enum,
        label: '图片来源',
        options: ['url', 'upload'],
        optionTitles: ['URL', '上传'],
      },
      alt: {
        type: FieldType.String,
        label: '描述',
      },
    },
  };
};

export const style: PanelConfig<MImg['style']> = {
  fields: {
    ...baseStyleConfig(),
  },
};

export const event: PanelConfig<MImg['event']> = { fields: {} };

export default {
  property,
  style,
  event,
};
