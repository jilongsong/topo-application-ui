import { DynamicType, MComponent } from '@topo/schema';

export interface MText extends MComponent {
  type: 'text';
  property: {
    text?: DynamicType<string>;
  };
  style: {
    [key: string]: any;
  };
}
