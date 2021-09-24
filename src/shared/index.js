import { createSSRApp, h } from 'vue';

import './main.scss';

import createRouter from './router';
import App from './App.vue';

export default () => {
    const router = createRouter();

    const app = createSSRApp({
        render: () => h(App),
    });

    app.use(router);

    return {
        app,
        router,
    };
};
