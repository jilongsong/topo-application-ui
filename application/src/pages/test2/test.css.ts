import { blue, gray, green, red } from '@radix-ui/colors';
import { createTheme } from '@vanilla-extract/css';

import { createStyleSystem } from './styleSystem';
import { variants } from './variant';

export const [themeClass, vars] = createTheme({
  color: {
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
});

const buttonStyles = createStyleSystem(variants as any);

export const button = buttonStyles({
  variantName: 'soft',
  padding: '8px',
});
