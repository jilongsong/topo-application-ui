import { EventOption } from '../type';

export const COMMON_EVENT_MOUNTED = `mounted`;
export const COMMON_EVENT_UPDATE = `update`;

export const DEFAULT_EVENTS: EventOption[] = [
  { label: '初始化', value: COMMON_EVENT_MOUNTED },
  { label: '更新', value: COMMON_EVENT_UPDATE },
];
