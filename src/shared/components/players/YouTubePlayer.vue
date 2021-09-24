<template>
    <div id="youtube-player"></div>
    <Button @click="playVideo">Play</Button>
</template>

<script setup>
import { inject, onMounted, reactive } from 'vue';

import * as events from '../../socket/events';
import { YOUTUBE_VIDEO_ID } from '../../../debug/constants';
import Button from '../typography/buttons/Button.vue';

// let player = reactive({});

const socket = inject('socket');

const options = {
    height: '390',
    width: '640',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
        playsinline: 1,
    },
    events: {
        // onReady: (event) => player = event.target,
        onStateChange: (event) => console.log('state change', event),
    },
};

onMounted(() => {
    const { Player } = window.YT;
    const player = new Player('youtube-player', options);

    socket.on(events.VIDEO_PLAY_START, () => {
        console.log('Play confirmed.');
        player.playVideo();
    });
});

const playVideo = () => {
    socket.emit(events.VIDEO_PLAY_REQUEST_START);
};

</script>
