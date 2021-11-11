import io from 'socket.io-client';

/**
 * When on the client-side, create a socket connecting to the backend.
 *
 * @return {import('socket.io-client').Socket}
 */
const createSocket = () => {
    return io(undefined, {
        reconnection: true,
        rejectUnauthorized: false,
        transports: ['websocket'],
    });
};

/**
 * Returns all mutations matching the event.
 *
 * @param store
 * @param event
 * @returns {string[]}
 */
const findMutations = (store, event) => {
    return Object.keys(store._mutations).filter((mutation) => {
        return mutation.split('/').pop() === event;
    });
};

/**
 * Creates a Vuex plugin that listens to socket events on the client-side.
 *
 * @returns {(function(*): void)|*}
 */
export default () => {
    /**
     * @param {import('vuex').Store<any>} store
     */
    return (store) => {
        if (import.meta.env.SSR) {
            return;
        }

        const socket = createSocket();

        socket.onAny((event, payload) => {
            const mutations = findMutations(store, event);

            mutations.forEach((mutation) => {
                store.commit(mutation, payload);
            });
        });

        store.$socket = socket;
    };
};
