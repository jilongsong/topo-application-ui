import { DynamicType, MComponent } from '@topo/schema';

export interface MImg extends MComponent {
  type: 'img';
  property: {
    src?: DynamicType<string>;
    imageSource: 'url' | 'upload';
    alt?: string;
  };
}
