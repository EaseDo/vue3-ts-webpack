import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: import('../page/home/home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: import('../page/about/about'),
  }
];
  
export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
