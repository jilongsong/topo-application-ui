export default {
  items: [],
  style: {
    visibility: 'inherit',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    overflow: 'auto',
  },
  method: [
    {
      method: 'setVisible',
      label: '打开弹窗',
      props: ['visible'],
    },
    {
      method: 'setVisible',
      label: '关闭弹窗',
      props: ['visible'],
    },
  ],
};
