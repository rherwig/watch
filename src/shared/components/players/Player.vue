<template>
    <div
        id="player"
        class="flex items-center justify-center h-full w-full"
    ></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { events, useSocket } from '../../socket';

const emit = defineEmits(['ready', 'destroyed']);
const socket = useSocket();
let player = ref(null);

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
            onStateChange: (event) => {},
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

onMounted(() => {
    socket.on(events.VIDEO_LOAD, (payload) => {
        const { videoId } = payload;
        if (!videoId) {
            return;
        }

        loadVideo(videoId);
    });

    socket.on(events.VIDEO_PLAY, () => {
        console.log('play');
        player.value.playVideo();
    });

    socket.on(events.VIDEO_PAUSE, () => {
        player.value.pauseVideo();
    });

    socket.on(events.VIDEO_STOP, () => {
        player.value.stopVideo();
    });
});
</script>
