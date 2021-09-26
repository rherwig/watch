import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

const isServer = typeof window === 'undefined';

const routes = [
    {
        name: 'index',
        path: '/',
        component: () => import('../pages/Index.vue'),
    },
    {
        name: 'room',
        path: '/rooms/:name',
        component: () => import('../pages/Room.vue'),
    },
];

const history = isServer
    ? createMemoryHistory()
    : createWebHistory();

export default () => createRouter({
    history,
    routes,
});
