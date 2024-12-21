import { MComponent } from '@topo/schema';

export interface MInput extends MComponent {
  type: string;
  value: string;
  placeholder: string;
  clearable: boolean;
  disabled: boolean;
  showWordLimit: boolean;
  maxlength: number;
  minlength: number;
  prefixText: string;
  suffixText: string;
  label: string;
  labelWidth: string | number;
  hiddenLabel: boolean;
  labelPosition: 'left' | 'top';
  labelAlignment: 'start' | 'end' | 'center';
  validation: Record<string, any>[];
}
