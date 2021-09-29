import { createSSRApp, h } from 'vue';

import './main.scss';

import createRouter from './router';
import { createSocket, SOCKET_KEY } from './socket';
import createStore from './store';
import App from './App.vue';

export default () => {
    const router = createRouter();
    const socket = createSocket();
    const store = createStore();

    const app = createSSRApp({
        render: () => h(App),
    });

    app.provide(SOCKET_KEY, socket);
    app.use(router);
    app.use(store);

    return {
        app,
        router,
        store,
    };
};
