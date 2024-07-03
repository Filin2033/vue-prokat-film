import { createRouter, createWebHistory } from 'vue-router'
import Film from '../views/Film.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Film
  },
  {
    path: '/about',
    name: 'about',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
