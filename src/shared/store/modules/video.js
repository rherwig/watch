import { events } from '@/socket';
import { playerState } from '@/constants/player';

export default {
    namespaced: true,

    state: () => ({
        id: null,
        type: null,
        localState: playerState.UNSTARTED,
        remoteState: playerState.UNSTARTED,
        currentTime: 0,
    }),

    mutations: {
        [events.VIDEO_LOAD](state, payload) {
            const { videoId, type } = payload;

            if (!videoId || !type) {
                return;
            }

            state.id = videoId;
            state.type = type;
        },

        [events.VIDEO_PLAY](state, payload) {
            state.remoteState = playerState.PLAYING;
            state.currentTime = payload.currentTime;
        },

        [events.VIDEO_PAUSE](state) {
            state.remoteState = playerState.PAUSED;
        },

        [events.VIDEO_STOP](state) {
            state.remoteState = playerState.ENDED;
        },

        setLocalState(state, payload) {
            state.localState = payload.state;
        },
    },

    actions: {
        load(context, payload) {
            this.$socket.emit(events.VIDEO_LOAD_REQUEST, payload);
        },

        play(context, payload) {
            this.$socket.emit(events.VIDEO_PLAY_REQUEST, payload);
        },

        pause(context, payload) {
            this.$socket.emit(events.VIDEO_PAUSE_REQUEST, payload);
        },

        stop(context, payload) {
            this.$socket.emit(events.VIDEO_STOP_REQUEST, payload);
        },

        setLocalState(context, payload) {
            context.commit('setLocalState', payload);
        },
    },
};
