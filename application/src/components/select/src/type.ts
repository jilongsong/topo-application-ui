import { MComponent } from '@topo/schema';

export interface Columns {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface MSelect extends MComponent {
  columns: Columns[];
  value: any;
  placeholder: string;
  disabled: boolean;
  multiple: boolean;
  label: string;
  labelWidth: string | number;
  hiddenLabel: boolean;
  labelPosition: 'left' | 'top';
  labelAlignment: 'start' | 'end' | 'center';
  validation: Record<string, any>[];
}
