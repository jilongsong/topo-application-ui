import { Ref } from 'vue';

import useEventListener from './useEventListener';

export interface HotKeyOptions {
  target: Ref<EventTarget> | EventTarget;
  shiftKey: boolean;
  ctrKey: boolean;
  exact: boolean;
}

export const useHotKey = (key: string, onKeyPressed: () => void, opts?: Partial<HotKeyOptions>) => {
  const target = opts?.target || window;
  useEventListener(target, 'keydown', (event: KeyboardEvent) => {
    const options = opts || {};
    if (event.key === key && matchesKeyScheme(options, event)) {
      event.preventDefault();
      onKeyPressed();
    }
  });
};

const matchesKeyScheme = (
  opts: Pick<Partial<HotKeyOptions>, 'shiftKey' | 'ctrKey' | 'exact'>,
  event: KeyboardEvent
) => {
  const ctrlKey = opts.ctrKey ?? false;
  const shiftKey = opts.shiftKey ?? false;
  if (opts.exact) {
    return ctrlKey === event.ctrlKey && shiftKey === event.shiftKey;
  }
  const satisfiedKeys: boolean[] = [];
  satisfiedKeys.push(ctrlKey === event.ctrlKey);
  satisfiedKeys.push(shiftKey === event.shiftKey);
  return satisfiedKeys.every((key) => key);
};

export default useHotKey;
