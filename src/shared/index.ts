import { createSSRApp, h } from 'vue';

import './main.scss';

import createRouter from './router';
import createStore from './store';
import App from './App.vue';

export default () => {
    const router = createRouter();
    const store = createStore();

    const app = createSSRApp({
        render: () => h(App),
    });

    app.use(router);
    app.use(store);

    return {
        app,
        router,
        store,
    };
};
