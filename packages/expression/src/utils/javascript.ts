import * as _ from 'lodash-es';

/**
 * Converts a value to an array if it's not already an array.
 *
 * @param {any} value - The value to be converted.
 * @returns {Array} - The converted array.
 *
 * @example
 * '3' | castArray;
 * => ['3']
 *
 * [1, 2, 3] | castArray;
 * => [1, 2, 3]
 */
export function castArray(value: any): any[] {
  return _.castArray(value);
}
castArray.isFunction = true;
castArray.isTransform = true;

/**
 * Creates a shallow copy of a value.
 *
 * @param {any} value - The value to be cloned.
 * @returns {any} - The shallow cloned value.
 *
 * @example
 * { 'a': 1 } | clone;
 * => { 'a': 1 }
 */
export function clone(value: any): any {
  return _.clone(value);
}
clone.isFunction = true;
clone.isTransform = true;

/**
 * Creates a deep copy of a value.
 *
 * @param {any} value - The value to be deeply cloned.
 * @returns {any} - The deep cloned value.
 *
 * @example
 * { 'a': 1 } | cloneDeep;
 * => { 'a': 1 }
 */
export function cloneDeep(value: any): any {
  return _.cloneDeep(value);
}
cloneDeep.isFunction = true;
cloneDeep.isTransform = true;

/**
 * Compares two values for equality.
 *
 * @param {any} value - The first value to be compared.
 * @param {any} other - The second value to be compared.
 * @returns {boolean} - True if values are equal, false otherwise.
 *
 * @example
 * 1 | eq(1);
 * => true
 *
 * 1 | eq(2);
 * => false
 */
export function eq(value: any, other: any): boolean {
  return _.eq(value, other);
}
eq.isFunction = true;
eq.isTransform = true;

/**
 * Checks if the first value is greater than the second.
 *
 * @param {any} value - The first value to be compared.
 * @param {any} other - The second value to be compared.
 * @returns {boolean} - True if the first value is greater, false otherwise.
 *
 * @example
 * 1 | gt(2);
 * => false
 *
 * 2 | gt(1);
 * => true
 */
export function gt(value: any, other: any): boolean {
  return _.gt(value, other);
}
gt.isFunction = true;
gt.isTransform = true;

/**
 * Checks if the first value is greater than or equal to the second.
 *
 * @param {any} value - The first value to be compared.
 * @param {any} other - The second value to be compared.
 * @returns {boolean} - True if the first value is greater than or equal to the second, false otherwise.
 *
 * @example
 * 1 | gte(2);
 * => false
 *
 * 2 | gte(1);
 * => true
 */
export function gte(value: any, other: any): boolean {
  return _.gte(value, other);
}
gte.isFunction = true;
gte.isTransform = true;

/**
 * Checks if the value is an array.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is an array, false otherwise.
 *
 * @example
 * [1, 2, 3] | isArray();
 * => true
 *
 * 'hello' | isArray();
 * => false
 *
 * { 'a': 1 } | isArray();
 * => false
 */
export function isArray(value: any): boolean {
  return _.isArray(value);
}
isArray.isFunction = true;
isArray.isTransform = true;

/**
 * Checks if the value is a boolean.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is a boolean, false otherwise.
 *
 * @example
 * true | isBoolean();
 * => true
 *
 * false | isBoolean();
 * => true
 *
 * 'true' | isBoolean();
 * => false
 *
 * null | isBoolean();
 * => false
 */
export function isBoolean(value: any): boolean {
  return _.isBoolean(value);
}
isBoolean.isFunction = true;
isBoolean.isTransform = true;

/**
 * Checks if the value is a date object.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is a date object, false otherwise.
 *
 * @example
 * new Date() | isDate();
 * => true
 *
 * '2010-10-10' | isDate();
 * => false
 */
export function isDate(value: any): boolean {
  return _.isDate(value);
}
isDate.isFunction = true;
isDate.isTransform = true;

/**
 * Checks if the value is empty.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is empty, false otherwise.
 *
 * @example
 * '' | isEmpty();
 * => true
 *
 * [] | isEmpty();
 * => true
 *
 * {} | isEmpty();
 * => true
 *
 * [1, 2, 3] | isEmpty();
 * => false
 */
export function isEmpty(value: any): boolean {
  return _.isEmpty(value);
}
isEmpty.isFunction = true;
isEmpty.isTransform = true;

/**
 * Compares two values for deep equality.
 *
 * @param {any} value - The first value to be compared.
 * @param {any} other - The second value to be compared.
 * @returns {boolean} - True if values are deeply equal, false otherwise.
 *
 * @example
 * 1 | isEqual(1);
 * => true
 *
 * 1 | isEqual(2);
 * => false
 */
export function isEqual(value: any, other: any): boolean {
  return _.isEqual(value, other);
}
isEqual.isFunction = true;
isEqual.isTransform = true;

/**
 * Checks if the value is an integer.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is an integer, false otherwise.
 *
 * @example
 * 3 | isInteger();
 * => true
 *
 * 3.1 | isInteger();
 * => false
 */
export function isInteger(value: any): boolean {
  return _.isInteger(value);
}
isInteger.isFunction = true;
isInteger.isTransform = true;

/**
 * Checks if the value is a valid length.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is a valid length, false otherwise.
 *
 * @example
 * 3 | isLength();
 * => true
 *
 * 3.1 | isLength();
 * => false
 */
export function isLength(value: any): boolean {
  return _.isLength(value);
}
isLength.isFunction = true;
isLength.isTransform = true;

/**
 * Checks if a value is deeply equal to a given object.
 *
 * @param {Object} object - The object to compare the value with.
 * @returns {boolean} - Whether the value is a match.
 *
 * @example
 * { 'a': 1 } | isMatch({ 'a': 1 });
 * => true
 *
 * { 'a': 1 } | isMatch({ 'a': 2 });
 * => false
 */
export function isMatch(value: any, object: any): boolean {
  return _.isMatch(value, object);
}
isMatch.isFunction = true;
isMatch.isTransform = true;

/**
 * Checks if the value is NaN.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is NaN.
 *
 * @example
 * NaN | isNaN();
 * => true
 *
 * 'abc' | isNaN();
 * => false
 */
export function isNaN(value: any): boolean {
  return _.isNaN(value);
}
isNaN.isFunction = true;
isNaN.isTransform = true;

/**
 * Checks if the value is null or undefined.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is null or undefined.
 *
 * @example
 * null | isNil();
 * => true
 *
 * undefined | isNil();
 * => true
 *
 * 'hello' | isNil();
 * => false
 */
export function isNil(value: any): boolean {
  return _.isNil(value);
}
isNil.isFunction = true;
isNil.isTransform = true;

/**
 * Checks if the value is null.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is null.
 *
 * @example
 * null | isNull();
 * => true
 *
 * undefined | isNull();
 * => false
 */
export function isNull(value: any): boolean {
  return _.isNull(value);
}
isNull.isFunction = true;
isNull.isTransform = true;

/**
 * Checks if the value is a number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is a number.
 *
 * @example
 * 3 | isNumber();
 * => true
 *
 * 3.1 | isNumber();
 * => true
 *
 * NaN | isNumber();
 * => false
 */
export function isNumber(value: any): boolean {
  return _.isNumber(value);
}
isNumber.isFunction = true;
isNumber.isTransform = true;

/**
 * Checks if the value is an object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is an object.
 *
 * @example
 * {} | isObject();
 * => true
 *
 * [1, 2, 3] | isObject();
 * => true
 *
 * null | isObject();
 * => false
 *
 * 'hello' | isObject();
 * => false
 */
export function isObject(value: any): boolean {
  return _.isObject(value);
}
isObject.isFunction = true;
isObject.isTransform = true;

/**
 * Checks if the value is a regular expression.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is a regular expression.
 *
 * @example
 * /abc/ | isRegExp();
 * => true
 *
 * 'abc' | isRegExp();
 * => false
 */
export function isRegExp(value: any): boolean {
  return _.isRegExp(value);
}
isRegExp.isFunction = true;
isRegExp.isTransform = true;

/**
 * Checks if the value is a safe integer.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is a safe integer.
 *
 * @example
 * 3 | isSafeInteger();
 * => true
 *
 * 3.1 | isSafeInteger();
 * => false
 */
export function isSafeInteger(value: any): boolean {
  return _.isSafeInteger(value);
}
isSafeInteger.isFunction = true;
isSafeInteger.isTransform = true;

/**
 * Checks if the value is a string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - Whether the value is a string.
 *
 * @example
 * 'hello' | isString();
 * => true
 *
 * 123 | isString();
 * => false
 *
 * [] | isString();
 * => false
 */
export function isString(value: any): boolean {
  return _.isString(value);
}
isString.isFunction = true;
isString.isTransform = true;

/**
 * Check if a value is less than the provided value.
 *
 * @param {number} value - The value to compare against.
 * @param {number} otherValue - The value to compare with.
 * @returns {boolean} - Returns true if the value is less than the given value.
 *
 * @example
 * 1 | lt(2);
 * => true
 *
 * 2 | lt(1);
 * => false
 */
export function lt(value: number, otherValue: number): boolean {
  return _.lt(value, otherValue);
}
lt.isFunction = true;
lt.isTransform = true;

/**
 * Check if a value is less than or equal to the provided value.
 *
 * @param {number} value - The value to compare against.
 * @param {number} otherValue - The value to compare with.
 * @returns {boolean} - Returns true if the value is less than or equal to the given value.
 *
 * @example
 * 1 | lte(2);
 * => true
 *
 * 2 | lte(1);
 * => false
 */
export function lte(value: number, otherValue: number): boolean {
  return _.lte(value, otherValue);
}
lte.isFunction = true;
lte.isTransform = true;

/**
 * Convert a value to an array.
 *
 * @param {any} value - The value to convert.
 * @returns {Array} - Returns the converted array.
 *
 * @example
 * 'hello' | toArray();
 * => ['h', 'e', 'l', 'l', 'o']
 *
 * 1 | toArray();
 * => [1]
 *
 * null | toArray();
 * => []
 */
export function toArray(value: any): any[] {
  return _.toArray(value);
}
toArray.isFunction = true;
toArray.isTransform = true;

/**
 * Convert a value to a finite number.
 *
 * @param {any} value - The value to convert.
 * @returns {number} - Returns the finite number.
 *
 * @example
 * 3.1 | toFinite;
 * => 3.1
 *
 * Number.MIN_VALUE | toFinite;
 * => 5e-324
 *
 * Infinity | toFinite;
 * => 1.7976931348623157e+308
 *
 * -Infinity | toFinite;
 * => -1.7976931348623157e+308
 */
export function toFinite(value: any): number {
  return _.toFinite(value);
}
toFinite.isFunction = true;
toFinite.isTransform = true;

/**
 * Convert a value to an integer.
 *
 * @param {any} value - The value to convert.
 * @returns {number} - Returns the converted integer.
 *
 * @example
 * 3.1 | toInteger;
 * => 3
 *
 * Number.MIN_VALUE | toInteger;
 * => 0
 *
 * Infinity | toInteger;
 * => 1.7976931348623157e+308
 *
 * -Infinity | toInteger;
 * => -1.7976931348623157e+308
 */
export function toInteger(value: any): number {
  return _.toInteger(value);
}
toInteger.isFunction = true;
toInteger.isTransform = true;

/**
 * Convert a value to a length.
 *
 * @param {any} value - The value to convert.
 * @returns {number} - Returns the converted length.
 *
 * @example
 * 3.1 | toLength;
 * => 3
 *
 * Number.MIN_VALUE | toLength;
 * => 0
 *
 * Infinity | toLength;
 * => 1.7976931348623157e+308
 *
 * -Infinity | toLength;
 * => 0
 */
export function toLength(value: any): number {
  return _.toLength(value);
}
toLength.isFunction = true;
toLength.isTransform = true;

/**
 * Convert a value to a number.
 *
 * @param {any} value - The value to convert.
 * @returns {number} - Returns the converted number.
 *
 * @example
 * 3.1 | toNumber;
 * => 3.1
 *
 * Number.MIN_VALUE | toNumber;
 * => 5e-324
 *
 * Infinity | toNumber;
 * => Infinity
 *
 * -Infinity | toNumber;
 * => -Infinity
 */
export function toNumber(value: any): number {
  return _.toNumber(value);
}
toNumber.isFunction = true;
toNumber.isTransform = true;

/**
 * Convert a value to a string.
 *
 * @param {any} value - The value to convert.
 * @returns {string} - Returns the converted string.
 *
 * @example
 * 3.1 | toString;
 * => '3.1'
 *
 * Number.MIN_VALUE | toString;
 * => '5e-324'
 *
 * Infinity | toString;
 * => 'Infinity'
 *
 * -Infinity | toString;
 * => '-Infinity'
 */
export function toString(value: any): string {
  return _.toString(value);
}
toString.isFunction = true;
toString.isTransform = true;
