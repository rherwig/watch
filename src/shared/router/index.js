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
        path: '/room/:name',
        component: () => import('../pages/Room.vue'),
    },
    {
        name: 'layout',
        path: '/layout',
        component: () => import('../pages/Layout.vue'),
    },
];

const history = isServer
    ? createMemoryHistory()
    : createWebHistory();

export default () => createRouter({
    history,
    routes,
});
