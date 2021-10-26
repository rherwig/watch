<template>
    <div
        id="player"
        class="flex items-center justify-center h-full w-full"
    ></div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import { playerState } from '@/constants/player';
import PlayerFactory from '@/factories/PlayerFactory';

const store = useStore();

const player = ref(null);
const isPlayPending = ref(false);

const videoId = computed(() => store.state.video.id);
const remoteVideoState = computed(() => store.state.video.remoteState);
const localVideoState = computed(() => store.state.video.localState);

watch(videoId, (nextVideoId) => {
    if (player.value) {
        player.value.destruct();
    }

    player.value = null;

    player.value = PlayerFactory.getPlayer(store.state.video.type, {
        videoId:videoId.value,
        store,
    });
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
        case playerState.BUFFERING:
            store.dispatch('video/buffer');
            break;
        default:
            break;
    }
});

watch(remoteVideoState, (state, prevState) => {
    console.log(`[REMOTE] From ${prevState} to ${state}`);

    switch (state) {
        case playerState.ENDED:
            player.value.stop();

            break;
        case playerState.PLAYING:
            player.value.play(store.state.video.currentTime);

            break;
        case playerState.PAUSED:
            player.value.pause();

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
