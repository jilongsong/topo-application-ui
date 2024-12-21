import { MQrcode } from './type';

export default {
  id: '',
  type: 'qrcode',
  name: 'Text',
  property: {
    content: 'https://www.siact.cn/',
  },
  style: {
    width: 176,
    height: 176,
    color: 'rgba(0, 0, 0, 1)',
    bg: 'rgba(0, 0, 0, 0)',
    visibility: 'inherit',
    objectFit: 'fill',
  },
  event: {},
  method: [],
} as MQrcode;
