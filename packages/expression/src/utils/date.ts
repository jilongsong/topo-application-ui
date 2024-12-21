import dayjs, { OpUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * Get the current timestamp.
 *
 * @returns {string} - The current timestamp in ISO format.
 *
 * @example
 * now();
 * => 2023-07-05T09:09:09.000Z
 */
export function now(): string {
  return dayjs().toISOString();
}
now.isFunction = true;
now.isTransform = false;

/**
 * Get today's date at midnight.
 *
 * @returns {string} - Today's date in ISO format, starting at midnight.
 *
 * @example
 * today();
 * => 2023-07-05 00:00:00
 */
export function today(): string {
  return dayjs().startOf('day').toISOString();
}
today.isFunction = true;
today.isTransform = false;

/**
 * Get today's date at the end of the day.
 *
 * @returns {string} - Today's date in ISO format, ending at 23:59:59.
 *
 * @example
 * todayEnd();
 * => 2023-07-05 23:59:59
 */
export function todayEnd(): string {
  return dayjs().endOf('day').toISOString();
}
todayEnd.isFunction = true;
todayEnd.isTransform = false;

/**
 * Get the first day of the current month.
 *
 * @returns {string} - The first day of the current month in ISO format.
 *
 * @example
 * monthStart();
 * => 2023-07-01
 */
export function monthStart(): string {
  return dayjs().startOf('month').toISOString();
}
monthStart.isFunction = true;
monthStart.isTransform = false;

/**
 * Get the last day of the current month.
 *
 * @returns {string} - The last day of the current month in ISO format.
 *
 * @example
 * monthEnd();
 * => 2023-07-31
 */
export function monthEnd(): string {
  return dayjs().endOf('month').toISOString();
}
monthEnd.isFunction = true;
monthEnd.isTransform = false;

/**
 * Get the first day of the current year.
 *
 * @returns {string} - The first day of the current year in ISO format.
 *
 * @example
 * yearStart();
 * => 2023-01-01
 */
export function yearStart(): string {
  return dayjs().startOf('year').toISOString();
}
yearStart.isFunction = true;
yearStart.isTransform = false;

/**
 * Get the last day of the current year.
 *
 * @returns {string} - The last day of the current year in ISO format.
 *
 * @example
 * yearEnd();
 * => 2023-12-31
 */
export function yearEnd(): string {
  return dayjs().endOf('year').toISOString();
}
yearEnd.isFunction = true;
yearEnd.isTransform = false;

/**
 * Get the start time of a specified date unit.
 *
 * @param {string} date - The date to be processed.
 * @param {OpUnitType} unit - The unit of time (e.g., 'month', 'day').
 * @returns {string} - The start time of the specified date unit in ISO format.
 *
 * @example
 * customStart('2023-01-05', 'month');
 * => 2023-01-01
 *
 * '2023-01-05' | customStart('month');
 * => 2023-01-01
 */
export function customStart(date: string, unit: OpUnitType): string {
  return dayjs(date).startOf(unit).toISOString();
}
customStart.isFunction = true;
customStart.isTransform = true;

/**
 * Get the end time of a specified date unit.
 *
 * @param {string} date - The date to be processed.
 * @param {OpUnitType} unit - The unit of time (e.g., 'month', 'day').
 * @returns {string} - The end time of the specified date unit in ISO format.
 *
 * @example
 * customEnd('2023-01-05', 'month');
 * => 2023-01-31
 *
 * '2023-01-05' | customEnd('month');
 * => 2023-01-31
 */
export function customEnd(date: string, unit: OpUnitType): string {
  return dayjs(date).endOf(unit).toISOString();
}
customEnd.isFunction = true;
customEnd.isTransform = true;

/**
 * Format a date according to a specified format.
 *
 * @param {string} date - The date to be formatted.
 * @param {string} format - The format to apply.
 * @returns {string} - The formatted date string.
 *
 * @example
 * formatDate('2023-07-05', 'YYYY-MM-DD');
 * => 2023-07-05
 *
 * '2023/07/05' | formatDate('YYYY-MM-DD');
 * => 2023-07-05
 */
export function formatDate(date: string, format: string): string {
  return dayjs(date).format(format);
}
formatDate.isFunction = true;
formatDate.isTransform = true;
