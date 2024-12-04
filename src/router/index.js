import { createRouter, createWebHistory } from 'vue-router';
import TamagotchiDisplay from '../components/TamagotchiDisplay.vue';
import CharacterShop from '../components/CharacterShop.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TamagotchiDisplay,
  },
  {
    path: '/shop',
    name: 'CharacterShop',
    component: CharacterShop,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
