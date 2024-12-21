import { computed, onMounted, onUnmounted, ref } from 'vue';

import { Breakpoint, breakpoints } from '../services/StyleManager';

export function useResponsive() {
  const screenWidth = ref(window.innerWidth);

  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  const getCurrentBreakpoint = computed<Breakpoint>(() => {
    if (screenWidth.value < breakpoints.sm) return 'xs';
    if (screenWidth.value < breakpoints.md) return 'sm';
    if (screenWidth.value < breakpoints.lg) return 'md';
    if (screenWidth.value < breakpoints.xl) return 'lg';
    if (screenWidth.value < breakpoints['2xl']) return 'xl';
    return '2xl';
  });

  const isBreakpoint = (breakpoint: Breakpoint) => computed(() => getCurrentBreakpoint.value === breakpoint);

  const isAboveBreakpoint = (breakpoint: Breakpoint) => computed(() => screenWidth.value >= breakpoints[breakpoint]);

  return {
    screenWidth,
    getCurrentBreakpoint,
    isBreakpoint,
    isAboveBreakpoint,
  };
}
