import { events } from '@/socket';

export default {
    namespaced: true,

    state: () => ({
        messages: [],
    }),

    mutations: {
        [events.CHAT_MESSAGE_RECEIVED](state, payload) {
            state.messages.push({
                content: payload.message,
                user: payload.user,
            });
        },
    },

    actions: {
        send(context, payload) {
            this.$socket.emit(events.CHAT_MESSAGE_SEND, payload);
        },
    },
};
