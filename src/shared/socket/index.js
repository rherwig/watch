import { inject } from 'vue';
import { Socket } from 'socket.io-client';

import * as events from './events';

const SOCKET_KEY = 'socket';

/**
 * Returns the client socket instance.
 *
 * @return {Socket}
 */
const useSocket = () => inject(SOCKET_KEY);

export {
    events,
    useSocket,
};
