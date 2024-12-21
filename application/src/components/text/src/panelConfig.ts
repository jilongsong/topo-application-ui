import { Services } from '@topo/editor';
import { FieldType, PanelConfig } from '@topo/panel';

import { baseStyleConfig, fontStyleConfig } from '../../../configs';

import { MText } from './type';

export const property = (services: Services): PanelConfig<MText['property']> => {
  services.editorService.getApp().then(console.log);
  return {
    fields: {
      text: {
        type: FieldType.String,
        label: '文本',
        controlled: {
          type: FieldType.Object,
          trigger: {
            source: ['text.expression'],
            effect: ([expression]) => {
              return {
                title: expression,
              };
            },
          },
          fields: {
            expression: {
              type: FieldType.JEXL,
              label: '赋值',
              context: {
                source: [],
                effect: async () => {
                  const app = await services.editorService.getApp();
                  return app?.state ?? {};
                },
              },
            },
            condition: {
              type: FieldType.JEXL,
              label: '条件',
              context: {
                source: [],
                effect: async () => {
                  const app = await services.editorService.getApp();
                  return app?.state ?? {};
                },
              },
            },
          },
        },
      },
    },
  };
};

export const style: PanelConfig<MText['style']> = {
  fields: {
    ...baseStyleConfig(),
    ...fontStyleConfig(),
  },
};

export const event: PanelConfig<MText['event']> = { fields: {} };

export default {
  property,
  style,
  event,
};
