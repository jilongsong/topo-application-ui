import { MContainer } from '@topo/schema';

export interface MScrollView extends MContainer {
  type: 'scrollView';
  property: {
    overflowX: 'hidden' | 'scroll' | 'auto';
    overflowY: 'hidden' | 'scroll' | 'auto';
  };
  style: {
    [key: string]: any;
  };
  items: MContainer[];
}
