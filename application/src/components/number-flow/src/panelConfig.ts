import { Services } from '@topo/editor';
import { FieldType, PanelConfig } from '@topo/panel';

import { baseStyleConfig, fontStyleConfig } from '../../../configs';

import { MNumberFlow } from './type';

export const property = (services: Services): PanelConfig<MNumberFlow['property']> => {
  services.editorService.getApp().then(console.log);
  return {
    fields: {
      value: {
        type: FieldType.Number,
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

export const style: PanelConfig<MNumberFlow['style']> = {
  fields: {
    ...baseStyleConfig(),
    ...fontStyleConfig(),
  },
};

export const event: PanelConfig<MNumberFlow['event']> = { fields: {} };

export default {
  property,
  style,
  event,
};
