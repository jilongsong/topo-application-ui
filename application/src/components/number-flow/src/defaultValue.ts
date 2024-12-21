import { MNumberFlow } from './type';

export default {
  id: '',
  type: 'text',
  name: 'Text',
  property: {
    value: 123,
  },
  style: {
    width: '50px',
    height: '20px',
    color: '#000000',
  },
  event: {},
  method: [
    {
      method: 'setValue',
      label: '设置数值',
      props: ['value'],
    },
  ],
} as MNumberFlow;
