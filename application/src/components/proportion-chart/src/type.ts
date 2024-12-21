import { MComponent } from '@topo/schema';

export interface MProportionOption {
  key: string | number;
  color: string;
  borderColor: string;
  description: string;
}

export interface MProportion extends MComponent {
  options: MProportionOption[];
  dataSource: { key: any }[];
}
