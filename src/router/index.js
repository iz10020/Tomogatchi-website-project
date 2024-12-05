import { createRouter, createWebHistory } from 'vue-router';
import TamagotchiDisplay from '../components/TamagotchiDisplay.vue';
import CharacterShop from '../components/CharacterShop.vue';
import FirestoreComponent from '@/components/FirestoreComponent.vue';

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
  {
    path: '/dbtest',
    name: 'dbtest',
    component: FirestoreComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;