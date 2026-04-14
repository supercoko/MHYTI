import { createRouter, createWebHashHistory } from 'vue-router'

import { ensureResultAvailable } from './guards'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/quiz', name: 'quiz', component: () => import('@/pages/QuizPage.vue') },
    {
      path: '/result',
      name: 'result',
      component: () => import('@/pages/ResultPage.vue'),
      beforeEnter: ensureResultAvailable,
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/pages/CharactersPage.vue'),
    },
    { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
