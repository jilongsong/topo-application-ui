import { MComponent } from '@topo/schema';

export interface MGradeOption {
  min: number;
  max: number;
  color: string;
}

export interface MGradeMap extends MComponent {
  name: string;
  options: MGradeOption[];
  divideNum: number;
  divideWidth: number;
  divideBackground: string;
}
