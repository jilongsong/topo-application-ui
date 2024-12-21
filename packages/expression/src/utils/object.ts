import * as _ from 'lodash-es';

/**
 * Find the first key in an object that satisfies the predicate function.
 *
 * @param {Object} object - The object to search.
 * @param {Function} predicate - The function to test each value.
 * @returns {string|undefined} - The key of the first element that satisfies the predicate.
 *
 * @example
 * {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * } | findKey({ 'age': 1, 'active': true });
 * => 'pebbles'
 *
 * {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * } | findKey(['active', false]);
 * => 'fred'
 */
export function findKey(object: any, predicate: any): any {
  return _.findKey(object, predicate);
}
findKey.isFunction = true;
findKey.isTransform = true;

/**
 * Find the last key in an object that satisfies the predicate function, starting from the end.
 *
 * @param {Object} object - The object to search.
 * @param {Function} predicate - The function to test each value.
 * @returns {string|undefined} - The key of the last element that satisfies the predicate.
 *
 * @example
 * {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * } | findLastKey({ 'age': 1, 'active': true });
 * => 'pebbles'
 *
 * {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * } | findLastKey(['active', false]);
 * => 'fred'
 */
export function findLastKey(object: any, predicate: any): any {
  return _.findLastKey(object, predicate);
}
findLastKey.isFunction = true;
findLastKey.isTransform = true;

/**
 * Safely get the value at a given path in an object.
 *
 * @param {Object} object - The object to retrieve the value from.
 * @param {string} path - The path to the value.
 * @param {*} [defaultValue] - The default value to return if the path doesn't exist.
 * @returns {*} - The value at the given path or the default value.
 *
 * @example
 * { 'a': { 'b': 2 } } | get('a.b');
 * => 2
 *
 * { 'a': { 'b': { 'c': 3 } } } | get('a.b.c', 'default');
 * => 3
 *
 * {} | get('a.b', 'default');
 * => 'default'
 */
export function get(object: any, path: string, defaultValue?: any): any {
  return _.get(object, path, defaultValue);
}
get.isFunction = true;
get.isTransform = true;

/**
 * Check if a given path exists as a direct property in an object.
 *
 * @param {Object} object - The object to check.
 * @param {string} path - The path to check for.
 * @returns {boolean} - True if the path exists as a direct property, otherwise false.
 *
 * @example
 * { 'a': { 'b': 2 } } | has('a.b');
 * => true
 *
 * { 'a': { 'b': { 'c': 3 } } } | has('a.b.c');
 * => true
 *
 * {} | has('a.b');
 * => false
 */
export function has(object: any, path: string): boolean {
  return _.has(object, path);
}
has.isFunction = true;
has.isTransform = true;

/**
 * Invert the keys and values of an object. If values are duplicated, later values overwrite earlier ones.
 *
 * @param {Object} object - The object to invert.
 * @returns {Object} - The object with inverted keys and values.
 *
 * @example
 * { 'a': 1, 'b': 2, 'c': 1 } | invert;
 * => { '1': 'c', '2': 'b' }
 */
export function invert(object: any): any {
  return _.invert(object);
}
invert.isFunction = true;
invert.isTransform = true;

/**
 * Invert the keys and values of an object using an iteratee function to determine the new values.
 *
 * @param {Object} object - The object to invert.
 * @param {Function} iteratee - The function to generate the inverted values.
 * @returns {Object} - The object with inverted keys and values.
 *
 * @example
 * { 'a': 1, 'b': 2, 'c': 1 } | invertBy;
 * => { '1': ['a', 'c'], '2': ['b'] }
 */
export function invertBy(object: any, iteratee: any): any {
  return _.invertBy(object, iteratee);
}
invertBy.isFunction = true;
invertBy.isTransform = true;

/**
 * Invoke a method at a given path in an object with arguments.
 *
 * @param {Object} object - The object containing the method to invoke.
 * @param {string} path - The path to the method.
 * @param {...*} args - The arguments to pass to the method.
 * @returns {*} - The result of invoking the method.
 *
 * @example
 * { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] } | invoke('a[0].b.c.slice', 1, 3);
 * => [2, 3]
 */
export function invoke(object: any, path: string, ...args: any[]): any {
  return _.invoke(object, path, ...args);
}
invoke.isFunction = true;
invoke.isTransform = true;

/**
 * Get the keys of an object.
 *
 * @param {Object} object - The object to get the keys from.
 * @returns {Array} - The keys of the object.
 *
 * @example
 * { 'a': 1, 'b': 2 } | keys();
 * => ['a', 'b']
 *
 * ['a', 'b', 'c'] | keys();
 * => ['0', '1', '2']
 */
export function keys(object: any): string[] {
  return _.keys(object);
}
keys.isFunction = true;
keys.isTransform = true;

/**
 * Create a new object with the same keys as the original object, but with values generated by an iteratee function.
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} iteratee - The function to transform each value.
 * @returns {Object} - The new object with transformed values.
 *
 * @example
 * {
 *   'fred': { 'user': 'fred', 'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * } | mapValues('age');
 * => { 'fred': 40, 'pebbles': 1 }
 */
export function mapValues(object: any, iteratee: any): any {
  return _.mapValues(object, iteratee);
}
mapValues.isFunction = true;
mapValues.isTransform = true;

/**
 * Deeply merge multiple objects.
 *
 * @param {Object} object - The base object.
 * @param {...Object} sources - The objects to merge into the base object.
 * @returns {Object} - The merged object.
 *
 * @example
 * { 'a': { 'b': 2 } } | merge({ 'c': 3 });
 * => { 'a': { 'b': 2 }, 'c': 3 }
 *
 * { 'a': [1], 'b': [2] } | merge({ 'a': [3], 'c': [4] });
 * => { 'a': [3], 'b': [2], 'c': [4] }
 */
export function merge(object: any, ...sources: any[]): any {
  return _.merge(object, ...sources);
}
merge.isFunction = true;
merge.isTransform = true;

/**
 * Create a new object excluding the specified properties.
 *
 * @param {Object} object - The object to omit properties from.
 * @param {Array} props - The properties to omit.
 * @returns {Object} - The new object with the omitted properties.
 *
 * @example
 * { 'a': 1, 'b': '2', 'c': 3 } | omit(['a', 'c']);
 * => { 'b': '2' }
 */
export function omit(object: any, props: string[]): any {
  return _.omit(object, props);
}
omit.isFunction = true;
omit.isTransform = true;

/**
 * Create a new object excluding properties based on a predicate function.
 *
 * @param {Object} object - The object to omit properties from.
 * @param {Function} predicate - The function to test each property.
 * @returns {Object} - The new object with the omitted properties.
 *
 * @example
 * { 'a': 1, 'b': '2', 'c': 3 } | omitBy(isNumber);
 * => { 'b': '2' }
 */
export function omitBy(object: any, predicate: any): any {
  return _.omitBy(object, predicate);
}
omitBy.isFunction = true;
omitBy.isTransform = true;

/**
 * Create a new object with only the specified properties.
 *
 * @param {Object} object - The object to pick properties from.
 * @param {Array} props - The properties to pick.
 * @returns {Object} - The new object with only the picked properties.
 *
 * @example
 * { 'a': 1, 'b': '2', 'c': 3 } | pick(['a', 'c']);
 * => { 'a': 1, 'c': 3 }
 */
export function pick(object: any, props: string[]): any {
  return _.pick(object, props);
}
pick.isFunction = true;
pick.isTransform = true;

/**
 * Create a new object with properties that satisfy a predicate function.
 *
 * @param {Object} object - The object to pick properties from.
 * @param {Function} predicate - The function to test each property.
 * @returns {Object} - The new object with only the properties that pass the predicate.
 *
 * @example
 * { 'a': 1, 'b': '2', 'c': 3 } | pickBy(isNumber);
 * => { 'a': 1, 'c': 3 }
 */
export function pickBy(object: any, predicate: any): any {
  return _.pickBy(object, predicate);
}
pickBy.isFunction = true;
pickBy.isTransform = true;

/**
 * Get the values of an object's properties.
 *
 * @param {Object} object - The object to get the values from.
 * @returns {Array} - The values of the object's properties.
 *
 * @example
 * { 'a': 1, 'b': 2 } | values();
 * => [1, 2]
 *
 * ['a', 'b', 'c'] | values();
 * => ['a', 'b', 'c']
 */
export function values(object: any): any[] {
  return _.values(object);
}
values.isFunction = true;
values.isTransform = true;

/**
 * Safely set the value at a given path in an object.
 *
 * @param {Object} object - The object to set the value in.
 * @param {string} path - The path to the value.
 * @param {*} value - The value to set.
 * @returns {Object} - The updated object.
 *
 * @example
 * { 'a': { 'b': 2 } } | set('a.b', 3);
 * => { 'a': { 'b': 3 } }
 *
 * { 'a': { 'b': { 'c': 3 } } } | set('a.b.c', 'default');
 * => { 'a': { 'b': { 'c': 'default' } } }
 */
export function set(object: any, path: string, value: any): any {
  return _.set(object, path, value);
}
set.isFunction = true;
set.isTransform = true;

/**
 * Remove a property at a given path in an object.
 *
 * @param {Object} object - The object to remove the property from.
 * @param {string} path - The path to the property to remove.
 * @returns {boolean} - True if the property was removed, otherwise false.
 *
 * @example
 * { 'a': [{ 'b': { 'c': 7 } }] } | unset('a[0].b.c');
 * => true
 */
export function unset(object: any, path: string): boolean {
  return _.unset(object, path);
}
unset.isFunction = true;
unset.isTransform = true;
