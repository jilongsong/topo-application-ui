import { MComponent } from '@topo/schema';

export interface MCheckboxOption {
  label: string;
  value: string;
  disabled: boolean;
  selected: boolean;
}
export interface MCheckbox extends MComponent {
  options: MCheckboxOption[];
  label: string;
  value: string[];
  disabled: boolean;
  labelWidth: string | number;
  hiddenLabel: boolean;
  labelPosition: 'left' | 'top';
  labelAlignment: 'start' | 'end' | 'center';
  adornments: 'row' | 'column';
}
