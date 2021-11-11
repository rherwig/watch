import { createStore, createLogger } from 'vuex';

import createSocketPlugin from '@client/store/plugins/socket';
import modules from './modules';

export default () => {
    const plugins = [
        createSocketPlugin(),
    ];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(createLogger());
    }

    const store = createStore({
        strict: process.env.NODE_ENV !== 'production',
        modules,
        plugins,
    });

    if (import.meta.hot) {
        import.meta.hot.accept([
            './store/modules',
        ], () => {
            const nextModules = require('./modules').default;

            store.hotUpdate({
                modules: nextModules,
            });
        });
    }

    return store;
};
