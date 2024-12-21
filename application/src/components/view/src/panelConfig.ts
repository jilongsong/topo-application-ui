import { Services } from '@topo/editor';
import { FieldType, PanelConfig } from '@topo/panel';

import { baseStyleConfig } from '../../../configs';

import { MView } from './type';
const property = (services: Services): PanelConfig<MView['property']> => {
  return {
    fields: {
      value: {
        type: FieldType.Enum,
        label: '默认视图',
        options: {
          source: ['id'],
          effect: () => {
            const node = services.editorService.state.node;
            return node?.items.map(({ id }: { id: string }) => id) ?? [];
          },
        },
        optionTitles: {
          source: ['id'],
          effect: () => {
            const node = services.editorService.state.node;
            return node?.items.map(({ name }: { name: string }) => name) ?? [];
          },
        },
        defaultValue: services.editorService.state.node?.items[0]?.id ?? '',
      },
    },
  };
};

const style: PanelConfig<MView['style']> = {
  fields: {
    ...baseStyleConfig(),
  },
};
export default { property, style };
