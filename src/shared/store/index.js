import { createStore } from 'vuex';

import modules from './modules';

export default () => {
    const store = createStore({
        strict: process.env.NODE_ENV !== 'production',
        modules,
    });

    if (import.meta.hot) {
        import.meta.hot.accept([
            './store/modules',
        ], () => {
            const modules = require('./modules').default;

            store.hotUpdate({
                modules,
            });
        });
    }

    return store;
}
