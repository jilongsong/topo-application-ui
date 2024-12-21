<script lang="ts" setup>
import { Theme } from '@topo/core';
import { FieldType, Panel, PanelConfig } from '@topo/panel';

const theme = defineModel<Theme>('modelValue');

const config: PanelConfig<Theme> = {
  fields: {
    colors: {
      label: '颜色配置',
      type: FieldType.Object,
      layout: {
        type: 'grid',
        grid: {
          columns: 3,
        },
      },
      fields: {
        primary: {
          label: '主色',
          type: FieldType.Color,
        },
        secondary: {
          label: '次色',
          type: FieldType.Color,
        },
        success: {
          label: '成功色',
          type: FieldType.Color,
        },
        info: {
          label: '信息色',
          type: FieldType.Color,
        },
        warning: {
          label: '警告色',
          type: FieldType.Color,
        },
        danger: {
          label: '危险色',
          type: FieldType.Color,
        },
        backgroundPrimary: {
          label: '背景主色',
          type: FieldType.Color,
        },
        backgroundSecondary: {
          label: '背景次色',
          type: FieldType.Color,
        },
        backgroundElement: {
          label: '背景元素色',
          type: FieldType.Color,
        },
        backgroundBorder: {
          label: '背景边框色',
          type: FieldType.Color,
        },
        textPrimary: {
          label: '文本主色',
          type: FieldType.Color,
        },
        textInverted: {
          label: '文本反色',
          type: FieldType.Color,
        },
        shadow: {
          label: '阴影颜色',
          type: FieldType.Color,
        },
        focus: {
          label: '焦点色',
          type: FieldType.Color,
        },
        transparent: {
          label: '透明色',
          type: FieldType.Color,
        },
        backgroundLanding: {
          label: '背景底板色',
          type: FieldType.Color,
        },
        backgroundLandingBorder: {
          label: '背景底板边框色',
          type: FieldType.Color,
        },
        backgroundSidebar: {
          label: '侧边栏背景色',
          type: FieldType.Color,
        },
        accent: {
          label: '强调色',
          type: FieldType.Color,
        },
        muted: {
          label: '背景蒙版色',
          type: FieldType.Color,
        },
      },
    },
    spacing: {
      label: '间距配置',
      type: FieldType.Object,
      layout: {
        type: 'grid',
        grid: {
          columns: 3,
        },
      },
      fields: {
        xs: {
          label: '最小间距',
          type: FieldType.String,
        },
        sm: {
          label: '小间距',
          type: FieldType.String,
        },
        md: {
          label: '中间距',
          type: FieldType.String,
        },
        lg: {
          label: '大间距',
          type: FieldType.String,
        },
        xl: {
          label: '最大间距',
          type: FieldType.String,
        },
      },
    },
    radius: {
      label: '圆角配置',
      type: FieldType.Object,
      layout: {
        type: 'grid',
        grid: {
          columns: 3,
        },
      },
      fields: {
        none: {
          label: '无圆角',
          type: FieldType.String,
        },
        sm: {
          label: '小圆角',
          type: FieldType.String,
        },
        md: {
          label: '中圆角',
          type: FieldType.String,
        },
        lg: {
          label: '大圆角',
          type: FieldType.String,
        },
        xl: {
          label: '最大圆角',
          type: FieldType.String,
        },
      },
    },
    shadows: {
      label: '阴影配置',
      type: FieldType.Object,
      layout: {
        type: 'grid',
        grid: {
          columns: 3,
        },
      },
      fields: {
        none: {
          label: '无阴影',
          type: FieldType.String,
        },
        sm: {
          label: '小阴影',
          type: FieldType.String,
        },
        md: {
          label: '中阴影',
          type: FieldType.String,
        },
        lg: {
          label: '大阴影',
          type: FieldType.String,
        },
        xl: {
          label: '最大阴影',
          type: FieldType.String,
        },
      },
    },
  },
};

const handleChange = (value: any) => {
  theme.value = value;
};
</script>

<template>
  <Panel class="h-full w-full" :default-values="theme" :panel-config="config" @change="handleChange"></Panel>
</template>
