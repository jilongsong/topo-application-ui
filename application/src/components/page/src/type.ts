import { MContainer } from '@topo/schema';

export interface MPage extends MContainer {
  type: 'page';
  property: {
    title: string;
  };
  style: {
    background: string;
  };
}
