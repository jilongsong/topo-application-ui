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
          columns: 2,
        },
      },
      fields: {
        accent: {
          label: '强调色',
          type: FieldType.Color,
        },
        secondary: {
          label: '次色',
          type: FieldType.Color,
        },
        primary: {
          label: 'primary',
          type: FieldType.Color,
        },
        success: {
          label: 'success',
          type: FieldType.Color,
        },
        info: {
          label: 'info',
          type: FieldType.Color,
        },
        warning: {
          label: 'warning',
          type: FieldType.Color,
        },
        danger: {
          label: 'danger',
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
        muted: {
          label: '背景蒙版色',
          type: FieldType.Color,
        },
      },
    },
    spacing: {
      label: '间距配置',
      type: FieldType.FusedString,
      valueKeys: ['xs', 'sm', 'md', 'lg', 'xl'],
      valueLabels: ['最小间距', '小间距', '中间距', '大间距', '最大间距'],
    },
    radius: {
      label: '圆角配置',
      type: FieldType.FusedString,
      valueKeys: ['none', 'sm', 'md', 'lg', 'full'],
      valueLabels: ['无', '小圆角', '中圆角', '大圆角', '最大圆角'],
    },
    shadows: {
      label: '阴影配置',
      type: FieldType.Object,
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
  console.log(value);
};
</script>

<template>
  <Panel class="h-full w-full" :default-values="theme" :panel-config="config" @change="handleChange"></Panel>
</template>
