<script setup lang="ts">
import { SquareDashedBottomIcon, SquareIcon } from '@topo/icon';
import { FieldType, Panel, PanelConfig } from '@topo/panel';
import { DynamicType } from '@topo/schema';
import { ScrollArea } from '@topo/ui';

interface User {
  code?: string;
  name: string;
  age: number;
  br?: string;
  height?: number;
  state?: boolean;
  image?: string;
  education?: string;
  mother?: User;
  color?: string;
  size?: number;
  dynamic?: DynamicType<string>;
  padding?: {
    value: number;
    paddingPerSide: boolean;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
  };
  position?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  children?: {
    name: string;
    age: number;
  }[];
}

const defaultUser: Partial<User> = {
  name: '张三',
  age: 18,
  state: true,
  br: '1990-01-01',
  position: { top: 0, right: 0, bottom: 0, left: 0 },
  padding: { value: 333, paddingPerSide: true, paddingTop: 1, paddingRight: 4, paddingBottom: 3, paddingLeft: 3 },
  children: [
    {
      name: '王五',
      age: 5,
    },
  ],
  dynamic: {
    expression: '32323',
    condition: '32323',
    fallback: '32323',
  },
  // dynamic: '32323',
};

const config: PanelConfig<User> = {
  layout: {
    type: 'grid',
    grid: {
      columns: 3,
      gap: 16,
      areas: {
        code: [1, 3, 1, 3],
      },
    },
  },
  fields: {
    code: {
      type: FieldType.Code,
      label: '代码',
      grid: {
        area: 'code',
      },
      contexts: [
        {
          numbers: [1, 2, 3, 4, 5],
          strings: ['a', 'b', 'c'],
          items: [
            { id: 1, value: 10, metadata: { created: '2024-01-01' } },
            { id: 2, value: 20, metadata: { created: '2024-01-02' } },
          ],
          user: {
            profile: {
              name: 'John',
              age: 30,
              settings: {
                theme: 'dark',
                language: 'en',
              },
            },
          },
        },
      ],
    },
    dynamic: {
      type: FieldType.String,
      label: '动态值',
      controlled: {
        type: FieldType.Object,
        trigger: {
          source: ['dynamic.expression', 'dynamic.condition'],
          effect: ([expression, condition]) => {
            return {
              title: expression,
              description: condition ? `when ${condition}` : '',
            };
          },
        },
        fields: {
          expression: {
            type: FieldType.String,
            label: '表达式',
          },
          condition: {
            type: FieldType.String,
            label: '条件',
          },
          fallback: {
            type: FieldType.String,
            label: '默认值',
          },
        },
      },
    },
    padding: {
      type: FieldType.FusedNumber,
      label: 'Padding',
      toggleKey: 'paddingPerSide',
      toggleTitles: ['Padding', 'Padding pre side'],
      toggleTitleIcons: [SquareIcon, SquareDashedBottomIcon],
      valueKeys: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      valueLabels: ['T', 'R', 'B', 'L'],
      min: 0,
    },
    position: {
      type: FieldType.Position,
      label: 'Position',
      valueKeys: ['top', 'right', 'bottom', 'left'],
      valueLabels: ['T', 'R', 'B', 'L'],
    },
    color: {
      type: FieldType.Color,
      label: '颜色',
    },
    size: {
      type: FieldType.SliderNumber,
      label: '字体大小',
      min: 0,
      max: 1,
      step: 0.01,
    },
    name: {
      type: FieldType.String,
      label: '姓名',
    },
    age: {
      type: FieldType.Number,
      label: '年龄',
    },
    height: {
      type: FieldType.Number,
      label: '身高',
      max: {
        source: ['age'],
        effect: ([age]) => {
          return age > 18 ? 2.5 : 1.8;
        },
      },
      min: {
        source: ['age'],
        effect: ([age]) => {
          return age > 18 ? 1.5 : 1.3;
        },
      },
      step: 0.01,
    },
    education: {
      type: FieldType.Enum,
      label: '学历',
      options: {
        source: ['age'],
        effect: ([age]) => {
          return age > 18 ? ['本科', '硕士', '博士'] : ['小学', '初中', '高中', '大专'];
        },
      },
    },
    image: {
      type: FieldType.File,
      label: '头像',
    },
    br: {
      type: FieldType.Date,
      label: '生日',
      placeholder: '请选择生日',
    },
    state: {
      type: FieldType.Boolean,
      label: '婚姻',
      enabledTitle: '已婚',
      disableTitle: '未婚',
      defaultValue: false,
    },
    mother: {
      type: FieldType.Object,
      label: '母亲',
      description: '母亲信息',
      trigger: {
        source: ['mother.name', 'mother.age'],
        effect: ([name, age]) => {
          if (!name) {
            return {
              title: 'No Data',
            };
          }
          return {
            title: name,
            description: age ? `年龄：${age}岁` : '未填写',
          };
        },
      },
      layout: {
        type: 'grid',
        grid: {
          columns: 2,
          gap: 16,
        },
      },
      fields: {
        name: {
          type: FieldType.String,
          label: '姓名',
        },
        age: {
          type: FieldType.Number,
          label: '年龄',
        },
        color: {
          type: FieldType.Color,
          label: '颜色',
        },
      },
    },
    children: {
      type: FieldType.Array,
      label: '孩子',
      field: {
        type: FieldType.Object,
        hideLabel: true,
        trigger: {
          source: ['children[i].name'],
          effect: ([name]) => {
            return {
              title: name,
            };
          },
        },
        fields: {
          name: {
            type: FieldType.String,
            label: '姓名',
          },
          age: {
            type: FieldType.Number,
            label: '年龄',
          },
        },
      },
    },
  },
};
</script>

<template>
  <ScrollArea class="p-2 h-screen">
    <Panel
      class="w-full h-full"
      :panel-config="config"
      :default-values="defaultUser"
      @change="
        (v) => {
          console.log(v);
        }
      "
    />
  </ScrollArea>
</template>
