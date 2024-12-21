import { DynamicType, MComponent } from '@topo/schema';

export interface MNumberFlow extends MComponent {
  type: 'text';
  property: {
    value?: DynamicType<number>;
  };
  style: {
    [key: string]: any;
  };
}
