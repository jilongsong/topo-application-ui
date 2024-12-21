import { MComponent } from '@topo/schema';

export interface MQrcode extends MComponent {
  type: 'qrcode';
  property: {
    content: string;
  };
  style: {
    [key: string]: any;
  };
}
