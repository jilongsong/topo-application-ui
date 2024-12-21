import * as _ from 'lodash-es';

/**
 * Convert a string to camel case.
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The camel-cased string.
 *
 * @example
 * 'Foo Bar' | camelCase();
 * => 'fooBar'
 *
 * '--foo-bar--' | camelCase();
 * => 'fooBar'
 */
export function camelCase(str: string): string {
  return _.camelCase(str);
}
camelCase.isFunction = true;
camelCase.isTransform = true;

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} - The string with the first letter capitalized.
 *
 * @example
 * 'FRED' | capitalize();
 * => 'Fred'
 *
 * 'fred' | capitalize();
 * => 'Fred'
 */
export function capitalize(str: string): string {
  return _.capitalize(str);
}
capitalize.isFunction = true;
capitalize.isTransform = true;

/**
 * Check if a string ends with the given target.
 *
 * @param {string} str - The string to be checked.
 * @param {string} target - The target string.
 * @param {number} [position] - The position to check up to.
 * @returns {boolean} - Returns true if the string ends with the target.
 *
 * @example
 * 'abc' | endsWith('c');
 * => true
 *
 * 'abc' | endsWith('b');
 * => false
 *
 * 'abc' | endsWith('b', 1);
 * => true
 */
export function endsWith(str: string, target: string, position?: number): boolean {
  return _.endsWith(str, target, position);
}
endsWith.isFunction = true;
endsWith.isTransform = true;

/**
 * Convert a string to kebab case (lowercase with hyphens).
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The kebab-cased string.
 *
 * @example
 * 'Foo Bar' | kebabCase();
 * => 'foo-bar'
 *
 * 'fooBar' | kebabCase();
 * => 'foo-bar'
 */
export function kebabCase(str: string): string {
  return _.kebabCase(str);
}
kebabCase.isFunction = true;
kebabCase.isTransform = true;

/**
 * Convert a string to lowercase and remove spaces between words.
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The lowercase string.
 *
 * @example
 * 'Foo Bar' | lowerCase();
 * => 'foobar'
 *
 * '--Foo Bar--' | lowerCase();
 * => 'foobar'
 */
export function lowerCase(str: string): string {
  return _.lowerCase(str);
}
lowerCase.isFunction = true;
lowerCase.isTransform = true;

/**
 * Convert the first letter of a string to lowercase.
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The string with the first letter in lowercase.
 *
 * @example
 * 'Fred' | lowerFirst();
 * => 'fred'
 *
 * 'FRED' | lowerFirst();
 * => 'fRED'
 */
export function lowerFirst(str: string): string {
  return _.lowerFirst(str);
}
lowerFirst.isFunction = true;
lowerFirst.isTransform = true;

/**
 * Pad a string to a specified length with spaces or other characters.
 *
 * @param {string} str - The string to be padded.
 * @param {number} length - The target length of the string.
 * @param {string} [chars=' '] - The characters used to pad the string.
 * @returns {string} - The padded string.
 *
 * @example
 * 'abc' | pad(8);
 * => '  abc   '
 *
 * 'abc' | pad(8, '_-');
 * => '_-abc_-_'
 */
export function pad(str: string, length: number, chars: string = ' '): string {
  return _.pad(str, length, chars);
}
pad.isFunction = true;
pad.isTransform = true;

/**
 * Pad a string to a specified length, with padding at the end of the string.
 *
 * @param {string} str - The string to be padded.
 * @param {number} length - The target length of the string.
 * @param {string} [chars=' '] - The characters used to pad the string.
 * @returns {string} - The padded string.
 *
 * @example
 * 'abc' | padEnd(8);
 * => 'abc****'
 *
 * 'abc' | padEnd(8, '_-');
 * => 'abc_-__'
 */
export function padEnd(str: string, length: number, chars: string = ' '): string {
  return _.padEnd(str, length, chars);
}
padEnd.isFunction = true;
padEnd.isTransform = true;

/**
 * Pad a string to a specified length, with padding at the start of the string.
 *
 * @param {string} str - The string to be padded.
 * @param {number} length - The target length of the string.
 * @param {string} [chars=' '] - The characters used to pad the string.
 * @returns {string} - The padded string.
 *
 * @example
 * 'abc' | padStart(8);
 * => '****abc'
 *
 * 'abc' | padStart(8, '_-');
 * => '_-__abc'
 */
export function padStart(str: string, length: number, chars: string = ' '): string {
  return _.padStart(str, length, chars);
}
padStart.isFunction = true;
padStart.isTransform = true;

/**
 * Parse a string and return an integer of the specified radix (base).
 *
 * @param {string} str - The string to be parsed.
 * @param {number} [radix=10] - The base of the number.
 * @returns {number} - The parsed integer.
 *
 * @example
 * '10' | parseInt;
 * => 10
 *
 * '10' | parseInt(2);
 * => 3
 */
export function parseInt(str: string, radix: number = 10): number {
  return _.parseInt(str, radix);
}
parseInt.isFunction = true;
parseInt.isTransform = true;

/**
 * Repeat a string n times.
 *
 * @param {string} str - The string to be repeated.
 * @param {number} n - The number of times to repeat the string.
 * @returns {string} - The repeated string.
 *
 * @example
 * '*' | repeat(3);
 * => '***'
 *
 * 'abc' | repeat(2);
 * => 'abcabc'
 */
export function repeat(str: string, n: number): string {
  return _.repeat(str, n);
}
repeat.isFunction = true;
repeat.isTransform = true;

/**
 * Replace a substring within a string with a new substring.
 *
 * @param {string} str - The string to be modified.
 * @param {string} target - The substring to be replaced.
 * @param {string} replacement - The replacement substring.
 * @returns {string} - The modified string.
 *
 * @example
 * 'Hi Fred' | replace('Fred', 'Barney');
 * => 'Hi Barney'
 *
 * 'abc' | replace('b', 'd');
 * => 'adc'
 */
export function replace(str: string, target: string, replacement: string): string {
  return _.replace(str, target, replacement);
}
replace.isFunction = true;
replace.isTransform = true;

/**
 * Convert a string to snake case (lowercase with underscores).
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The snake-cased string.
 *
 * @example
 * 'Foo Bar' | snakeCase();
 * => 'foo_bar'
 *
 * 'fooBar' | snakeCase();
 * => 'foo_bar'
 */
export function snakeCase(str: string): string {
  return _.snakeCase(str);
}
snakeCase.isFunction = true;
snakeCase.isTransform = true;

/**
 * Split a string into an array using a specified separator.
 *
 * @param {string} str - The string to be split.
 * @param {string|RegExp} separator - The separator to split by.
 * @returns {Array} - The array of split strings.
 *
 * @example
 * 'a-b-c' | split('-');
 * => ['a', 'b', 'c']
 *
 * 'a b c' | split(' ');
 * => ['a', 'b', 'c']
 */
export function split(str: string, separator: string | RegExp): string[] {
  return _.split(str, separator);
}
split.isFunction = true;
split.isTransform = true;

/**
 * Convert a string to start case (capitalize the first letter of each word).
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The start-cased string.
 *
 * @example
 * '--foo-bar--' | startCase();
 * => 'Foo Bar'
 *
 * 'fooBar' | startCase();
 * => 'Foo Bar'
 */
export function startCase(str: string): string {
  return _.startCase(str);
}
startCase.isFunction = true;
startCase.isTransform = true;

/**
 * Check if a string starts with a given target.
 *
 * @param {string} str - The string to be checked.
 * @param {string} target - The target string.
 * @param {number} [position] - The position to check from.
 * @returns {boolean} - Returns true if the string starts with the target.
 *
 * @example
 * 'abc' | startsWith('a');
 * => true
 *
 * 'abc' | startsWith('b');
 * => false
 */
export function startsWith(str: string, target: string, position?: number): boolean {
  return _.startsWith(str, target, position);
}
startsWith.isFunction = true;
startsWith.isTransform = true;

/**
 * Convert a string to lowercase.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} - The string in lowercase.
 *
 * @example
 * 'FRED' | toLower();
 * => 'fred'
 *
 * 'Hello World' | toLower();
 * => 'hello world'
 */
export function toLower(string: string): string {
  return _.toLower(string);
}
toLower.isFunction = true;
toLower.isTransform = true;

/**
 * Convert a string to uppercase.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} - The string in uppercase.
 *
 * @example
 * 'fred' | toUpper();
 * => 'FRED'
 *
 * 'hello world' | toUpper();
 * => 'HELLO WORLD'
 */
export function toUpper(string: string): string {
  return _.toUpper(string);
}
toUpper.isFunction = true;
toUpper.isTransform = true;

/**
 * Trim whitespace from both ends of a string.
 *
 * @param {string} string - The string to be trimmed.
 * @returns {string} - The trimmed string.
 *
 * @example
 * '  fred  ' | trim();
 * => 'fred'
 *
 * '  barney  ' | trim();
 * => 'barney'
 */
export function trim(string: string): string {
  return _.trim(string);
}
trim.isFunction = true;
trim.isTransform = true;

/**
 * Trim whitespace from the end of a string.
 *
 * @param {string} string - The string to be trimmed.
 * @returns {string} - The trimmed string.
 *
 * @example
 * '  fred  ' | trimEnd();
 * => '  fred'
 *
 * '  barney  ' | trimEnd();
 * => '  barney'
 */
export function trimEnd(string: string): string {
  return _.trimEnd(string);
}
trimEnd.isFunction = true;
trimEnd.isTransform = true;

/**
 * Trim whitespace from the start of a string.
 *
 * @param {string} string - The string to be trimmed.
 * @returns {string} - The trimmed string.
 *
 * @example
 * '  fred  ' | trimStart();
 * => 'fred  '
 *
 * '  barney  ' | trimStart();
 * => 'barney  '
 */
export function trimStart(string: string): string {
  return _.trimStart(string);
}
trimStart.isFunction = true;
trimStart.isTransform = true;

/**
 * Truncate a string if it exceeds the specified length, appending an ellipsis.
 *
 * @param {string} string - The string to be truncated.
 * @param {Object} options - The options for truncating.
 * @param {number} options.length - The maximum length of the string.
 * @param {string} [options.omission='...'] - The omission string.
 * @param {string} [options.separator] - The separator to break the string.
 * @returns {string} - The truncated string.
 *
 * @example
 * 'Hello World' | truncate({ length: 5 });
 * => 'Hello...'
 *
 * 'Hello World' | truncate({ length: 5, 'separator': ' ' });
 * => 'Hello...'
 *
 * 'Hello World' | truncate({ length: 5, 'omission': '[...]' });
 * => 'Hello[...]'
 */
export function truncate(string: string, options: { length: number; omission?: string; separator?: string }): string {
  return _.truncate(string, options);
}
truncate.isFunction = true;
truncate.isTransform = true;

/**
 * Convert a string to uppercase and remove spaces between words.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} - The uppercase string without spaces.
 *
 * @example
 * '--foo-bar--' | upperCase();
 * => 'FOOBAR'
 *
 * 'fooBar' | upperCase();
 * => 'FOOBAR'
 *
 * '__FOO_BAR__' | upperCase();
 * => 'FOOBAR'
 */
export function upperCase(string: string): string {
  return _.upperCase(string);
}
upperCase.isFunction = true;
upperCase.isTransform = true;

/**
 * Convert the first character of a string to uppercase.
 *
 * @param {string} string - The string to be converted.
 * @returns {string} - The string with the first character in uppercase.
 *
 * @example
 * 'fred' | upperFirst();
 * => 'Fred'
 *
 * 'FRED' | upperFirst();
 * => 'FRED'
 */
export function upperFirst(string: string): string {
  return _.upperFirst(string);
}
upperFirst.isFunction = true;
upperFirst.isTransform = true;

/**
 * Split a string into an array of words.
 *
 * @param {string} string - The string to be split.
 * @param {RegExp} [pattern] - The pattern used to split the string.
 * @returns {Array} - An array of words.
 *
 * @example
 * 'fred, barney, & pebbles' | words();
 * => ['fred', 'barney', '&', 'pebbles']
 *
 * 'fred, barney, & pebbles' | words(/[^, ]+/g);
 * => ['fred', 'barney', '&', 'pebbles']
 */
export function words(string: string, pattern?: RegExp): string[] {
  return _.words(string, pattern);
}
words.isFunction = true;
words.isTransform = true;
