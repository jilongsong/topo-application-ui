import { Services } from '@topo/editor';
import { FieldType, getLastIndexIfArray, PanelConfig } from '@topo/panel';

import { MOverlay } from './type';

const property: PanelConfig<MOverlay['property']> = {
  fields: {
    disabled: {
      type: FieldType.Boolean,
      label: '禁用',
      disableTitle: '否',
      enabledTitle: '是',
    },
  },
};

const style: PanelConfig<MOverlay['style']> = {
  fields: {
    backgroundColor: {
      type: FieldType.Color,
      label: '背景色',
      defaultValue: 'rgba(0, 0, 0, 0.8)',
    },
  },
};

const event = (services: Services): PanelConfig<MOverlay['event']> => {
  return {
    fields: {
      onClick: {
        type: FieldType.Array,
        label: '点击时',
        field: {
          type: FieldType.Object,
          label: '点击时',
          hideLabel: true,
          trigger: {
            source: ['onClick[i].type', 'onClick[i].component', 'onClick[i].method'],
            effect: ([type, component, method]) => {
              if (type === 'controlComponent') {
                const node = services.editorService.getNodeById(component);

                return {
                  title: node?.name ?? '未选择',
                  description: node?.method.find((item) => item.method === method)?.label,
                };
              }
              return {
                title: '点击设置',
              };
            },
          },
          fields: {
            type: {
              type: FieldType.Enum,
              label: '动作',
              options: ['controlComponent', 'executor', 'navigate', 'showAlert', 'postMessage'],
              optionTitles: ['控制组件', '执行', '导航', '显示提示', '发送消息'],
            },
            component: {
              type: FieldType.String,
              label: '组件',
              component: 'ui',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'controlComponent',
              },
            },
            method: {
              type: FieldType.Enum,
              label: '方法',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'controlComponent',
              },
              options: {
                source: ['component'],
                effect: ([component]) => {
                  console.log('component', component);
                  const node = services.editorService.getNodeById(component);
                  return node?.method.map(({ method }) => method) ?? [];
                },
              },
              optionTitles: {
                source: ['component'],
                effect: ([component]) => {
                  const node = services.editorService.getNodeById(component);
                  return node?.method.map(({ label }) => label) ?? [];
                },
              },
            },
            mappings: {
              type: FieldType.Array,
              label: '参数',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'controlComponent',
              },
              uneditable: true,
              defaultValue: {
                source: ['component', 'method'],
                effect: ([component, method]) => {
                  const node = services.editorService.getNodeById(component);
                  return node?.method.find((item) => item.method === method)?.props.map(() => '') ?? [];
                },
              },
              field: {
                type: FieldType.Code,
                label: {
                  source: ['component', 'method'],
                  effect: ([component, method], _, fieldName) => {
                    const index = getLastIndexIfArray(fieldName);
                    if (index === void 0) {
                      return '';
                    }
                    const node = services.editorService.getNodeById(component);
                    return node?.method.find((item) => item.method === method)?.props?.[index] ?? '';
                  },
                },
                contexts: {
                  source: [],
                  effect: async () => {
                    const app = await services.editorService.getApp();
                    return (app?.state ?? []).map((state: any) => ({ [state.key]: state.value }));
                  },
                },
              },
            },
            executor: {
              type: FieldType.Enum,
              label: '执行器',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'executor',
              },
              options: {
                source: ['type'],
                effect: async () => {
                  return services.propsService.getExecutors().map(({ id }) => id);
                },
              },
              optionTitles: {
                source: ['type'],
                effect: async () => {
                  return services.propsService.getExecutors().map(({ name }) => name);
                },
              },
            },
            page: {
              type: FieldType.String,
              label: '页面',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'navigate',
              },
            },
            message: {
              type: FieldType.String,
              label: '消息',
              hidden: {
                source: ['type'],
                effect: ([type]) => type !== 'navigate',
              },
            },
          },
        },
      },
    },
  };
};

export default { property, style, event };
