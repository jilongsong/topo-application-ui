import { MContainer } from '@topo/schema';

export interface MGridView extends MContainer {
  type: 'gridView';
  property: {
    dataSource: any[];
    value: string;
    isChoose: boolean;
    multipleSelect: boolean;
  };
  style: {
    [key: string]: any;
  };
  items: MContainer[];
}
