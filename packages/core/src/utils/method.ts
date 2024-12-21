import Node from '../Node';
import type { MethodOption } from '../type';

import { toggleVisibility } from './style';

const COMMON_METHOD_PREFIX = 'topo:common:method:';
const CommonMethod = {
  Hidden: 'hidden',
  Visible: 'visible',
  ToggleVisibility: 'toggleVisibility',
};

export const DEFAULT_METHODS: MethodOption[] = [
  { label: '隐藏', value: `${COMMON_METHOD_PREFIX}${CommonMethod.Hidden}` },
  { label: '显示', value: `${COMMON_METHOD_PREFIX}${CommonMethod.Visible}` },
  { label: '切换可见性', value: `${COMMON_METHOD_PREFIX}${CommonMethod.ToggleVisibility}` },
];

export const isCommonMethod = (methodName: string) => methodName.startsWith(COMMON_METHOD_PREFIX);

export const triggerCommonMethod = (methodName: string, node: Node) => {
  const { instance } = node;
  switch (methodName.replace(COMMON_METHOD_PREFIX, '')) {
    case CommonMethod.Hidden:
      instance?.$el && (instance.$el.style.visibility = 'hidden');
      break;
    case CommonMethod.Visible:
      instance?.$el && (instance.$el.style.visibility = 'visible');
      break;
    case CommonMethod.ToggleVisibility:
      instance?.$el && toggleVisibility(instance?.$el);
      break;
    default:
      break;
  }
};

export function getProvideMethodName(name: string): string {
  return `set${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}
