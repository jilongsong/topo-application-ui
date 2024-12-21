import { isRef, onBeforeUnmount, onMounted, Ref, unref, watch } from 'vue';

export const useEventListener = <T extends Event>(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (event: T) => void
) => {
  const eventListener = (event: Event) => {
    handler(event as T); // 在这里进行类型断言
  };
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, eventListener);
      value?.addEventListener(event, eventListener);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, eventListener);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, eventListener);
  });
};

export default useEventListener;
