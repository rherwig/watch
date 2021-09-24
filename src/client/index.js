import createApp from '../shared';

const { app, router } = createApp();

/**
 * Hydrates the server-side rendered app with the client app,
 * once the router is ready.
 */
(async () => {
    await router.isReady();

    app.mount('#vue-root');
})();
