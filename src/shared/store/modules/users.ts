import { events } from '@/socket';

export default {
    namespaced: true,

    state: () => ({
        meId: null,
        all: [],
    }),

    getters: {
        me(state) {
            return state.all.find((user) => user.id === state.meId);
        },
    },

    mutations: {
        [events.ROOM_USER_JOINED](state, payload) {
            const { user } = payload;

            if (!user) {
                return;
            }

            if (user.id === this.$socket.id) {
                state.meId = user.id;
            }

            state.all.push(user);
        },

        [events.ROOM_USER_LEFT](state, payload) {
            const { user } = payload;

            state.all = state.all.filter((u) => u.id !== user.id);
        },

        [events.ROOM_USER_UPDATE](state, payload) {
            const { users } = payload;

            state.all = users;
        },
    },

    actions: {
        join(context, payload) {
            this.$socket.emit('ROOM_JOIN_TRY', payload);
        },
    },
};
