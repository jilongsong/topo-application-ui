import { MComponent } from '@topo/schema';

export interface MPagination extends MComponent {
  pageSize: number;
  small: boolean;
  disabled?: boolean;
  background: boolean;
  backColor: string;
}
