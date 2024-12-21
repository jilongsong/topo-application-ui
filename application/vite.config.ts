import { join, resolve } from 'path';

import { defineConfig } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import federation from '@originjs/vite-plugin-federation';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'hex-alpha-color-picker',
        },
      },
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      compositionOnly: true,
      include: [resolve(__dirname, './src/locales/languages/**')],
    }),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `prefix_${hash}`,
    }),
    federation({
      name: 'remote-ui',
      filename: 'remoteEntry.js',
      shared: ['vue', 'element-plus'],
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: [
      { find: /^element-plus$/, replacement: join(__dirname, 'node_modules/element-plus/es/index.mjs') },
      { find: /^@topo\/core/, replacement: join(__dirname, '../packages/core/src/index.ts') },
      { find: /^@topo\/editor/, replacement: join(__dirname, '../packages/editor/src/index.ts') },
      { find: /^@topo\/schema/, replacement: join(__dirname, '../packages/schema/src/index.ts') },
      { find: /^@topo\/stage/, replacement: join(__dirname, '../packages/stage/src/index.ts') },
      { find: /^@topo\/ui/, replacement: join(__dirname, '../packages/ui/src/index.ts') },
      { find: /^@topo\/icon/, replacement: join(__dirname, '../packages/icon/src/index.ts') },
      { find: /^@topo\/utils/, replacement: join(__dirname, '../packages/utils/src/index.ts') },
      { find: /^@topo\/panel/, replacement: join(__dirname, '../packages/panel/src/index.ts') },
      { find: /^@topo\/expression/, replacement: join(__dirname, '../packages/expression/src/index.ts') },
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsInlineLimit: 40960,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8008,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 8008,
  },
});
