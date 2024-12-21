import type { Component, InputHTMLAttributes } from 'vue';
import type { ZodAny } from 'zod';

import { Icon } from '@topo/icon';

import { INPUT_COMPONENTS } from './config';

export enum FieldType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
  Object = 'object',
  Array = 'array',
  Enum = 'enum',
  Date = 'date',
  FusedNumber = 'fusedNumber',
  FusedString = 'fusedString',
  Color = 'color',
  ResponsiveImage = 'responsiveImage',
  File = 'file',
  Font = 'font',
  SliderNumber = 'sliderNumber',
  Position = 'position',
  Code = 'code',
  JEXL = 'jexl',
}

export type ObjectPropertyFieldConfig =
  | NumberFieldConfig
  | EnumFieldConfig
  | BooleanFieldConfig
  | StringFieldConfig
  | ColorFieldConfig
  | ResponsiveImageFieldConfig
  | FileFieldConfig
  | ArrayFieldConfig
  | ObjectFieldConfig
  | FusedNumberFieldConfig<any>
  | FusedStringFieldConfig<any>
  | DateFieldConfig
  | SliderNumberFieldConfig
  | PositionFieldConfig<any>
  | CodeFieldConfig
  | JEXLFieldConfig;

export type ArrayItemFieldConfig =
  | Omit<NumberFieldConfig, 'hidden' | 'description'>
  | Omit<EnumFieldConfig, 'hidden' | 'description'>
  | Omit<BooleanFieldConfig, 'hidden' | 'description'>
  | Omit<StringFieldConfig, 'hidden' | 'description'>
  | Omit<ColorFieldConfig, 'hidden' | 'description'>
  | Omit<ResponsiveImageFieldConfig, 'hidden' | 'description'>
  | Omit<FileFieldConfig, 'hidden' | 'description'>
  | Omit<ObjectFieldConfig, 'hidden' | 'description'>
  | Omit<DateFieldConfig, 'hidden' | 'description'>
  | Omit<SliderNumberFieldConfig, 'hidden' | 'description'>
  | Omit<CodeFieldConfig, 'hidden' | 'description'>
  | Omit<JEXLFieldConfig, 'hidden' | 'description'>;

export interface Dependency<T> {
  source: string[];
  effect: (sourceFieldValues: any[], currentFieldValue: any, fieldName: string) => T | Promise<T>;
}

export type Dynamic<T> = T | Dependency<T>;

export interface ContainerLayoutConfig {
  /**
   * 布局类型
   */
  type: 'grid' | 'flex' | 'flow';

  /**
   * 网格布局配置
   */
  grid?: {
    columns?: number;
    gap?: string | number;
    rowGap?: string | number;
    columnGap?: string | number;
    /**
     * 自动放置算法
     * dense: 尝试填充网格中较早的空单元格
     * sparse: 按照源码顺序放置
     */
    autoFlow?: 'dense' | 'sparse';
    /**
     * 网格区域配置
     * key: 区域名称
     * value: 区域位置 [列开始, 列结束, 行开始, 行结束]
     * 例如: { header: [1, 4, 1, 2] } 表示 header 区域从第1列开始，跨越到第4列，从第1行开始，到第2行结束
     */
    areas?: Record<string, [number, number, number, number]>;
  };

  /**
   * 弹性布局配置
   */
  flex?: {
    direction?: 'row' | 'column';
    wrap?: boolean;
    gap?: string | number;
    alignItems?: 'start' | 'center' | 'end' | 'stretch';
    justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  };

  /**
   * 流式布局配置
   */
  flow?: {
    minWidth?: string | number;
    gap?: string | number;
  };
}

export interface BaseFieldConfig {
  type: FieldType;
  label?: Dynamic<string>;
  description?: string;
  hidden?: Dynamic<boolean>;
  disabled?: Dynamic<boolean>;
  required?: Dynamic<boolean>;
  validation?: Dynamic<ZodAny>;
  hideLabel?: boolean;
  component?: keyof typeof INPUT_COMPONENTS | Component;
  inputProps?: InputHTMLAttributes;
  controlled?: ObjectFieldConfig;
  /**
   * 网格布局相关配置
   */
  grid?: {
    /**
     * 跨列数量
     */
    columnSpan?: number;
    /**
     * 跨行数量
     */
    rowSpan?: number;
    /**
     * 指定开始的列线
     */
    columnStart?: number | string;
    /**
     * 指定结束的列线
     */
    columnEnd?: number | string;
    /**
     * 指定开始的行线
     */
    rowStart?: number | string;
    /**
     * 指定结束的行线
     */
    rowEnd?: number | string;
    /**
     * 指定网格区域名称
     */
    area?: string;
  };
}

export interface BooleanFieldConfig extends BaseFieldConfig {
  type: FieldType.Boolean;
  defaultValue?: boolean;
  disableTitle?: string;
  enabledTitle?: string;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: FieldType.Number;
  defaultValue?: number;
  min?: Dynamic<number>;
  max?: Dynamic<number>;
  step?: Dynamic<number>;
  unit?: string;
}

export interface StringFieldConfig extends BaseFieldConfig {
  type: FieldType.String;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: Dynamic<number>;
  minLength?: Dynamic<number>;
  displayTextArea?: boolean;
  controlled?: ObjectFieldConfig;
}

export interface FusedNumberFieldConfig<P extends Record<string, any>> extends BaseFieldConfig {
  type: FieldType.FusedNumber;
  defaultValue?: Record<string, any>;
  min?: Dynamic<number>;
  max?: Dynamic<number>;
  toggleKey: keyof P;
  toggleTitles?: [string, string];
  toggleTitleIcons?: [Icon, Icon];
  valueKeys: [keyof P, keyof P, keyof P, keyof P];
  valueLabels?: [string, string, string, string];
}

export interface FusedStringFieldConfig<P extends Record<string, any>> extends BaseFieldConfig {
  type: FieldType.FusedString;
  defaultValue?: Record<string, any>;
  min?: Dynamic<number>;
  max?: Dynamic<number>;
  toggleKey: keyof P;
  toggleTitles?: [string, string];
  toggleTitleIcons?: [Icon, Icon];
  valueKeys: Array<keyof P> | [];
  valueLabels?: string[];
}

export interface PositionFieldConfig<P extends Record<string, any>> extends BaseFieldConfig {
  type: FieldType.Position;
  defaultValue?: Record<string, any>;
  min?: Dynamic<number>;
  max?: Dynamic<number>;
  toggleKey: keyof P;
  toggleTitles?: [string, string];
  toggleTitleIcons?: [Icon, Icon];
  valueKeys: [keyof P, keyof P, keyof P, keyof P];
  valueLabels?: [string, string, string, string];
}

export interface EnumFieldConfig extends BaseFieldConfig {
  type: FieldType.Enum;
  defaultValue?: string | boolean | number | null;
  options: Dynamic<(string | boolean | number | undefined | null)[]>;
  optionTitles?: Dynamic<string[]>;
  optionIcons?: Dynamic<Icon[]>;
  controlled?: ObjectFieldConfig;
}

export interface ColorFieldConfig extends BaseFieldConfig {
  type: FieldType.Color;
  defaultValue?: string;
  controlled?: ObjectFieldConfig;
}

export interface ResponsiveImageFieldConfig extends BaseFieldConfig {
  type: FieldType.ResponsiveImage;
  defaultValue?: string | File;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: FieldType.File;
  allowedFileTypes?: string[];
  defaultValue?: File;
}

export interface ObjectFieldConfig extends BaseFieldConfig {
  type: FieldType.Object;
  layout?: ContainerLayoutConfig;
  trigger?: Dynamic<ObjectFieldTrigger>;
  display?: 'flat' | 'popup';
  fields: {
    [key: string]: ObjectPropertyFieldConfig;
  };
  defaultValue?: {
    [key: string]: any;
  };
}

export type ObjectFieldTrigger = {
  title: string;
  description?: string;
};

export interface ArrayFieldConfig extends BaseFieldConfig {
  type: FieldType.Array;
  layout?: ContainerLayoutConfig;
  field: ArrayItemFieldConfig;
  defaultValue?: Dynamic<any[]>;
  max?: Dynamic<number>;
  addTitle?: string;
  removeTitle?: string;
  uneditable?: boolean;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: FieldType.Date;
  defaultValue?: string;
  placeholder?: string;
  locale?: string;
  controlled?: ObjectFieldConfig;
}

export interface FontFieldConfig extends BaseFieldConfig {
  type: FieldType.Font;
  controls?: 'basic' | 'extended';
  defaultFontType?: 'monospace' | 'sans-serif';
  defaultValue?: FontDefaultValue;
  displayTextAlignment?: boolean;
  displayFontSize?: boolean;
}

export interface FontDefaultValue {
  textAlign?: 'left' | 'right' | 'center';
  fontSize?: number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
}

export interface CodeFieldConfig extends BaseFieldConfig {
  type: FieldType.Code;
  contexts?: Dynamic<Record<string, any>[]>;
  language?: Dynamic<string>;
  theme?: Dynamic<string>;
  defaultValue?: string;
}

export interface JEXLFieldConfig extends BaseFieldConfig {
  type: FieldType.JEXL;
  context?: Dynamic<Record<string, any>>;
  theme?: 'light' | 'dark';
  defaultValue?: string;
}

export interface SliderNumberFieldConfig extends BaseFieldConfig {
  type: FieldType.SliderNumber;
  defaultValue?: number;
  min?: Dynamic<number>;
  max?: Dynamic<number>;
  step?: Dynamic<number>;
  controlled?: ObjectFieldConfig;
}

export type FieldConfig =
  | BaseFieldConfig
  | BooleanFieldConfig
  | NumberFieldConfig
  | StringFieldConfig
  | FusedNumberFieldConfig<any>
  | FusedStringFieldConfig<any>
  | EnumFieldConfig
  | ColorFieldConfig
  | ResponsiveImageFieldConfig
  | FileFieldConfig
  | ObjectFieldConfig
  | ArrayFieldConfig
  | DateFieldConfig
  | FontFieldConfig
  | SliderNumberFieldConfig
  | PositionFieldConfig<any>
  | CodeFieldConfig
  | JEXLFieldConfig;

export interface PanelConfig<ComponentProps = Record<string, any>> {
  layout?: ContainerLayoutConfig;
  fields: {
    [key in keyof ComponentProps]: FieldConfig;
  };
}

export interface FieldProps<T extends BaseFieldConfig> {
  fieldName: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: ZodAny;
  field: T;
}
