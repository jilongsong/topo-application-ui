import { MComponent } from '@topo/schema';

export interface MDatePicker extends MComponent {
  value: string;
  placeholder: string;
  format: string;
  dateType: 'year' | 'month' | 'date' | 'datetime';
  disabled: boolean;
  readonly: boolean;
  label: string;
  labelWidth: string | number;
  hiddenLabel: boolean;
  labelPosition: 'left' | 'top';
  labelAlignment: 'start' | 'end' | 'center';
  validation: Record<string, any>[];
}
