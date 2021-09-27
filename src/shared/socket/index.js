import { inject } from 'vue';
import io, { Socket } from 'socket.io-client';

import * as events from './events';

const SOCKET_KEY = 'socket';

/**
 * When on the client-side, create a socket connecting to the backend.
 *
 * @return {Socket|null}
 */
const createSocket = () => {
    if (!import.meta.env.SSR) {
        return null;
    }

    return io(undefined, {
        reconnection: true,
        rejectUnauthorized: false,
        transports: ['websocket'],
    });
};

/**
 * Returns the client socket instance.
 *
 * @return {Socket}
 */
const useSocket = () => inject(SOCKET_KEY);

export {
    createSocket,
    useSocket,
    events,
    SOCKET_KEY,
};
