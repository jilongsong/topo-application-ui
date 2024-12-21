import { Expression } from '@topo/schema';

export const isExpression = (value: any): value is Expression => {
  return value && typeof value === 'object' && 'expression' in value;
};
