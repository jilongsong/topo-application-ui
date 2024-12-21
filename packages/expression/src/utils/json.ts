import { JSONPath, JSONPathOptions } from 'jsonpath-plus';

/**
 * Query an object using jsonpath.
 *
 * @param {any} data - The data to query.
 * @param {string} path - The jsonpath expression to query the data.
 * @param {JSONPathOptions} [options] - Optional options for the query.
 * @returns {any} - The result of the query.
 *
 * @example
 * jpQuery({ a: { b: 1 } }, '$.a.b')
 * => 1
 */
export function jpQuery(data: any, path: string, options?: Omit<JSONPathOptions, 'json' | 'path'>): any {
  return JSONPath({ path, json: data, ...options });
}
jpQuery.isFunction = true;
jpQuery.isTransform = true;
