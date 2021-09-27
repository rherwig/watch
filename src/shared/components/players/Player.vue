<template>
    <div
        id="player"
        class="flex items-center justify-center h-full w-full"
    ></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import { events, useSocket } from '../../socket';

const emit = defineEmits([
    'ready',
    'destroyed',
    'play',
    'pause',
    'stop',
]);

const socket = useSocket();
let player = ref(null);
const playerState = ref(-1);

const createPlayer = (videoId) => {
    const options = {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
            playsinline: 1,
            enablejsapi: 1,
            autoplay: 1,
        },
        events: {
            onReady: (event) => {
                player.value = event.target;
                player.value.stopVideo();
                emit('ready');
            },
            onStateChange: (event) => {
                playerState.value = event.data;
                console.log(event.target);
            },
        },
    };

    new YT.Player('player', options);
};

const loadVideo = (videoId) => {
    if (player.value) {
        emit('destroyed');
        player.value.destroy();
    }

    player.value = null;

    createPlayer(videoId);
};

watch(playerState, (state, prevState) => {
    console.log(`From ${prevState} to ${state}`);
    switch (state) {
        case 0:
            emit('stop');
            break;
        case 1:
            emit('play', {
                currentTime: player.value.getCurrentTime(),
            });
            break;
        case 2:
            emit('pause');
            break;
        default:
            break;
    }
});

onMounted(() => {
    socket.on(events.VIDEO_LOAD, (payload) => {
        const { videoId } = payload;
        if (!videoId) {
            return;
        }

        loadVideo(videoId);
    });

    socket.on(events.VIDEO_PLAY, (payload) => {
        if (playerState.value === 1) {
            return;
        }

        const { currentTime } = payload;
        if (currentTime) {
            player.value.seekTo(currentTime);
        }

        player.value.playVideo();
    });

    socket.on(events.VIDEO_PAUSE, () => {
        if (playerState.value === 2) {
            return;
        }

        player.value.pauseVideo();
    });

    socket.on(events.VIDEO_STOP, () => {
        if (playerState.value === 0) {
            return;
        }

        player.value.stopVideo();
    });
});
</script>
