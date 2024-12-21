import { MComponent } from '@topo/schema';

export interface Mannular extends MComponent {
  activeColor?: string;
  defaultColor?: string;
  value: string;
  toFixed?: number;
  lineWidth?: number;
}
