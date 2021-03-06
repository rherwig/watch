import { renderToString } from '@vue/server-renderer';

import api from './api';
import registerSocket from './socket';
import connectToDatabase from './database';
import createApp from '../shared';

const render = async (url) => {
    const {
        app,
        router,
        store,
    } = createApp();

    const context = {};

    await router.push(url);
    await router.isReady();

    const initialState = store.state;
    const markup = await renderToString(app, context);

    return {
        markup,
        initialState,
    };
};

export {
    api,
    connectToDatabase,
    render,
    registerSocket,
};
