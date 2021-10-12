import createApp from '../shared';
import createSocketPlugin from './store/plugins/socket';

const { app, router, store } = createApp({
    storePlugins: [createSocketPlugin()],
});

/**
 * Hydrates the server-side rendered app with the client app,
 * once the router is ready.
 */
(async () => {
    await router.isReady();

    if (window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__);
    }

    app.mount('#vue-root');
})();
