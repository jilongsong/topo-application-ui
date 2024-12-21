import { MComponent } from '@topo/schema';

export interface MProgress extends MComponent {
  blockCount: number;
  value: number;
}
