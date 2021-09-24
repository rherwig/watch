import { renderToString } from '@vue/server-renderer';

import registerSocket from './socket';
import createApp from '../shared';

const render = async (url) => {
    const {
        app,
        router,
    } = createApp();

    const context = {};

    await router.push(url);
    await router.isReady();

    const markup = await renderToString(app, context);

    return {
        markup,
    };
};

export {
    render,
    registerSocket,
};
