import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/editor',
    children: [
      {
        path: '/editor',
        name: 'Editor',
        component: () => import('../pages/editor/index.vue'),
      },
      {
        path: '/preview',
        name: 'Preview',
        component: () => import('../pages/preview/index.vue'),
      },
      {
        path: '/stage',
        name: 'Stage',
        component: () => import('../pages/stage/index.vue'),
      },
      {
        path: '/auto-form',
        name: 'AutoForm',
        component: () => import('../pages/auto-form/index.vue'),
      },
      {
        path: '/theme',
        name: 'Theme',
        component: () => import('../pages/theme/index.vue'),
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('../pages/test/index.vue'),
      },
      {
        path: '/test2',
        name: 'Test2',
        component: () => import('../pages/test2/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
