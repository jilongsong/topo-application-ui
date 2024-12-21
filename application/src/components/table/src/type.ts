import type { CellStyle, ColumnStyle } from 'element-plus';

import { MComponent, MEvent } from '@topo/schema';

export type DataSource = string | Record<string, any>[];

export interface TableColumnItem {
  type: 'text' | 'button' | 'image';
  label: string;
  prop?: string;
  mappedValue?: string; // 支持handlebars表达式
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  events?: MEvent[];
  children?: TableColumnItem[];
}

export type Column = any;

export interface ImageColumn extends TableColumnItem {
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  alt?: string;
  preview?: boolean;
}

export interface ButtonColumn extends TableColumnItem {
  themeColor?: string;
  plain?: boolean;
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
}

export interface TextColumn extends TableColumnItem {
  ellipsis?: boolean;
}

export type MTableColumn = ImageColumn | ButtonColumn | TextColumn;

export interface MTable extends MComponent {
  border?: boolean;
  height: number;
  tableLayout: 'fixed' | 'auto';
  selection: boolean;
  dataSource: any;
  columns: MTableColumn[];
  headerStyle: CellStyle<any>;
  rowStyle: ColumnStyle<any>;
  direction: boolean;
  showHeader: boolean;
  highlightRowNum: number;
}
