import { createSSRApp, h } from 'vue';

import './main.scss';

import createRouter from './router';
import { createSocket, SOCKET_KEY } from './socket';
import App from './App.vue';

export default () => {
    const router = createRouter();
    const socket = createSocket();

    const app = createSSRApp({
        render: () => h(App),
    });

    app.provide(SOCKET_KEY, socket);
    app.use(router);

    return {
        app,
        router,
    };
};
