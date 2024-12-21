import { MComponent } from '@topo/schema';

export interface LevelOption {
  label: string;
  value: number;
  status: string | number;
}

export interface colorsStop {
  color: string;
  offset?: number;
}

export interface MColorChart extends MComponent {
  colors: colorsStop[];
  rangeMin: number;
  rangeMax: number;
  step: number;
  showValue: boolean;
  showCur: boolean;
  dataSource: LevelOption[];
}
