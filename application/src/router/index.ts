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
        path: '/test',
        name: 'Test',
        component: () => import('../pages/test/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
