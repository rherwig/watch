import { inject } from 'vue';
import { Socket } from 'socket.io-client';

const SOCKET_KEY = 'socket';

/**
 * Returns the client socket instance.
 *
 * @return {Socket}
 */
export const useSocket = () => inject(SOCKET_KEY);
