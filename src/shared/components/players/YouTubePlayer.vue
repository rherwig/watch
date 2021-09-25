<template>
    <div class="aspect-w-16 aspect-h-9">
        <div id="youtube-player"></div>
    </div>

    <div class="controls" v-if="player">
        <Button
            class="mt-2 mr-2"
            @click="playVideo"
        >
            Play
        </Button>
        <Button
            class="mt-2 mr-2"
            @click="pauseVideo"
        >
            Pause
        </Button>
        <Button
            class="mt-2"
            @click="stopVideo"
        >
            Stop
        </Button>
    </div>

    <input
        type="text"
        class="mt-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm border-gray-300 rounded-md"
        placeholder="YouTube Watch ID"
        v-model="videoId"
    />
    <Button
        class="mt-2 mb-8"
        @click="requestVideo"
    >
        Load
    </Button>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

import * as events from '../../socket/events';
import { YOUTUBE_VIDEO_ID } from '../../../debug/constants';
import Button from '../typography/buttons/Button.vue';

const socket = inject('socket');

const videoId = ref('');

let player = ref(null);

onMounted(() => {
    loadVideo();

    socket.on(events.VIDEO_LOAD, (payload) => {
        console.log(payload);

        videoId.value = payload.videoId;
        loadVideo();
    });

    socket.on(events.VIDEO_PLAY, () => {
        console.log('Play confirmed.');
        player.value.playVideo();
    });

    socket.on(events.VIDEO_PAUSE, () => {
        console.log('Pause confirmed.');
        player.value.pauseVideo();
    });

    socket.on(events.VIDEO_STOP, () => {
        console.log('Stop confirmed.');
        player.value.stopVideo();
    });
});

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
            },
            onStateChange: (event) => console.log('state change', event),
        },
    };

    new YT.Player('youtube-player', options);
};

const requestVideo = () => {
    socket.emit(events.VIDEO_LOAD_REQUEST, {
        videoId: videoId.value,
    });
};

const loadVideo = () => {
    if (player.value) {
        player.value.destroy();
    }

    player.value = null;

    createPlayer(videoId.value || YOUTUBE_VIDEO_ID);
};

const playVideo = () => {
    socket.emit(events.VIDEO_PLAY_REQUEST);
};

const pauseVideo = () => {
    socket.emit(events.VIDEO_PAUSE_REQUEST);
};

const stopVideo = () => {
    socket.emit(events.VIDEO_STOP_REQUEST);
};

</script>
