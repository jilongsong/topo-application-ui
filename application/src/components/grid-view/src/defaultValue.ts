export default {
  items: [],
  property: {
    isChoose: false,
    multipleSelect: false,
    dataSource: [1, 2, 3, 4, 5],
    value: '',
  },
  style: {
    rowGap: 16,
    colGap: 16,
    cellWidth: 120,
  },
  event: {
    onSelect: [],
  },
  method: [
    {
      method: 'setDataSource',
      label: '设置数据源',
      props: ['dataSource'],
    },
  ],
};
