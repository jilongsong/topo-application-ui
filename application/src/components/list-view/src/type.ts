import { MContainer } from '@topo/schema';

export interface MListView extends MContainer {
  type: 'listView';
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
