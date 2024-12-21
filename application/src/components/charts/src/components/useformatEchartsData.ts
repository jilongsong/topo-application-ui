import { ref } from 'vue';
import {
  BarSeriesOption,
  CandlestickSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts';

import { ECOption } from '../type';
export interface PropsConfig {
  dataSource: Record<string, any>[];
  configs: ChartBaseSeriesConfig<any>[];
  xAxis: any;
  yAxis: any;
  legend: ECOption['legend'];
  vertical: boolean;
  schema?: any;
  schemaConfig: any;
  tooltipStyle: any;
}

type BaseStyle = {
  color?: string;
  itemStyle?: any;
};

type PieStyle = {
  radius?: any;
  pieColors?: string[] | string;
};

type ChartBaseSeriesConfig<T> = PieStyle & {
  name: string;
  type: T;
  icon: string;
  style: BaseStyle;
  color?: string;
  propLabel: string;
  yAxisIndex: number;
  colorStops: any;
  showAreaStyle: boolean;
  isStack: boolean;
  // 添加更多通用自定义属性
};

type ChartLineSeriesConfig = ChartBaseSeriesConfig<'line'> & Omit<LineSeriesOption, 'type' | 'data'>;
type ChartBarSeriesConfig = ChartBaseSeriesConfig<'bar'> & Omit<BarSeriesOption, 'type' | 'data'>;
type ChartPieSeriesConfig = ChartBaseSeriesConfig<'pie'> & Omit<PieSeriesOption, 'type' | 'data'>;
type ChartScatterSeriesConfig = ChartBaseSeriesConfig<'scatter'> & Omit<ScatterSeriesOption, 'type' | 'data'>;
type ChartCandlestickSeriesConfig = ChartBaseSeriesConfig<'candlestick'> &
  Omit<CandlestickSeriesOption, 'type' | 'data'>;

export type ChartSeriesConfig =
  | ChartLineSeriesConfig
  | ChartBarSeriesConfig
  | ChartPieSeriesConfig
  | ChartScatterSeriesConfig
  | ChartCandlestickSeriesConfig;

const baseLegend = ref({
  itemWidth: 8,
  itemHeight: 8,
  itemGap: 30,
  icon: 'roundRect',
  left: 'right',
  orient: 'horizontal',
});

const formatXAxisData = (dataSource: Record<string, any>[], xAxis: Record<string, any>) => {
  const data = dataSource.map((item) => item[xAxis.field]);
  return { ...xAxis, data };
};

const formatSeriesData = (propsLabel: string, dataSource: any[]) =>
  Array.isArray(dataSource) ? dataSource.map((item: { [x: string]: any }) => item[propsLabel]) : [];

const formatPieSeriesData = (propsLabel: string, dataSource: any[], xAxisData: Record<string, any>[]) => {
  return (
    xAxisData?.map((item: any, index: number) => {
      const value = dataSource[index] ? dataSource[index][propsLabel] : 0;
      return { name: item, value: value || 0 };
    }) || []
  );
};

const getLegend = (configs: ChartSeriesConfig[]) => {
  const data = configs.map(({ name, style }: { name: string; style: BaseStyle }) => {
    return { name, ...style };
  });
  return { data, ...baseLegend.value };
};

const getPieLegend = (xAxisData: Record<string, any>[]) => {
  const data = xAxisData?.map((item: any) => item);
  return { data, ...baseLegend.value };
};

const createBaseSeries = (
  config: ChartSeriesConfig,
  dataSource: PropsConfig['dataSource'],
  xAxisData: PropsConfig['xAxis']
): any => {
  // @ts-ignore
  const { type, propLabel, yAxisIndex, color, pieColors, colorStops, showAreaStyle, radius, isStack, ...rest } = config;
  const areaStyleColorConfig = {
    x: 0,
    x2: 0,
    y: 0,
    y2: 1,
    colorStops: colorStops?.map(({ color }: { color: string }, index: number) => ({ offset: index, color })),
  };
  switch (type) {
    case 'line':
      return {
        type,
        color,
        yAxisIndex: yAxisIndex || 0,
        ...(rest as LineSeriesOption),
        data: formatSeriesData(propLabel, dataSource),
        lineStyle: { color },
        areaStyle: showAreaStyle ? { color: areaStyleColorConfig } : undefined,
      };
    case 'bar':
      return {
        type,
        color,
        yAxisIndex: yAxisIndex || 0,
        stack: isStack ? 'total' : undefined,
        ...(rest as BarSeriesOption),
        data: formatSeriesData(propLabel, dataSource),
      };
    case 'scatter':
      return {
        type,
        color,
        symbolSize: config.symbolSize || 10,
        itemStyle: config.itemStyle,
        data: formatSeriesData(propLabel, dataSource),
      };
    case 'candlestick':
      return {
        type,
        data: formatSeriesData(propLabel, dataSource),
        ...(rest as CandlestickSeriesOption),
      };
    case 'pie':
      return {
        type,
        radius: typeof radius === 'string' ? radius.split(',') : radius,
        color: pieColors ? (typeof pieColors === 'string' ? pieColors.split(',') : pieColors) : undefined,
        label: config.label,
        labelLine: config.labelLine,
        data: formatPieSeriesData(propLabel, dataSource, xAxisData),
      };
  }
};
export const useEchartsData = () => {
  const formatEchartsData = (propsConfig: PropsConfig): ECOption => {
    const { configs, dataSource, legend, xAxis, yAxis, vertical, tooltipStyle, ...rest } = propsConfig;
    const isPie = configs.some(({ type }) => type === 'pie');
    const isBar = configs.every((item) => item.type === 'bar');
    let baseConfig = {};
    const xAxisData = xAxis.source === 'configuration' ? xAxis : formatXAxisData(dataSource, xAxis);
    //轴向交换
    //@ts-ignore
    if (vertical && !isPie && isBar) {
      baseConfig = {
        xAxis: yAxis,
        yAxis: xAxisData,
      };
    } else {
      baseConfig = {
        xAxis: isPie ? { ...xAxisData, show: false } : xAxisData,
        yAxis: isPie ? { ...yAxis, show: false } : yAxis,
      };
    }
    baseLegend.value = Object.assign({}, baseLegend.value, legend);
    const series = configs.map((item) => createBaseSeries(item, dataSource, xAxisData.data));
    const colors = configs.map(({ color }) => color);
    const { backgroundColor, titleColor, labelColor, unitColor, fontSize } = tooltipStyle;
    return {
      legend: isPie ? getPieLegend(xAxis.data) : getLegend(configs),
      tooltip: {
        show: true,
        trigger: isPie ? 'item' : 'axis',
        backgroundColor,
        borderWidth: 0,
        textStyle: { fontSize },
        formatter: function (params: any) {
          if (isPie) {
            return `<div style="height:auto;width:auto;"><div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;">
                      <div style="display:flex;align-items:center">
                        <div style="width:10px;height:10px;border-radius:50%;background-color:${params.color}"></div>
                        <div style="margin-left: 10px;color:#fff;">${params.name}: ${params.value}</div>
                      </div>
                    </div></div>`;
          }
          return `<div style="height:auto;width:auto;">
               <div style="height:20px;color:${titleColor};">${params[0].name}</div>
                ${params
                  .map((item: { seriesName: string; value: number; axisIndex: number }, index: number) => {
                    const yAxisUnit = yAxis[series[index].yAxisIndex]?.name || '';
                    // 添加内容部分
                    const content = `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;">
                      <div style="display:flex;align-items:center">
                        <div style="width:10px;height:10px;border-radius:50%;background-color:${colors[index]}"></div>
                        <div style="margin-left: 10px;color:${labelColor};">${item.seriesName}: ${item.value} <span style="color:${unitColor};">${yAxisUnit}</span></div>
                      </div>
                    </div>`;

                    // 返回完整的HTML字符串，并在最后一个元素后不添加分割线
                    if (index === params.length - 1) {
                      return content;
                    } else {
                      return content + '\n';
                    }
                  })
                  .join('')}
              </div>`;
        },
      },
      series: series as ECOption['series'],
      ...baseConfig,
      ...rest,
    };
  };

  const formatSchemaData = (propsConfig: PropsConfig): ECOption => {
    try {
      const { xAxis, series } = propsConfig.schema;
      const schema = {
        ...propsConfig.schema,
        xAxis: {
          ...xAxis,
          data: propsConfig.dataSource?.map((item: any) => item[propsConfig.schemaConfig.xAxis.field]),
        },
        series: propsConfig.schemaConfig.series.map((item: { field: string }, index: number) => {
          return {
            ...series[index],
            data: formatSeriesData(item.field, propsConfig.dataSource),
          };
        }),
      } as ECOption;
      return schema;
    } catch (error) {
      console.log('error', error);
      return {};
    }
  };

  return {
    baseLegend,
    formatEchartsData,
    formatSchemaData,
  };
};
