export default {
  backgroundColor: 'rgba(255,255,255,0)',
  grid: {
    top: '10%',
    left: '8%',
    right: '5%',
    bottom: '10%',
  },
  title: {
    text: '一级标题',
    subtext: '二级标题',
    show: false,
    left: 'center',
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    source: 'configuration',
    field: 'time',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: [
    {
      type: 'value',
      name: 'y1',
      position: 'left',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(92, 86, 86, 0.78)',
          opacity: 0.8,
          type: 'dashed',
          width: 1,
        },
      },
    },
    {
      type: 'value',
      name: '',
      position: 'right',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#ccc',
          opacity: 0.2,
          type: 'dashed',
          width: 1,
        },
      },
    },
  ],
  legend: {
    show: true,
    itemWidth: 14,
    itemHeight: 10,
    itemGap: 30,
    icon: 'roundRect',
    left: 'right',
    top: 'top',
    textStyle: {
      color: '',
    },
  },
  dataSource: [
    {
      test: 200,
    },
    {
      test: 300,
    },
    {
      test: 500,
    },
    {
      test: 400,
    },
    {
      test: 300,
    },
    {
      test: 500,
    },
    {
      test: 300,
    },
  ],
  configs: [
    {
      name: 'test',
      propLabel: 'test',
      type: 'bar',
      yAxisIndex: 0,
      symbol: 'none',
      smooth: true,
      symbolSize: 16,
      radius: '60%,80%',
      pieColors: '',
      barMaxWidth: 40,
      isStack: false,
      color: 'rgba(108, 20, 241, 1)',
      label: {
        show: false,
        position: 'outside',
      },
      labelLine: {
        show: true,
      },
      showAreaStyle: false,
      colorStops: [
        {
          color: 'rgba(108, 20, 241, 1)',
        },
        {
          color: 'rgba(108, 20, 241, 0)',
        },
      ],
    },
  ],
  vertical: false,
  style: {
    visibility: 'inherit',
    width: '640',
    height: '320',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  tooltipStyle: {
    backgroundColor: '#0000006b',
    titleColor: '#fff',
    labelColor: '#fff',
    unitColor: '#fff',
    fontSize: 12,
  },
  isSchema: false,
  schema: {},
  schemaConfig: {
    xAxis: {
      field: 'time',
    },
    series: [
      {
        field: 'test',
      },
    ],
  },
};
