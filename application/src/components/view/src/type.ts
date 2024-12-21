import { MContainer } from '@topo/schema';
export interface MView extends MContainer {
  type: 'view';
  property: {
    value: string;
  };
  style: {
    [key: string]: any;
  };
  items: MContainer[];
}
