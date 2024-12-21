import * as mathjs from 'mathjs';

/**
 * Add multiple numbers and return the sum.
 *
 * @param {...number} values - The numbers to be added.
 * @returns {number} - The sum of the numbers.
 *
 * @example
 * 1 | add(2, 3);
 * => 6
 *
 * 1 | add(2, 3, 4);
 * => 10
 *
 * 1 | add(2, 3, 4, 5);
 * => 15
 */
export function add(...values: number[]): number {
  return mathjs.add(...values);
}
add.isFunction = true;
add.isTransform = true;

/**
 * Return the absolute value of a number.
 *
 * @param {number} value - The number to be processed.
 * @returns {number} - The absolute value of the number.
 *
 * @example
 * -1 | abs;
 * => 1
 */
export function abs(value: number): number {
  return mathjs.abs(value);
}
abs.isFunction = true;
abs.isTransform = true;

/**
 * Subtract multiple numbers and return the result.
 *
 * @param {number} x - The first number to be subtracted.
 * @param {number} y - The second number to be subtracted.
 * @returns {number} - The result of the subtraction.
 *
 * @example
 * 5 | subtract(2);
 * => 2
 */
export function subtract(x: number, y: number): number {
  return mathjs.subtract(x, y);
}
subtract.isFunction = true;
subtract.isTransform = true;

/**
 * Multiply multiple numbers and return the product.
 *
 * @param {...number} values - The numbers to be multiplied.
 * @returns {number} - The product of the numbers.
 *
 * @example
 * 5 | multiply(2, 3);
 * => 15
 *
 * 5 | multiply(2, 3, 4);
 * => 60
 *
 * 5 | multiply(2, 3, 4, 5);
 * => 120
 */
export function multiply(...values: number[]): number {
  return mathjs.multiply(...values);
}
multiply.isFunction = true;
multiply.isTransform = true;

/**
 * Divide multiple numbers and return the result.
 *
 * @param {number} x - The first number to divide.
 * @param {number} y - The second number to divide.
 * @returns {number} - The result of the division.
 *
 * @example
 * 5 | divide(2);
 * => 2.5
 */
export function divide(x: number, y: number): number {
  return mathjs.divide(x, y);
}
divide.isFunction = true;
divide.isTransform = true;

/**
 * Get the remainder of a division.
 *
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number} - The remainder.
 *
 * @example
 * 5 | mod(2, 3);
 * => 1
 *
 * 5 | mod(2, 3, 4);
 * => 2
 *
 * 5 | mod(2, 3, 4, 5);
 * => 0
 */
export function mod(a: number, b: number): number {
  return mathjs.mod(a, b);
}
mod.isFunction = true;
mod.isTransform = true;

/**
 * Calculate the power of a number raised to the specified exponent.
 *
 * @param {number} x - The base number.
 * @param {number} y - The exponent.
 * @returns {number} - The result of raising the base to the power of the exponents.
 *
 * @example
 * 5 | pow(2, 3);
 * => 125
 *
 * 5 | pow(2, 3, 4);
 * => 15625
 *
 * 5 | pow(2, 3, 4, 5);
 * => 390625
 */
export function pow(x: number, y: number): number {
  return mathjs.pow(x, y) as number;
}
pow.isFunction = true;
pow.isTransform = true;

/**
 * Calculate the square root of a number.
 *
 * @param {number} value - The number to find the square root of.
 * @returns {number} - The square root of the number.
 *
 * @example
 * 5 | sqrt(2);
 * => 2.23606797749979
 *
 * 5 | sqrt(2, 3);
 * => 2.6457513110645907
 *
 * 5 | sqrt(2, 3, 4);
 * => 2.8284271247461903
 */
export function sqrt(value: number): number {
  return mathjs.sqrt(value) as number;
}
sqrt.isFunction = true;
sqrt.isTransform = true;

/**
 * Round a number to a specified number of decimal places.
 *
 * @param {number} value - The number to be rounded.
 * @param {number} [precision=0] - The number of decimal places to round to.
 * @returns {number} - The rounded number.
 *
 * @example
 * 2.335 | round(2);
 * => 2.34
 */
export function round(value: number, precision: number = 0): number {
  return mathjs.round(value, precision);
}
round.isFunction = true;
round.isTransform = true;

/**
 * Round a number upward to the nearest integer.
 *
 * @param {number} value - The number to be rounded up.
 * @returns {number} - The rounded number.
 *
 * @example
 * 2.335 | ceil(2);
 * => 2.34
 */
export function ceil(value: number): number {
  return mathjs.ceil(value);
}
ceil.isFunction = true;
ceil.isTransform = true;

/**
 * Round a number downward to the nearest integer.
 *
 * @param {number} value - The number to be rounded down.
 * @returns {number} - The rounded number.
 *
 * @example
 * 2.335 | floor(2);
 * => 2.34
 */
export function floor(value: number): number {
  return mathjs.floor(value);
}
floor.isFunction = true;
floor.isTransform = true;

/**
 * Sum all the elements in an array.
 *
 * @param {Array<number>} values - The array of numbers to sum.
 * @returns {number} - The sum of the array elements.
 *
 * @example
 * [1, 2, 3] | sum();
 * => 6
 */
export function sum(values: number[]): number {
  return mathjs.sum(values);
}
sum.isFunction = true;
sum.isTransform = true;

/**
 * Calculate the mean (average) of an array of numbers.
 *
 * @param {Array<number>} values - The array of numbers to calculate the mean of.
 * @returns {number} - The mean of the array elements.
 *
 * @example
 * [1, 2, 3] | mean();
 * => 2
 */
export function mean(values: number[]): number {
  return mathjs.mean(values);
}
mean.isFunction = true;
mean.isTransform = true;

/**
 * Calculate the median of an array of numbers.
 *
 * @param {Array<number>} values - The array of numbers to calculate the median of.
 * @returns {number} - The median of the array elements.
 *
 * @example
 * [1, 2, 3] | median();
 * => 2
 */
export function median(values: number[]): number {
  return mathjs.median(values);
}
median.isFunction = true;
median.isTransform = true;

/**
 * Get the minimum value from an array.
 *
 * @param {Array} array - The array of numbers.
 * @returns {number} - The minimum value in the array.
 *
 * @example
 * [1, 2, 3] | min();
 * => 1
 */
export function min(array: number[]): number {
  return mathjs.min(array);
}
min.isFunction = true;
min.isTransform = true;

/**
 * Get the maximum value from an array.
 *
 * @param {Array} array - The array of numbers.
 * @returns {number} - The maximum value in the array.
 *
 * @example
 * [1, 2, 3] | max();
 * => 3
 */
export function max(array: number[]): number {
  return mathjs.max(array);
}
max.isFunction = true;
max.isTransform = true;

/**
 * Get the standard deviation of an array.
 *
 * @param {Array} array - The array of numbers.
 * @returns {number} - The standard deviation of the array.
 *
 * @example
 * [1, 2, 3] | std();
 * => 1
 */
export function std(array: number[]): number | number[] {
  return mathjs.std(array) as number | number[];
}
std.isFunction = true;
std.isTransform = true;

/**
 * Get the variance of an array.
 *
 * @param {Array} array - The array of numbers.
 * @returns {number} - The variance of the array.
 *
 * @example
 * [1, 2, 3] | variance();
 * => 1
 */
export function variance(array: number[]): number | number[] {
  return mathjs.variance(array) as number | number[];
}
variance.isFunction = true;
variance.isTransform = true;

/**
 * Generate a random number between 0 (inclusive) and 1 (exclusive).
 *
 * @param {number} [min] - The minimum value (inclusive).
 * @param {number} [max] - The maximum value (exclusive).
 * @returns {number} - A random number between `min` and `max` (if provided), or between 0 and 1.
 *
 * @example
 * random();
 * => 0.123456789
 *
 * random(10);
 * => 7
 *
 * random(10, 20);
 * => 15
 */
export function random(min?: number, max?: number): number {
  return mathjs.random(min, max);
}
random.isFunction = true;
random.isTransform = false;

/**
 * Generate a random integer between a given range.
 *
 * @param {number} [min] - The minimum value (inclusive).
 * @param {number} [max] - The maximum value (exclusive).
 * @returns {number} - A random integer between `min` and `max`.
 *
 * @example
 * randomInt();
 * => 7
 *
 * randomInt(10);
 * => 7
 *
 * randomInt(10, 20);
 * => 15
 */
export function randomInt(min?: number, max?: number): number {
  return mathjs.randomInt(min ?? 10, max);
}
randomInt.isFunction = true;
randomInt.isTransform = false;

/**
 * Calculate the greatest common divisor (GCD) of given numbers.
 *
 * @param {number} values - The numbers to calculate the GCD for.
 * @returns {number} - The GCD of the numbers.
 *
 * @example
 * gcd(2, 4)
 * => 2
 *
 * gcd(2, 4, 6)
 * => 2
 */
export function gcd(...values: number[]): number {
  return mathjs.gcd(...values);
}
gcd.isFunction = true;
gcd.isTransform = true;

/**
 * Calculate the least common multiple (LCM) of given numbers.
 *
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @returns {number} - The LCM of the numbers.
 *
 * @example
 * lcm(2, 4)
 * => 8
 */
export function lcm(x: number, y: number): number {
  return mathjs.lcm(x, y);
}
lcm.isFunction = true;
lcm.isTransform = true;

/**
 * Check if a number is prime.
 *
 * @param {number} value - The number to check.
 * @returns {boolean} - True if the number is prime, false otherwise.
 *
 * @example
 * prime(2)
 * => true
 *
 * prime(4)
 * => false
 */
export function prime(value: number): boolean {
  return mathjs.isPrime(value);
}
prime.isFunction = true;
prime.isTransform = true;
