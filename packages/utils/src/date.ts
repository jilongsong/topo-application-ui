import dayjs, { ConfigType, Dayjs, ManipulateType, OpUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type UnitTime = OpUnitType;

export interface TimeRange {
  start: Dayjs;
  end: Dayjs;
}

export interface FormatDateRange {
  start: string;
  end: string;
}

export interface DateRange {
  start: Date | number;
  end: Date | number;
  isTimestamp?: boolean;
}
export const dateFormat = (v: string | Date, defaultValue = '-', format = 'YYYY-MM-DD HH:mm:ss'): string | number => {
  if (v) {
    let time = null;
    if (['x', 'timestamp'].includes(format)) {
      time = dayjs(v).valueOf();
    } else if ((typeof v === 'string' && v.includes('Z')) || v.constructor === Date) {
      // UTC字符串时间或Date对象格式化为北京时间
      time = dayjs(v).utcOffset(8).format(format);
    } else {
      time = dayjs(v).format(format);
    }

    if (time !== 'Invalid Date') {
      return time;
    }
    return defaultValue;
  }
  return defaultValue;
};

export function stringToDate(date: string) {
  return dayjs(date).toDate();
}

export function stringToTimestamp(date: string) {
  return dayjs(date).valueOf();
}

export function formatDate(date: ConfigType, format: string): string {
  return dayjs(date).format(format);
}

export function timeRange(date: ConfigType, unitOfTime: OpUnitType): TimeRange {
  return {
    start: dayjs(date).startOf(unitOfTime),
    end: dayjs(date).endOf(unitOfTime),
  };
}

export function formatDateRange(date: ConfigType, unitOfTime: OpUnitType, format: string): FormatDateRange {
  const { start, end } = timeRange(date, unitOfTime);
  return {
    start: start.format(format),
    end: end.format(format),
  };
}

export function formatCurrentDateRange(unitOfTime: OpUnitType, format: string): FormatDateRange {
  return formatDateRange(new Date(), unitOfTime, format);
}

export function formatTodayRange(format: string): FormatDateRange {
  return formatCurrentDateRange('day', format);
}

export function formatThisMonthRange(format: string): FormatDateRange {
  return formatCurrentDateRange('month', format);
}

export function formatThisYearRange(format: string): FormatDateRange {
  return formatCurrentDateRange('year', format);
}

export function formatThisWeekRange(format: string): FormatDateRange {
  return formatCurrentDateRange('week', format);
}

export function dateRange(date: ConfigType, unitOfTime: OpUnitType, isTimestamp?: boolean): DateRange {
  const { start, end } = timeRange(date, unitOfTime);
  if (isTimestamp) {
    return {
      start: start.valueOf(),
      end: end.valueOf(),
      isTimestamp,
    };
  }
  return {
    start: start.toDate(),
    end: end.toDate(),
  };
}

export function currentDateRange(unitOfTime: OpUnitType, isTimestamp?: boolean): DateRange {
  return dateRange(new Date(), unitOfTime, isTimestamp);
}

export function todayRange(isTimestamp?: boolean): DateRange {
  return currentDateRange('day', isTimestamp);
}

export function thisMonthRange(isTimestamp?: boolean): DateRange {
  return currentDateRange('month', isTimestamp);
}

export function thisYearRange(isTimestamp?: boolean): DateRange {
  return currentDateRange('year', isTimestamp);
}

export function thisWeekRange(isTimestamp?: boolean): DateRange {
  return currentDateRange('week', isTimestamp);
}

export function daysInMonth(date: ConfigType) {
  return dayjs(date).daysInMonth();
}

export function daysInThisMonth() {
  return dayjs().daysInMonth();
}

export function timeSubtract(date: ConfigType, num: number, unitOfTime: ManipulateType) {
  return dayjs(date).subtract(num, unitOfTime).valueOf();
}

export type TimeUnit =
  | 'millisecond'
  | 'milliseconds'
  | 'second'
  | 'seconds'
  | 'minute'
  | 'minutes'
  | 'hour'
  | 'hours'
  | 'day'
  | 'days';

export function toMilliseconds(time: number, unit: TimeUnit) {
  let milliseconds;

  switch (unit) {
    case 'millisecond':
    case 'milliseconds':
      milliseconds = time;
      break;
    case 'second':
    case 'seconds':
      milliseconds = time * 1000;
      break;
    case 'minute':
    case 'minutes':
      milliseconds = time * 60 * 1000;
      break;
    case 'hour':
    case 'hours':
      milliseconds = time * 60 * 60 * 1000;
      break;
    case 'day':
    case 'days':
      milliseconds = time * 24 * 60 * 60 * 1000;
      break;
    default:
      milliseconds = NaN;
  }

  return milliseconds;
}
