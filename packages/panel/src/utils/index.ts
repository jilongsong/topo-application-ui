import { CalendarDate, DateValue } from '@internationalized/date';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isNotNestedPath } from 'vee-validate';
import type { z } from 'zod';

import { FieldType, PanelConfig } from '../schema';

dayjs.extend(customParseFormat);

export function parseStringToDateValue(dateString: string, formatString: string): DateValue {
  const date = dayjs(dateString, formatString);
  if (!date.isValid()) throw new Error('Invalid date format');

  return new CalendarDate(date.year(), date.month() + 1, date.date());
}

// 将 DateValue 格式化为指定格式的字符串
export function formatDateValueToString(dateValue: DateValue, formatString: string): string {
  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  return dayjs(date).format(formatString);
}

export function parseConfig<T>(config: PanelConfig<T>, defaultValues: Partial<T> = {}): T {
  const result: any = {};

  for (const key in config.fields) {
    const fieldConfig = config.fields[key] as any;

    // 如果存在 defaultValue，则设置为该字段的值
    if (defaultValues[key] !== undefined) {
      result[key] = defaultValues[key];
    } else if (fieldConfig.defaultValue !== undefined) {
      // 使用 config 中的 defaultValue
      result[key] = fieldConfig.defaultValue;
    } else if (fieldConfig.type === FieldType.Object && fieldConfig.fields) {
      // 递归解析 Object 类型的嵌套字段
      result[key] = parseConfig(fieldConfig.fields, defaultValues[key] || {});
    } else if (fieldConfig.type === FieldType.Array && fieldConfig.field) {
      // 初始化 Array 类型字段为空数组
      result[key] = [];
    } else {
      result[key] = undefined;
    }
  }

  return result as T;
}

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // Remove bracketed indices
  // if numbers only return the string
  let output = string.replace(/\[\d+\]/g, '').replace(/([A-Z])/g, ' $1');
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
}

/**
 * Parse string and extract the index
 * @param string
 * @returns index or undefined
 */
export function getIndexIfArray(string: string) {
  const indexRegex = /\[(\d+)\]/;
  // Match the index
  const match = string.match(indexRegex);
  // Extract the index (number)
  const index = match ? Number.parseInt(match[1]) : undefined;
  return index;
}

export function getLastIndexIfArray(string: string) {
  // 使用正则表达式提取所有方括号中的数字
  const matches = string.match(/\[(\d+)\]/g);

  // 如果没有匹配到任何方括号中的数字，返回 null
  if (!matches) return undefined;

  // 提取数字部分并将其转换为数字数组
  const indices = matches.map((match) => parseInt(match.replace(/\[|\]/g, '')));

  // 返回数组中的最后一个数字
  return indices[indices.length - 1];
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny>(
  schema: ChildType | z.ZodEffects<ChildType>
): ChildType | null {
  if (!schema) return null;
  if ('innerType' in schema._def) return getBaseSchema(schema._def.innerType as ChildType);

  if ('schema' in schema._def) return getBaseSchema(schema._def.schema as ChildType);

  return schema as ChildType;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny) {
  const baseSchema = getBaseSchema(schema);
  return baseSchema ? baseSchema._def.typeName : '';
}

/**
 * Search for a "ZodDefault" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<z.ZodNumber | z.ZodString>;

  if (typedSchema._def.typeName === 'ZodDefault') return typedSchema._def.defaultValue();

  if ('innerType' in typedSchema._def) {
    return getDefaultValueInZodStack(typedSchema._def.innerType as unknown as z.ZodAny);
  }
  if ('schema' in typedSchema._def) {
    return getDefaultValueInZodStack((typedSchema._def as any).schema as z.ZodAny);
  }

  return undefined;
}

function isIndex(value: unknown): value is number {
  return Number(value) >= 0;
}
/**
 * Constructs a path with dot paths for arrays to use brackets to be compatible with vee-validate path syntax
 */
export function normalizeFormPath(path: string): string {
  const pathArr = path.split('.');
  if (!pathArr.length) return '';

  let fullPath = String(pathArr[0]);
  for (let i = 1; i < pathArr.length; i++) {
    if (isIndex(pathArr[i])) {
      fullPath += `[${pathArr[i]}]`;
      continue;
    }

    fullPath += `.${pathArr[i]}`;
  }

  return fullPath;
}

type NestedRecord = Record<string, unknown> | { [k: string]: NestedRecord };

function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
}
function isContainerValue(value: unknown): value is Record<string, unknown> {
  return isObject(value) || Array.isArray(value);
}
function cleanupNonNestedPath(path: string) {
  if (isNotNestedPath(path)) return path.replace(/\[|\]/g, '');

  return path;
}

/**
 * Gets a nested property value from an object
 */
export function getFromPath<TValue = unknown, TFallback = TValue>(
  object: NestedRecord | undefined,
  path: string,
  fallback?: TFallback
): TValue | TFallback | undefined {
  if (!object) return fallback;

  if (isNotNestedPath(path)) return object[cleanupNonNestedPath(path)] as TValue | undefined;

  const resolvedValue = (path || '')
    .split(/\.|\[(\d+)\]/)
    .filter(Boolean)
    .reduce((acc, propKey) => {
      if (isContainerValue(acc) && propKey in acc) return acc[propKey];

      return fallback;
    }, object as unknown);

  return resolvedValue as TValue | undefined;
}
