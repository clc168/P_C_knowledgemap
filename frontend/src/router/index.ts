import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/business/:id',
      name: 'business-detail',
      component: () => import('../views/BusinessDetailView.vue'),
    },
    {
      path: '/knowledge-map',
      name: 'knowledge-map',
      component: () => import('../views/KnowledgeMapView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
  ],
})

export default router
