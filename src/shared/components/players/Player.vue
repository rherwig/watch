<template>
    <div
        id="player"
        class="flex items-center justify-center h-full w-full"
    ></div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import * as playerState from '@/constants/youtube-player';

const store = useStore();

const player = ref(null);
const isPlayPending = ref(false);

const videoId = computed(() => store.state.video.id);
const remoteVideoState = computed(() => store.state.video.remoteState);
const localVideoState = computed(() => store.state.video.localState);

const createPlayer = (videoId) => {
    const options = {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
            playsinline: 1,
            enablejsapi: 1,
            autoplay: 0,
        },
        events: {
            onReady: (event) => {
                player.value = event.target;
            },
            onStateChange: (event) => {
                store.dispatch('video/setLocalState', {
                    state: event.data,
                });
            },
        },
    };

    new YT.Player('player', options);
};

watch(videoId, (nextVideoId) => {
    if (player.value) {
        player.value.destroy();
    }

    player.value = null;

    createPlayer(nextVideoId);
});

watch(localVideoState, (state, prevState) => {
    console.log(`[LOCAL] From ${prevState} to ${state}`);

    switch (state) {
        case playerState.ENDED:
            store.dispatch('video/stop');
            break;
        case playerState.PLAYING:
            store.dispatch('video/play', {
                currentTime: player.value.getCurrentTime(),
            });
            break;
        case playerState.PAUSED:
            store.dispatch('video/pause');
            break;
        default:
            break;
    }
});

watch(remoteVideoState, (state, prevState) => {
    console.log(`[REMOTE] From ${prevState} to ${state}`);

    switch (state) {
        case playerState.ENDED:
            player.value.stopVideo();

            break;
        case playerState.PLAYING:
            if (store.state.video.currentTime) {
                player.value.seekTo(store.state.video.currentTime);
            }
            player.value.playVideo();

            break;
        case playerState.PAUSED:
            player.value.pauseVideo();

            break;
        default:
            break;
    }
});

onMounted(() => {
    // socket.on(events.VIDEO_PLAY, (payload) => {
    //     if (playerState.value === 1) {
    //         return;
    //     }
    //
    //     const { currentTime } = payload;
    //     if (currentTime) {
    //         player.value.seekTo(currentTime);
    //     }
    //
    //     player.value.playVideo();
    // });
    //
    // socket.on(events.VIDEO_PAUSE, () => {
    //     if (playerState.value === 2) {
    //         return;
    //     }
    //
    //     player.value.pauseVideo();
    // });
    //
    // socket.on(events.VIDEO_STOP, () => {
    //     if (playerState.value === 0) {
    //         return;
    //     }
    //
    //     player.value.stopVideo();
    // });
});
</script>
