import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
    include: ['./packages/editor/tests/**', './packages/form/tests/**', './packages/utils/tests/**'],
    environment: 'jsdom',
  },

  resolve: {
    alias: {
      '@editor': r('./packages/editor/src'),
      '@form': r('./packages/form/src'),
      '@topo/engine': r('./packages/engine/src'),
      '@topo/ui': r('./packages/ui/src'),
      '@topo/utils': r('./packages/utils/src'),
      '@topo/editor': r('./packages/editor/src'),
      '@topo/schema': r('./packages/schema/src'),
    },
  },
});
