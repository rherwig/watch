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

    // @ts-ignore
    const initialState = window.__INITIAL_STATE__;

    if (initialState) {
        store.replaceState(initialState);
    }

    app.mount('#vue-root');
})();
