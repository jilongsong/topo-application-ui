import { MComponent } from '@topo/schema';

export interface MContainer extends MComponent {
  type: 'container';
  style: {
    [key: string]: any;
  };
}
