import { MComponent } from '@topo/schema';

export interface MInput extends MComponent {
  options: Record<string, any>;
  value: string;
  placeholder: string;
  disabled: boolean;
  checkStrictly: boolean;
  label: string;
  labelWidth: string | number;
  hiddenLabel: boolean;
  labelPosition: 'left' | 'top';
  labelAlignment: 'start' | 'end' | 'center';
}
