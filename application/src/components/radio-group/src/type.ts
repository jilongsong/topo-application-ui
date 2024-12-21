import { MComponent } from '@topo/schema';

export interface MRadioGroupOption {
  label: string | number;
  value: string | number;
}

export interface MRadioGroup extends MComponent {
  name: string;
  active: string | number;
  layout: string;
  options: MRadioGroupOption[];
  color: string;
  selectedColor: string;
  backColor: string;
  selectedBackColor: string;
}
