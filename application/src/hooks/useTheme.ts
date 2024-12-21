import { computed, onMounted, ref } from 'vue';

export type Theme = 'dark' | 'light';

const defaultTheme: Theme = 'light';
const storageKey = 'application-ui-theme';

const theme = ref<Theme>(defaultTheme);

const setTheme = (newTheme: Theme) => {
  localStorage.setItem(storageKey, newTheme);
  theme.value = newTheme;
  updateDOMTheme();
};

const initTheme = () => {
  const savedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  theme.value = savedTheme;
  updateDOMTheme();
};

const updateDOMTheme = () => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme.value);
};

onMounted(() => {
  initTheme();
});

export const useTheme = () => {
  return {
    theme: computed(() => theme.value),
    setTheme,
  };
};
