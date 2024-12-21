import numeral from 'numeral';

/**
 * Format a number according to a specified format.
 *
 * @param {number} value - The number to be formatted.
 * @param {string} format - The format to apply.
 * @returns {string} - The formatted number.
 *
 * @example
 * formatNumber(12345.678, '0,0.00');
 * => "12,345.68"
 *
 * formatNumber(12345.678, '$0,0.00');
 * => "$12,345.68"
 *
 * formatNumber(0.25, '0%');
 * => "25%"
 */
export function formatNumber(value: number, format: string): string {
  return numeral(value).format(format);
}
formatNumber.isFunction = true;
formatNumber.isTransform = true;

/**
 * Format a number into a currency format.
 *
 * @param {number} value - The number to be formatted.
 * @param {string} [symbol='$'] - The currency symbol (default is '$').
 * @returns {string} - The formatted currency.
 *
 * @example
 * formatCurrency(12345.678);
 * => "$12,345.68"
 *
 * formatCurrency(12345.678, '¥');
 * => "¥12,345.68"
 */
export function formatCurrency(value: number, symbol: string = '$'): string {
  return numeral(value).format(`${symbol}0,0.00`);
}
formatCurrency.isFunction = true;
formatCurrency.isTransform = true;

/**
 * Format a number into a percentage format.
 *
 * @param {number} value - The number to be formatted (as a decimal).
 * @returns {string} - The formatted percentage.
 *
 * @example
 * formatPercentage(0.25);
 * => "25.00%"
 *
 * formatPercentage(1);
 * => "100.00%"
 */
export function formatPercentage(value: number): string {
  return numeral(value).format('0.00%');
}
formatPercentage.isFunction = true;
formatPercentage.isTransform = true;

/**
 * Format a number into a thousand separator format.
 *
 * @param {number} value - The number to be formatted.
 * @returns {string} - The formatted number with thousand separators.
 *
 * @example
 * formatThousand(1234567);
 * => "1,234,567"
 *
 * formatThousand(1234.5678);
 * => "1,235"
 */
export function formatThousand(value: number): string {
  return numeral(value).format('0,0');
}
formatThousand.isFunction = true;
formatThousand.isTransform = true;

/**
 * Format a number into a custom currency format with a specified number of decimals.
 *
 * @param {number} value - The number to be formatted.
 * @param {string} [symbol='$'] - The currency symbol (default is '$').
 * @param {number} [decimals=2] - The number of decimal places (default is 2).
 * @returns {string} - The formatted currency.
 *
 * @example
 * formatCustomCurrency(12345.678, '€', 3);
 * => "€12,345.678"
 *
 * formatCustomCurrency(12345.678, '¥', 0);
 * => "¥12,346"
 */
export function formatCustomCurrency(value: number, symbol: string = '$', decimals: number = 2): string {
  return numeral(value).format(`${symbol}0,0.${'0'.repeat(decimals)}`);
}
formatCustomCurrency.isFunction = true;
formatCustomCurrency.isTransform = true;

/**
 * Automatically format a number as either an integer or with two decimal places.
 *
 * @param {number} value - The number to be formatted.
 * @returns {string} - The formatted number.
 *
 * @example
 * formatAuto(1234567);
 * => "1,234,567"
 *
 * formatAuto(1234.5678);
 * => "1,234.57"
 */
export function formatAuto(value: number): string {
  return Number.isInteger(value) ? numeral(value).format('0,0') : numeral(value).format('0,0.00');
}
formatAuto.isFunction = true;
formatAuto.isTransform = true;
