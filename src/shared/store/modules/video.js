import { events } from '@/socket';
import * as playerStates from '@/constants/youtube-player';

export default {
    namespaced: true,

    state: () => ({
        id: null,
        localState: playerStates.UNSTARTED,
        remoteState: playerStates.UNSTARTED,
        currentTime: 0,
    }),

    mutations: {
        [events.VIDEO_LOAD](state, payload) {
            const { videoId } = payload;

            if (!videoId) {
                return;
            }

            state.id = videoId;
        },

        [events.VIDEO_PLAY](state, payload) {
            state.remoteState = playerStates.PLAYING;
            state.currentTime = payload.currentTime;
        },

        [events.VIDEO_PAUSE](state) {
            state.remoteState = playerStates.PAUSED;
        },

        [events.VIDEO_STOP](state) {
            state.remoteState = playerStates.ENDED;
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
