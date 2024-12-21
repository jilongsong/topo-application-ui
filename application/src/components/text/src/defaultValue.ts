import { MText } from './type';

export default {
  id: '',
  type: 'text',
  name: 'Text',
  property: {
    text: '文本',
  },
  style: {
    width: '100px',
    height: '20px',
    color: '#000000',
  },
  event: {},
  method: [
    {
      method: 'setText',
      label: '设置文本',
      props: ['text'],
    },
  ],
} as MText;
