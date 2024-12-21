export const isNumber = (value: string) => /^(-?\d+)(\.\d+)?$/.test(value);

function getEffectiveVisibility(element: HTMLElement): string {
  if (!element.parentElement) {
    // 如果父元素不存在，返回元素的当前可见性
    return element.style.visibility;
  }
  const computedStyle = window.getComputedStyle(element);
  const elementVisibility = computedStyle.visibility;
  // 递归获取元素的有效可见性
  if (elementVisibility === 'inherit') {
    // 如果可见性为inherit，则继续检查父元素
    return getEffectiveVisibility(element.parentElement);
  } else {
    // 返回当前元素的计算可见性
    return elementVisibility;
  }
}

export const toggleVisibility = (element: HTMLElement) => {
  const effectiveVisibility = getEffectiveVisibility(element);
  if (effectiveVisibility === 'hidden') {
    // 如果元素当前不可见，将其设置为可见
    element.style.visibility = 'visible';
  } else {
    // 如果元素当前可见，将其设置为不可见
    element.style.visibility = 'hidden';
  }
};
