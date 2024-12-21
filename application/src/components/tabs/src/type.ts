import { MComponent } from '@topo/schema';

export interface MTabsOption {
  label: string | number;
  value: string | number;
}

export interface MTabs extends MComponent {
  active: string;
  stretch: boolean;
  color: string;
  selectedColor: string;
}
