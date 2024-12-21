import { MButton } from './type';

export default {
  id: '',
  type: 'button',
  name: 'Button',
  property: {
    disabled: false,
    text: '按钮',
  },
  style: {
    visibility: 'inherit',
    width: 100,
    height: 40,
    background: '',
    fontSize: 14,
    position: 'absolute',
  },
  event: {
    onClick: [],
  },
  method: [
    {
      method: 'setText',
      label: '设置文本',
      props: ['text'],
    },
    {
      method: 'setDisabled',
      label: '设置禁用',
      props: ['disabled'],
    },
  ],
} as MButton;
