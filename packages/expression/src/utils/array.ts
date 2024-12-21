import * as _ from 'lodash-es';

import { Comparator, Comparator2 } from '../type';

/**
 * Split an array into chunks of a given size.
 *
 * @param {Array} array - The array to be chunked.
 * @returns {Array} - The chunked array.
 *
 * @example
 * [1, 2, 3, 4, 5] | chunk(2);
 * => [[1, 2], [3, 4], [5]]
 */
export function chunk(array: any[]): any[] {
  return _.chunk(array);
}
chunk.isFunction = true;
chunk.isTransform = true;

/**
 * Create a new array concatenating array with any additional arrays and/or values.
 *
 * @param {Array} array - The initial array to be concatenated.
 * @param {...(Array|any)} values - The values or arrays to be concatenated to the initial array.
 * @returns {Array} - The concatenated array.
 *
 * @example
 * [1] | concat(2, [3], [[4]]);
 * => [1, 2, 3, [4]]
 */
export function concat(array: any[], ...values: any[]): any[] {
  return _.concat(array, ...values);
}
concat.isFunction = true;
concat.isTransform = true;

/**
 * Returns the elements of the first array that are not present in any of the other arrays.
 *
 * @param {Array} array - The array to compare against the others.
 * @param {...Array} values - Arrays to exclude elements from the first array.
 * @returns {Array} - The filtered array containing elements not present in the other arrays.
 *
 * @example
 * [2, 1] | difference([2, 3]);
 * => [1]
 *
 * ['a', 'b', 'c'] | difference(['b'], ['d']);
 * => ['a', 'c']
 */
export function difference(array: any[], ...values: any[][]): any[] {
  return _.difference(array, ...values);
}
difference.isFunction = true;
difference.isTransform = true;

/**
 * Returns the elements of the first array that are not present in any of the other arrays,
 * compared by a specified property.
 *
 * @param {Array} array - The array to compare against the others.
 * @param {Array} values - Arrays to exclude elements from the first array.
 * @param {Function|string} iteratee - The function or property name to compare elements by.
 * @returns {Array} - The filtered array containing elements not present in the other arrays.
 *
 * @example
 * [{ 'x': 2 }, { 'x': 1 }] | differenceBy([{ 'x': 1 }], 'x');
 * => [{ 'x': 2 }]
 */
export function differenceBy(array: any[], values: any[], iteratee: Function | string): any[] {
  return _.differenceBy(array, values, iteratee);
}
differenceBy.isFunction = true;
differenceBy.isTransform = true;

/**
 * Removes the specified number of elements from the beginning of an array.
 *
 * @param {Array} array - The array to modify.
 * @param {number} n - The number of elements to remove from the start.
 * @returns {Array} - The new array with elements removed from the beginning.
 *
 * @example
 * [1, 2, 3] | drop(2);
 * => [3]
 *
 * ['a', 'b', 'c', 'd'] | drop(1);
 * => ['b', 'c', 'd']
 */
export function drop(array: any[], n: number): any[] {
  return _.drop(array, n);
}
drop.isFunction = true;
drop.isTransform = true;

/**
 * Removes the specified number of elements from the end of an array.
 *
 * @param {Array} array - The array to modify.
 * @param {number} n - The number of elements to remove from the end.
 * @returns {Array} - The new array with elements removed from the end.
 *
 * @example
 * [1, 2, 3] | dropRight(2);
 * => [1]
 *
 * ['a', 'b', 'c', 'd'] | dropRight(1);
 * => ['a', 'b', 'c']
 */
export function dropRight(array: any[], n: number): any[] {
  return _.dropRight(array, n);
}
dropRight.isFunction = true;
dropRight.isTransform = true;

/**
 * Removes elements from the end of an array that satisfy the given condition.
 *
 * @param {Array} array - The array to modify.
 * @param {Function|Object|string|Array} predicate - The condition to test the elements against.
 *    - Can be an object to match the properties,
 *    - A function to test each element,
 *    - A string to check if the property exists,
 *    - Or an array for matching multiple conditions.
 * @returns {Array} - The new array with elements removed from the end that meet the condition.
 *
 * @example
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropRightWhile({ 'user': 'pebbles', 'active': false });
 * => [{ 'user': 'barney', 'active': true }, { 'user': 'fred', 'active': false }]
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropRightWhile(['active', false]);
 * => [{ 'user': 'barney', 'active': true }]
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropRightWhile('active');
 * => [{ 'user': 'barney', 'active': true }]
 */
export function dropRightWhile(array: any[], predicate: Function | object | string | any[]): any[] {
  return _.dropRightWhile(array, predicate);
}
dropRightWhile.isFunction = true;
dropRightWhile.isTransform = true;

/**
 * Removes elements from the beginning of an array that satisfy the given condition.
 *
 * @param {Array} array - The array to modify.
 * @param {Function|Object|string|Array} predicate - The condition to test the elements against.
 *    - Can be an object to match the properties,
 *    - A function to test each element,
 *    - A string to check if the property exists,
 *    - Or an array for matching multiple conditions.
 * @returns {Array} - The new array with elements removed from the beginning that meet the condition.
 *
 * @example
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropWhile({ 'user': 'pebbles', 'active': false });
 * => [{ 'user': 'barney', 'active': true }, { 'user': 'fred', 'active': false }]
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropWhile(['active', false]);
 * => [{ 'user': 'barney', 'active': true }]
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | dropWhile('active');
 * => [{ 'user': 'fred', 'active': false }, { 'user': 'pebbles', 'active': false }]
 */
export function dropWhile(array: any[], predicate: Function | object | string | any[]): any[] {
  return _.dropWhile(array, predicate);
}
dropWhile.isFunction = true;
dropWhile.isTransform = true;

/**
 * Fills elements in an array with a specified value.
 *
 * @param {Array} array - The array to modify.
 * @param {any} value - The value to fill the array with.
 * @param {number} [start=0] - The start index to begin filling (inclusive).
 * @param {number} [end=array.length] - The end index to stop filling (exclusive).
 * @returns {Array} - The new array with the specified value filling the elements.
 *
 * @example
 * [1, 2, 3] | fill(4);
 * => [4, 4, 4]
 *
 * [1, 2, 3] | fill(4, 1, 2);
 * => [1, 4, 4]
 */
export function fill(array: any[], value: any, start: number = 0, end: number = array.length): any[] {
  return _.fill(array, value, start, end);
}
fill.isFunction = true;
fill.isTransform = true;

/**
 * Finds the index of the first element in an array that satisfies the given condition.
 *
 * @param {Array} array - The array to search.
 * @param {Function|Object|string|Array} predicate - The condition to test each element against.
 *    - Can be an object to match the properties,
 *    - A function to test each element,
 *    - A string to check if the property exists,
 *    - Or an array for matching multiple conditions.
 * @returns {number} - The index of the first element that satisfies the condition, or -1 if no match is found.
 *
 * @example
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findIndex({ 'user': 'fred', 'active': false });
 * => 1
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findIndex(['active', false]);
 * => 1
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findIndex('active');
 * => 0
 */
export function findIndex(array: any[], predicate: Function | object | string | any[]): number {
  return _.findIndex(array, predicate);
}
findIndex.isFunction = true;
findIndex.isTransform = true;

/**
 * Finds the index of the last element in an array that satisfies the given condition.
 *
 * @param {Array} array - The array to search.
 * @param {Function|Object|string|Array} predicate - The condition to test each element against.
 *    - Can be an object to match the properties,
 *    - A function to test each element,
 *    - A string to check if the property exists,
 *    - Or an array for matching multiple conditions.
 * @returns {number} - The index of the last element that satisfies the condition, or -1 if no match is found.
 *
 * @example
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findLastIndex({ 'user': 'fred', 'active': false });
 * => 2
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findLastIndex(['active', false]);
 * => 2
 *
 * [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ] | findLastIndex('active');
 * => 0
 */
export function findLastIndex(array: any[], predicate: Function | object | string | any[]): number {
  return _.findLastIndex(array, predicate);
}
findLastIndex.isFunction = true;
findLastIndex.isTransform = true;

/**
 * Flattens a nested array one level deep.
 *
 * @param {Array} array - The array to flatten.
 * @returns {Array} - The new array with one level of nested arrays flattened.
 *
 * @example
 * [1, [2, 3, [4]]] | flatten();
 * => [1, 2, 3, [4]]
 *
 * ['a', ['b', 'c']] | flatten();
 * => ['a', 'b', 'c']
 */
export function flatten(array: any[]): any[] {
  return _.flatten(array);
}
flatten.isFunction = true;
flatten.isTransform = true;

/**
 * Flattens a nested array completely, recursively.
 *
 * @param {Array} array - The array to flatten.
 * @returns {Array} - The new array with all nested arrays completely flattened.
 *
 * @example
 * [1, [2, 3, [4]]] | flattenDeep();
 * => [1, 2, 3, 4]
 *
 * ['a', [['b'], 'c']] | flattenDeep();
 * => ['a', 'b', 'c']
 */
export function flattenDeep(array: any[]): any[] {
  return _.flattenDeep(array);
}
flattenDeep.isFunction = true;
flattenDeep.isTransform = true;

/**
 * Flattens a mapped array up to a specified depth.
 *
 * @param {Array} array - The array to be mapped and flattened.
 * @param {Function} iteratee - The function invoked per element.
 * @param {number} depth - The maximum recursion depth.
 * @returns {Array} - The new flattened array.
 *
 * @example
 * [1, [2, [3, [4]], 5]] | flatMapDepth(1);
 * => [1, 2, [3, [4]], 5]
 *
 * [1, [2, [3, [4]], 5]] | flatMapDepth(2);
 * => [1, 2, 3, [4], 5]
 */
export function flatMapDepth(array: any[], iteratee: Function, depth: number): any[] {
  return _.flatMapDepth(array, iteratee, depth);
}
flatMapDepth.isFunction = true;
flatMapDepth.isTransform = true;

/**
 * Converts an array of key-value pairs into an object.
 *
 * @param {Array} pairs - The array of key-value pairs.
 * @returns {Object} - The resulting object.
 *
 * @example
 * [['a', 1], ['b', 2]] | fromPairs();
 * => { 'a': 1, 'b': 2 }
 *
 * [['name', 'fred'], ['age', 30]] | fromPairs();
 * => { name: 'fred', age: 30 }
 */
export function fromPairs(pairs: any[]): Record<string, any> {
  return _.fromPairs(pairs);
}
fromPairs.isFunction = true;
fromPairs.isTransform = true;

/**
 * Checks if all elements in a collection pass the predicate check.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function|Object|Array|string} predicate - The function or criteria to check against.
 * @returns {boolean} - Returns `true` if all elements pass the check, else `false`.
 *
 * @example
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * users | every({ 'user': 'barney', 'active': false });
 * => false
 *
 * users | every(['active', false]);
 * => true
 *
 * users | every('active');
 * => false
 */
export function every(collection: any, predicate?: any): boolean {
  return _.every(collection, predicate);
}
every.isFunction = true;
every.isTransform = true;

/**
 * Get all elements of an array except the last one.
 *
 * @param {Array} array - The array to process.
 * @returns {Array} - A new array excluding the last element.
 *
 * @example
 * [1, 2, 3] | initial();
 * => [1, 2]
 *
 * ['a', 'b', 'c'] | initial();
 * => ['a', 'b']
 */
export function initial(array: any[]): any[] {
  return _.initial(array);
}
initial.isFunction = true;
initial.isTransform = true;

/**
 * Returns a new array with the intersection of the provided arrays.
 *
 * @param {Array} array - The first array.
 * @param {...Array} arrays - Additional arrays to compare.
 * @returns {Array} - The array of intersecting values.
 *
 * @example
 * [1, 2, 3] | intersection([2, 1]);
 * => [1, 2]
 */
export function intersection(array: any[], ...arrays: any[]): any[] {
  return _.intersection(array, ...arrays);
}
intersection.isFunction = true;
intersection.isTransform = true;

/**
 * Creates an array of unique values that are included in all given arrays,
 * using a specified iteratee for comparison.
 *
 * @param {Array} array - The array to inspect.
 * @param {...Array} values - The arrays to compare.
 * @param {string|Function} iteratee - The iteratee invoked per element.
 * @returns {Array} - The new array of intersected values.
 *
 * @example
 * [{ 'x': 1 }] | intersectionBy([{ 'x': 2 }, { 'x': 1 }], 'x');
 * => [{'x': 1}]
 */
export function intersectionBy(array: any[], ...values: any[]): any[] {
  return _.intersectionBy(array, ...values);
}
intersectionBy.isFunction = true;
intersectionBy.isTransform = true;

/**
 * Creates an array of unique values that are included in all given arrays, using a comparator for equality checks.
 *
 * @param {Array} array - The array to inspect.
 * @param {Array} values - The other arrays to compare.
 * @param {Function} comparator - The comparator invoked per element.
 * @returns {Array} - The new array of intersecting values.
 *
 * @example
 * [{ 'x': 1 }] | intersectionWith([{ 'x': 2 }, { 'x': 1 }], isEqual);
 * => [{ 'x': 1 }]
 */
export function intersectionWith<T1, T2>(array: T1[], values: T2[], comparator: Comparator2<T1, T2>): any[] {
  return _.intersectionWith(array, values, comparator);
}
intersectionWith.isFunction = true;
intersectionWith.isTransform = true;

/**
 * Join elements of an array into a string, separated by a given separator.
 *
 * @param {Array} array - The array to join.
 * @param {string} separator - The separator to use between elements.
 * @returns {string} - The joined string.
 *
 * @example
 * ['a', 'b', 'c'] | join('~');
 * => 'a~b~c'
 */
export function join(array: any[], separator: string): string {
  return _.join(array, separator);
}
join.isFunction = true;
join.isTransform = true;

/**
 * Removes all elements from an array that are equal to the given values.
 *
 * @param {Array} array - The array to modify.
 * @param {...any} values - The values to remove from the array.
 * @returns {Array} - The modified array with the specified values removed.
 *
 * @example
 * [1, 2, 3, 1, 2, 3] | pull(2, 3);
 * => [1, 1]
 */
export function pull(array: any[], ...values: any[]): any[] {
  return _.pull(array, ...values);
}
pull.isFunction = true;
pull.isTransform = true;

/**
 * Remove all occurrences of the specified values from an array.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to remove from the array.
 * @returns {Array} - The modified array with specified values removed.
 *
 * @example
 * [1, 2, 3, 1, 2, 3] | pullAll([2, 3]);
 * => [1, 1]
 */
export function pullAll(array: any[], values: any[]): any[] {
  return _.pullAll(array, values);
}
pullAll.isFunction = true;
pullAll.isTransform = true;

/**
 * Removes all elements from an array that are included in a given values array, based on a specific criterion.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to remove from the array.
 * @param {string} iteratee - The property or function to compare the values by.
 * @returns {Array} - The modified array.
 *
 * @example
 * [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }] | pullAllBy([{ 'x': 1 }, { 'x': 3 }], 'x');
 * => [{ 'x': 2 }]
 */
export function pullAllBy(array: any[], values: any[], iteratee: string): any[] {
  return _.pullAllBy(array, values, iteratee);
}
pullAllBy.isFunction = true;
pullAllBy.isTransform = true;

/**
 * Removes elements from an array that are equal to elements in a given array,
 * using a comparator function to determine equality.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to compare against.
 * @param {Function} comparator - The function used to compare elements.
 * @returns {Array} - The modified array.
 *
 * @example
 * [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }] | pullAllWith([{ 'x': 3, 'y': 4 }], isEqual);
 * => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
export function pullAllWith<T>(array: T[], values: T[], comparator: Comparator<T>): any[] {
  return _.pullAllWith(array, values, comparator);
}
pullAllWith.isFunction = true;
pullAllWith.isTransform = true;

/**
 * Removes elements from an array corresponding to the given indexes.
 *
 * @param {Array} array - The array to remove elements from.
 * @param {...number} indexes - The indexes of elements to remove.
 * @returns {Array} - The array of removed elements.
 *
 * @example
 * [5, 10, 15, 20] | pullAt(1, 3);
 * => [10, 20]
 */
export function pullAt(array: any[], ...indexes: number[]): any[] {
  return _.pullAt(array, ...indexes);
}
pullAt.isFunction = true;
pullAt.isTransform = true;

/**
 * Reverse the order of elements in an array.
 *
 * @param {Array} array - The array to be reversed.
 * @returns {Array} - The reversed array.
 *
 * @example
 * [1, 2, 3] | reverse();
 * => [3, 2, 1]
 *
 * @example
 * ['a', 'b', 'c'] | reverse();
 * => ['c', 'b', 'a']
 */
export function reverse(array: any[]): any[] {
  return _.reverse(array);
}
reverse.isFunction = true;
reverse.isTransform = true;

/**
 * Slice an array from a start position to an end position, excluding the end itself.
 *
 * @param {Array} array - The array to be sliced.
 * @param {number} start - The start position of the slice.
 * @param {number} end - The end position of the slice (exclusive).
 * @returns {Array} - The sliced array.
 *
 * @example
 * [1, 2, 3] | slice(0, 2);
 * => [2, 1]
 */
export function slice(array: any[], start: number, end: number): any[] {
  return _.slice(array, start, end);
}
slice.isFunction = true;
slice.isTransform = true;

/**
 * Find the smallest index at which a value should be inserted into a sorted array
 * to maintain its sorted order using binary search.
 *
 * @param {Array} array - The sorted array to be searched.
 * @param {number} value - The value to be inserted into the array.
 * @returns {number} - The index at which the value should be inserted.
 *
 * @example
 * [30, 50] | sortedIndex(40);
 * => 1
 */
export function sortedIndex(array: any[], value: number): number {
  return _.sortedIndex(array, value);
}
sortedIndex.isFunction = true;
sortedIndex.isTransform = true;

/**
 * Find the smallest index at which a value should be inserted into a sorted array
 * to maintain its sorted order using binary search, with an iteratee for custom comparison.
 *
 * @param {Array} array - The sorted array to be searched.
 * @param {any} value - The value to be inserted into the array.
 * @param {Function} iteratee - The iteratee function to customize the comparison.
 * @returns {number} - The index at which the value should be inserted.
 *
 * @example
 * [{ 'x': 4 }, { 'x': 5 }] | sortedIndexBy({ 'x': 4 }, 'x');
 * => 0
 */
export function sortedIndexBy(array: any[], value: any, iteratee: string | Function): number {
  return _.sortedIndexBy(array, value, iteratee);
}
sortedIndexBy.isFunction = true;
sortedIndexBy.isTransform = true;

/**
 * Find the largest index at which a value should be inserted into a sorted array
 * to maintain its sorted order using binary search.
 *
 * @param {Array} array - The sorted array to be searched.
 * @param {any} value - The value to be inserted into the array.
 * @returns {number} - The index at which the value should be inserted.
 *
 * @example
 * [4, 5, 5, 5, 6] | sortedLastIndex(5);
 * => 4
 */
export function sortedLastIndex(array: any[], value: any): number {
  return _.sortedLastIndex(array, value);
}
sortedLastIndex.isFunction = true;
sortedLastIndex.isTransform = true;

/**
 * Find the largest index at which a value should be inserted into a sorted array
 * to maintain its sorted order using binary search, with an iteratee for custom comparison.
 *
 * @param {Array} array - The sorted array to be searched.
 * @param {any} value - The value to be inserted into the array.
 * @param {Function} iteratee - The iteratee function to customize the comparison.
 * @returns {number} - The index at which the value should be inserted.
 *
 * @example
 * [{ 'x': 4 }, { 'x': 5 }] | sortedLastIndexBy({ 'x': 4 }, 'x');
 * => 1
 */
export function sortedLastIndexBy(array: any[], value: any, iteratee: string | Function): number {
  return _.sortedLastIndexBy(array, value, iteratee);
}
sortedLastIndexBy.isFunction = true;
sortedLastIndexBy.isTransform = true;

/**
 * Create a sorted array of unique values, optimized for sorted arrays.
 *
 * @param {Array} array - The sorted array to be processed.
 * @returns {Array} - The array of unique values.
 *
 * @example
 * [1, 1, 2] | sortedUniq();
 * => [1, 2]
 */
export function sortedUniq(array: any[]): any[] {
  return _.sortedUniq(array);
}
sortedUniq.isFunction = true;
sortedUniq.isTransform = true;

/**
 * Create a sorted array of unique values, optimized for sorted arrays, with an iteratee for custom comparison.
 *
 * @param {Array} array - The sorted array to be processed.
 * @param {Function|string} iteratee - The iteratee function or property name for custom uniqueness comparison.
 * @returns {Array} - The array of unique values.
 *
 * @example
 * [1.1, 1.2, 2.3, 2.4] | sortedUniqBy(Math.floor);
 * => [1.1, 2.3]
 *
 * [{ 'x': 4 }, { 'x': 4 }, { 'x': 5 }] | sortedUniqBy('x');
 * => [{ 'x': 4 }, { 'x': 5 }]
 */
export function sortedUniqBy(array: any[], iteratee: string | Function): any[] {
  return _.sortedUniqBy(array, iteratee);
}
sortedUniqBy.isFunction = true;
sortedUniqBy.isTransform = true;

/**
 * Create a slice of the array with the first `n` elements.
 *
 * @param {Array} array - The array to be sliced.
 * @param {number} [n=1] - The number of elements to take.
 * @returns {Array} - The sliced array.
 *
 * @example
 * [1, 2, 3] | take();
 * => [1]
 *
 * [1, 2, 3] | take(2);
 * => [1, 2]
 */
export function take(array: any[], n: number = 1): any[] {
  return _.take(array, n);
}
take.isFunction = true;
take.isTransform = true;

/**
 * Create a slice of the array with the last `n` elements.
 *
 * @param {Array} array - The array to be sliced.
 * @param {number} [n=1] - The number of elements to take from the end.
 * @returns {Array} - The sliced array.
 *
 * @example
 * [1, 2, 3] | takeRight();
 * => [3]
 *
 * [1, 2, 3] | takeRight(2);
 * => [2, 3]
 */
export function takeRight(array: any[], n: number = 1): any[] {
  return _.takeRight(array, n);
}
takeRight.isFunction = true;
takeRight.isTransform = true;

/**
 * Create a slice of the array with the last elements, based on the predicate returning falsy.
 *
 * @param {Array} array - The array to be processed.
 * @param {Function|string} predicate - The function or property name for the condition.
 * @returns {Array} - The slice of elements taken.
 *
 * @example
 * [{ 'user': 'barney', 'active': true }] | takeRightWhile({ 'user': 'pebbles', 'active': false });
 * => [{ 'user': 'pebbles', 'active': false }]
 */
export function takeRightWhile(array: any[], predicate: any): any[] {
  return _.takeRightWhile(array, predicate);
}
takeRightWhile.isFunction = true;
takeRightWhile.isTransform = true;

/**
 * Create a slice of the array with the first elements, based on the predicate returning falsy.
 *
 * @param {Array} array - The array to be processed.
 * @param {Function|string} predicate - The function or property name for the condition.
 * @returns {Array} - The slice of elements taken.
 *
 * @example
 * [{ 'user': 'barney', 'active': true }] | takeWhile({ 'user': 'pebbles', 'active': false });
 * => [{ 'user': 'pebbles', 'active': false }]
 */
export function takeWhile(array: any[], predicate: any): any[] {
  return _.takeWhile(array, predicate);
}
takeWhile.isFunction = true;
takeWhile.isTransform = true;

/**
 * Create a new array of unique values, based on the order of elements.
 *
 * @param {Array} array - The array to be processed.
 * @returns {Array} - The array of unique values.
 *
 * @example
 * [1, 2] | union([2]);
 * => [1, 2]
 */
export function union(array: any[], ...values: any[]): any[] {
  return _.union(array, ...values);
}
union.isFunction = true;
union.isTransform = true;

/**
 * Create a new array of unique values, based on an iteratee for custom comparison.
 *
 * @param {Array} array - The array to be processed.
 * @param {Function|string} iteratee - The iteratee function or property name for custom uniqueness comparison.
 * @returns {Array} - The array of unique values.
 *
 * @example
 * [{ 'x': 2 }, { 'x': 1 }] | unionBy([{ 'x': 1 }], 'x');
 * => [{ 'x': 1 }, { 'x': 2 }]
 */
export function unionBy(array: any[], values: any[], iteratee: string | Function): any[] {
  return _.unionBy(array, values, iteratee);
}
unionBy.isFunction = true;
unionBy.isTransform = true;

/**
 * Create a new array of unique values, based on a comparator function for custom comparison.
 *
 * @param {Array} array - The array to be processed.
 * @param {Array} values - The values to be compared.
 * @param {Function} comparator - The comparator function.
 * @returns {Array} - The array of unique values.
 *
 * @example
 * [{ 'x': 1, 'y': 2 }] | unionWith([{ 'x': 1, 'y': 2 }], isEqual);
 * => [{ 'x': 1, 'y': 2 }]
 */
export function unionWith<T>(array: T[], values: T[], comparator?: Comparator<T>): any[] {
  return _.unionWith(array, values, comparator);
}
unionWith.isFunction = true;
unionWith.isTransform = true;
